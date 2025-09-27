import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Vec2, Projectile, Enemy, Level, Particle, Platform, BreakableBlock, EnemyType, EmojiStructure } from '../types';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  GROUND_Y,
  PLAYER_START_POS,
  PROJECTILE_RADIUS,
  GRAVITY,
  PROJECTILE_MAX_BOUNCES,
  PROJECTILE_BOUNCE_DAMPENING,
  ENEMY_COLLISION_DAMAGE,
  ENEMY_KNOCKBACK_FACTOR
} from '../constants';

import SlingshotControls from './SlingshotControls';
import HUD from './HUD';
import LevelSelectScreen from './LevelSelectScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import GameOverScreen from './GameOverScreen';
import LevelEditorUI from './LevelEditorUI';
import { soundManager } from './SoundManager';

type GameState = 'level-select' | 'playing' | 'level-complete' | 'game-over' | 'level-editor';

export const ENEMY_CONFIG: Record<EnemyType, Omit<Enemy, 'id' | 'position' | 'velocity' | 'basePosition' | 'isSolid' | 'jumpCooldown' | 'zigzagDirection'>> = {
    grunt: { radius: 25, health: 50, color: '#ef4444', points: 100, emoji: '🐷', type: 'grunt' },
    brute: { radius: 40, health: 150, color: '#9333ea', points: 300, emoji: '👹', type: 'brute' },
    flyer: { radius: 20, health: 30, color: '#3b82f6', points: 150, emoji: '👾', type: 'flyer' },
    bomber: { radius: 30, health: 50, color: '#f97316', points: 250, emoji: '💣', type: 'bomber' },
    ghost: { radius: 25, health: 60, color: '#a78bfa', points: 200, emoji: '👻', type: 'ghost' },
    hopper: { radius: 25, health: 40, color: '#22c55e', points: 175, emoji: '🐸', type: 'hopper' },
    tank: { radius: 50, health: 400, color: '#6b7280', points: 500, emoji: '🛡️', type: 'tank' },
    sparky: { radius: 20, health: 80, color: '#facc15', points: 225, emoji: '⚡', type: 'sparky' },
};

const JUMP_COOLDOWN = 120; // frames
const BLAST_RADIUS = 100;
const BLAST_DAMAGE = 100;


interface GameProps {
  onQuit: () => void;
  levels: Level[];
  onAddLevel: (level: Level) => void;
}

const Game: React.FC<GameProps> = ({ onQuit, levels, onAddLevel }) => {
  const [gameState, setGameState] = useState<GameState>('level-select');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [breakableBlocks, setBreakableBlocks] = useState<BreakableBlock[]>([]);
  const [remainingProjectiles, setRemainingProjectiles] = useState(0);
  const [score, setScore] = useState(0);

  // Editor State
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [editorTool, setEditorTool] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [draggedEntity, setDraggedEntity] = useState<{ id: string, type: string, offset: Vec2 } | null>(null);
  const [isTestingEditorLevel, setIsTestingEditorLevel] = useState(false);
  
  const gameLoopRef = useRef<number | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const getSVGMousePos = useCallback((e: MouseEvent | React.MouseEvent): Vec2 => {
    const svg = gameContainerRef.current?.querySelector('svg');
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: transformed.x, y: transformed.y };
  }, []);

  const createParticleBurst = useCallback((position: Vec2, count: number, color: string): Particle[] => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 5 + 2;
        newParticles.push({
            id: `p-${Date.now()}-${i}-${Math.random()}`,
            position: { ...position },
            velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            radius: Math.random() * 3 + 1,
            color,
            lifespan: 30 + Math.random() * 30 // frames
        });
    }
    return newParticles;
  }, []);
  
  const loadLevel = useCallback((level: Level) => {
    setCurrentLevel(level);
    setRemainingProjectiles(level.projectiles);
    const newEnemies = level.enemies.map((e, i) => {
        const config = ENEMY_CONFIG[e.type];
        const enemy: Enemy = {
            ...config,
            id: `e-${level.id}-${i}-${Math.random()}`,
            position: { ...e.position },
            velocity: { x: 0, y: 0 },
            type: e.type,
            emoji: e.emoji || config.emoji,
        };
        if (e.type === 'flyer' || e.type === 'sparky') {
            enemy.basePosition = { ...e.position };
        }
        if (e.type === 'ghost') {
            enemy.isSolid = true;
        }
        if (e.type === 'hopper') {
            enemy.jumpCooldown = Math.random() * JUMP_COOLDOWN;
        }
        if (e.type === 'sparky') {
            enemy.zigzagDirection = 1;
        }
        return enemy;
    });
    setEnemies(newEnemies);
    setBreakableBlocks(level.breakableBlocks?.map(b => ({...b, health: b.health || 100, id: b.id || `bb-${Math.random()}`})) || []);
    setProjectiles([]);
    setParticles([]);
    setScore(0);
    setGameState('playing');
  }, []);

  const handleFire = useCallback((velocity: Vec2) => {
    if (remainingProjectiles <= 0) return;
    soundManager.playFire();
    setRemainingProjectiles(prev => prev - 1);
    const newProjectile: Projectile = {
      id: `proj-${Date.now()}`,
      position: { ...PLAYER_START_POS },
      velocity,
      radius: PROJECTILE_RADIUS,
      bouncesLeft: PROJECTILE_MAX_BOUNCES,
    };
    setProjectiles(prev => [...prev, newProjectile]);
  }, [remainingProjectiles]);

    const gameTick = useCallback(() => {
    let scoreToAdd = 0;
    const newParticles: Particle[] = [];
    let localBreakableBlocks = [...breakableBlocks];

    // 1. Update Projectiles
    let updatedProjectiles = projectiles.map(p => {
      let newVel = { x: p.velocity.x, y: p.velocity.y + GRAVITY.y };
      let newPos = { x: p.position.x + newVel.x, y: p.position.y + newVel.y };
      let bouncesLeft = p.bouncesLeft;
      
      const platforms = currentLevel?.platforms || editingLevel?.platforms || [];

      // Ground collision
      if (newPos.y > GROUND_Y - p.radius && newVel.y > 0) {
        newPos.y = GROUND_Y - p.radius;
        newVel.y *= -PROJECTILE_BOUNCE_DAMPENING;
        bouncesLeft--;
        if (bouncesLeft > 0) {
          newParticles.push(...createParticleBurst(newPos, 5, '#ffffff'));
          soundManager.playBounce();
        }
      }

      // Platform collision
      for (const platform of platforms) {
          const closestX = Math.max(platform.position.x, Math.min(newPos.x, platform.position.x + platform.width));
          const closestY = Math.max(platform.position.y, Math.min(newPos.y, platform.position.y + platform.height));
          const dx = newPos.x - closestX;
          const dy = newPos.y - closestY;

          if (Math.hypot(dx, dy) < p.radius) {
              soundManager.playBounce();
              bouncesLeft--;
              newParticles.push(...createParticleBurst({x: closestX, y: closestY}, 5, '#aaa'));

              const overlapX = p.radius - Math.abs(dx);
              const overlapY = p.radius - Math.abs(dy);

              if (overlapY < overlapX) {
                  newVel.y *= -PROJECTILE_BOUNCE_DAMPENING;
                  newPos.y += newVel.y > 0 ? overlapY : -overlapY;
              } else {
                  newVel.x *= -PROJECTILE_BOUNCE_DAMPENING;
                  newPos.x += newVel.x > 0 ? overlapX : -overlapX;
              }
              break;
          }
      }

      return { ...p, position: newPos, velocity: newVel, bouncesLeft };
    });

    // 2. Update Enemies
    let updatedEnemies = enemies.map(enemy => {
        let newEnemy = {...enemy, velocity: {...enemy.velocity}, position: {...enemy.position}};

        if (newEnemy.type === 'flyer') {
            const phase = parseInt(newEnemy.id.replace(/\D/g,'')) % 100;
            newEnemy.position = {
              x: newEnemy.basePosition!.x + Math.sin((Date.now() / 1000) + phase) * 60,
              y: newEnemy.basePosition!.y + Math.cos((Date.now() / 800) + phase) * 40,
            };
        } else if (newEnemy.type === 'sparky') {
            const phase = parseInt(newEnemy.id.replace(/\D/g,'')) % 100;
            newEnemy.position.y = newEnemy.basePosition!.y + Math.sin((Date.now() / 500) + phase) * 20;
            newEnemy.position.x += 2 * newEnemy.zigzagDirection!;
            if (newEnemy.position.x > newEnemy.basePosition!.x + 50 || newEnemy.position.x < newEnemy.basePosition!.x - 50) {
                newEnemy.zigzagDirection! *= -1;
            }
        } else if (newEnemy.type === 'hopper') {
            if (newEnemy.jumpCooldown! <= 0 && newEnemy.position.y >= GROUND_Y - newEnemy.radius) {
                newEnemy.velocity.y = -10;
                newEnemy.velocity.x = (Math.random() - 0.5) * 8;
                newEnemy.jumpCooldown = JUMP_COOLDOWN + Math.random() * 60;
            } else {
                newEnemy.jumpCooldown! -= 1;
            }
        } else if (newEnemy.type === 'ghost') {
            newEnemy.isSolid = Math.random() > 0.05;
        }
        
        if (newEnemy.type !== 'flyer' && newEnemy.type !== 'sparky') {
            newEnemy.velocity.y += GRAVITY.y;
            newEnemy.position.x += newEnemy.velocity.x;
            newEnemy.position.y += newEnemy.velocity.y;
    
            if (newEnemy.position.y > GROUND_Y - newEnemy.radius) {
                newEnemy.position.y = GROUND_Y - newEnemy.radius;
                newEnemy.velocity.y = 0;
                newEnemy.velocity.x *= 0.8;
            }
        }
        return newEnemy;
    });

    // 3. Enemy-enemy collisions
    for (let i = 0; i < updatedEnemies.length; i++) {
        for (let j = i + 1; j < updatedEnemies.length; j++) {
            const enemyA = updatedEnemies[i];
            const enemyB = updatedEnemies[j];

            if (enemyA.type === 'flyer' || enemyA.type === 'sparky' || enemyB.type === 'flyer' || enemyB.type === 'sparky') continue;

            const dx = enemyB.position.x - enemyA.position.x;
            const dy = enemyB.position.y - enemyA.position.y;
            const dist = Math.hypot(dx, dy);
            const overlap = (enemyA.radius + enemyB.radius) - dist;

            if (overlap > 0) {
                enemyA.health -= ENEMY_COLLISION_DAMAGE;
                enemyB.health -= ENEMY_COLLISION_DAMAGE;
                soundManager.playCollision();

                const angle = Math.atan2(dy, dx);
                const moveX = Math.cos(angle) * overlap / 2;
                const moveY = Math.sin(angle) * overlap / 2;

                enemyA.position.x -= moveX;
                enemyA.position.y -= moveY;
                enemyB.position.x += moveX;
                enemyB.position.y += moveY;

                enemyA.velocity.x -= moveX * ENEMY_KNOCKBACK_FACTOR;
                enemyA.velocity.y -= moveY * ENEMY_KNOCKBACK_FACTOR;
                enemyB.velocity.x += moveX * ENEMY_KNOCKBACK_FACTOR;
                enemyB.velocity.y += moveY * ENEMY_KNOCKBACK_FACTOR;
                
                newParticles.push(...createParticleBurst({x: enemyA.position.x + dx/2, y: enemyA.position.y + dy/2}, 2, '#ffffff'));
            }
        }
    }

    // 4. Projectile collisions & cleanup
    let destroyedEnemyIds = new Set<string>();
    let destroyedBlockIds = new Set<string>();

    updatedProjectiles = updatedProjectiles.filter(proj => {
        if (proj.bouncesLeft <= 0) return false;

        // Projectile-Enemy
        for (const enemy of updatedEnemies) {
            if (destroyedEnemyIds.has(enemy.id) || (enemy.type === 'ghost' && !enemy.isSolid)) continue;
            const dx = proj.position.x - enemy.position.x;
            const dy = proj.position.y - enemy.position.y;
            if (Math.hypot(dx, dy) < proj.radius + enemy.radius) {
                soundManager.playImpact();
                enemy.health -= Math.max(10, Math.hypot(proj.velocity.x, proj.velocity.y) * 5);
                newParticles.push(...createParticleBurst(proj.position, 20, enemy.color));
                const angle = Math.atan2(dy, dx);
                enemy.velocity.x += Math.cos(angle) * 5;
                enemy.velocity.y += Math.sin(angle) * 5;
                if (enemy.health <= 0) destroyedEnemyIds.add(enemy.id);
                return false; // Projectile is destroyed on impact
            }
        }
        
        // Projectile-Block
        for (const block of localBreakableBlocks) {
            const closestX = Math.max(block.position.x, Math.min(proj.position.x, block.position.x + block.width));
            const closestY = Math.max(block.position.y, Math.min(proj.position.y, block.position.y + block.height));
            if (Math.hypot(proj.position.x - closestX, proj.position.y - closestY) < proj.radius) {
                soundManager.playImpact();
                block.health -= 100;
                newParticles.push(...createParticleBurst({x: closestX, y: closestY}, 10, '#a16207'));
                if (block.health <= 0) destroyedBlockIds.add(block.id);
                return false; // Projectile is destroyed
            }
        }

        return proj.position.x > -proj.radius && proj.position.x < WORLD_WIDTH + proj.radius;
    });
    
    // 5. Finalize destroyed entities
    updatedEnemies.forEach(e => { if (e.health <= 0) destroyedEnemyIds.add(e.id); });

    const stillEnemies = updatedEnemies.filter(e => !destroyedEnemyIds.has(e.id));

    destroyedEnemyIds.forEach(id => {
        const deadEnemy = enemies.find(e => e.id === id);
        if (deadEnemy) {
            scoreToAdd += deadEnemy.points;
            newParticles.push(...createParticleBurst(deadEnemy.position, 50, deadEnemy.color));
            soundManager.playDestroy();
        }
    });
    
    if (destroyedBlockIds.size > 0) {
        localBreakableBlocks = localBreakableBlocks.filter(b => !destroyedBlockIds.has(b.id));
        destroyedBlockIds.forEach(() => soundManager.playBlockBreak());
    }

    // 6. Update state
    const updatedParticles = particles.map(p => ({ ...p, position: { x: p.position.x + p.velocity.x, y: p.position.y + p.velocity.y }, lifespan: p.lifespan - 1 })).filter(p => p.lifespan > 0);
    
    setScore(s => s + scoreToAdd);
    setEnemies(stillEnemies);
    setProjectiles(updatedProjectiles);
    setParticles([...updatedParticles, ...newParticles]);
    setBreakableBlocks(localBreakableBlocks);

    // 7. Check win/loss conditions
    if (stillEnemies.length === 0 && gameState === 'playing') {
      soundManager.playLevelComplete();
      setGameState('level-complete');
    } else if (remainingProjectiles <= 0 && updatedProjectiles.length === 0 && stillEnemies.length > 0 && gameState === 'playing') {
      soundManager.playGameOver();
      setGameState('game-over');
    }
  }, [projectiles, enemies, particles, breakableBlocks, remainingProjectiles, createParticleBurst, gameState, currentLevel, editingLevel]);

  useEffect(() => {
    const handleInteraction = () => {
        soundManager.initialize();
        gameContainerRef.current?.removeEventListener('mousedown', handleInteraction);
        gameContainerRef.current?.removeEventListener('touchstart', handleInteraction);
    }
    gameContainerRef.current?.addEventListener('mousedown', handleInteraction);
    gameContainerRef.current?.addEventListener('touchstart', handleInteraction);
    
    if (gameState === 'playing') {
      gameLoopRef.current = window.requestAnimationFrame(gameTick);
    }
    return () => {
      gameContainerRef.current?.removeEventListener('mousedown', handleInteraction);
      gameContainerRef.current?.removeEventListener('touchstart', handleInteraction);
      if (gameLoopRef.current) {
        window.cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameTick]);

  const handleSelectLevel = (level: Level) => {
    loadLevel(level);
  };

  const handleNextLevel = () => {
    const nextLevelIndex = levels.findIndex(l => l.id === currentLevel!.id) + 1;
    if (nextLevelIndex < levels.length) {
        handleSelectLevel(levels[nextLevelIndex]);
    } else {
        setGameState('level-select');
    }
  };

  const handleRestartLevel = () => {
    if (currentLevel) {
        handleSelectLevel(currentLevel);
    }
  };

  const handleReturnToEditor = () => {
    setIsTestingEditorLevel(false);
    setGameState('level-editor');
    // Restore level state for editing
    if (editingLevel) {
        loadLevel(editingLevel);
        setGameState('level-editor');
    }
  };

  const renderSky = () => {
    const theme = currentLevel?.theme || editingLevel?.theme;
    if (!theme) return <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="#333" />;
    const [start, mid, end] = theme.sky;
    return (
        <>
            <defs>
                <radialGradient id="skyGradient" cx="50%" cy="80%" r="100%" fx="50%" fy="100%">
                    <stop offset="0%" style={{stopColor: end}} />
                    <stop offset="40%" style={{stopColor: mid}} />
                    <stop offset="100%" style={{stopColor: start}} />
                </radialGradient>
            </defs>
            <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#skyGradient)" />
        </>
    )
  };

  return (
    <div ref={gameContainerRef} className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
        {gameState === 'level-select' && (
            <LevelSelectScreen levels={levels} onLevelSelect={handleSelectLevel} onQuit={onQuit} onStartEditor={() => setGameState('level-editor')} />
        )}
        {gameState === 'level-complete' && (
            <LevelCompleteScreen score={score} onNext={handleNextLevel} isTestingEditorLevel={isTestingEditorLevel} onReturnToEditor={handleReturnToEditor} />
        )}
        {gameState === 'game-over' && (
            <GameOverScreen onRestart={handleRestartLevel} onQuit={onQuit} isTestingEditorLevel={isTestingEditorLevel} onReturnToEditor={handleReturnToEditor} />
        )}
        {gameState === 'level-editor' && (
            <LevelEditorUI 
                selectedTool={editorTool}
                onSelectTool={setEditorTool}
                onTest={() => { setIsTestingEditorLevel(true); loadLevel(editingLevel || levels[0]); }}
                onSave={() => onAddLevel(editingLevel!)}
                onExit={() => setGameState('level-select')}
            />
        )}
      
        <svg viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} className="h-full w-auto" style={{ maxHeight: '100vh', maxWidth: '100vw' }}>
            {renderSky()}
            <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height={WORLD_HEIGHT - GROUND_Y} fill="#4a3b2b" />
            <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height="20" fill="#6a563f" />
            <path d={`M ${PLAYER_START_POS.x - 20} ${GROUND_Y} L ${PLAYER_START_POS.x - 30} ${PLAYER_START_POS.y - 10} L ${PLAYER_START_POS.x - 10} ${PLAYER_START_POS.y - 10} Z`} fill="#8B4513" />
            <path d={`M ${PLAYER_START_POS.x + 20} ${GROUND_Y} L ${PLAYER_START_POS.x + 30} ${PLAYER_START_POS.y - 10} L ${PLAYER_START_POS.x + 10} ${PLAYER_START_POS.y - 10} Z`} fill="#8B4513" />
            
            {(currentLevel?.platforms || editingLevel?.platforms)?.map(p => (
                <rect key={p.id} x={p.position.x} y={p.position.y} width={p.width} height={p.height} fill="#6b7280" stroke="#4b5563" strokeWidth="2" />
            ))}
            
            {breakableBlocks.map(b => (
                 <rect key={b.id} x={b.position.x} y={b.position.y} width={b.width} height={b.height} fill="#a16207" stroke="#451a03" strokeWidth="2" />
            ))}
            
            {(currentLevel?.emojiStructures || editingLevel?.emojiStructures)?.map(s => (
                <text key={s.id} x={s.position.x} y={s.position.y} fontSize={s.fontSize} textAnchor="middle" dominantBaseline="central">{s.emoji}</text>
            ))}

            {enemies.map(enemy => (
                <text
                    key={enemy.id}
                    x={enemy.position.x}
                    y={enemy.position.y}
                    fontSize={enemy.radius * 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ opacity: (enemy.type === 'ghost' && !enemy.isSolid) ? 0.5 : 1, transition: 'opacity 0.1s' }}
                >
                    {enemy.emoji}
                </text>
            ))}
            
            {projectiles.map(p => (
                <text key={p.id} x={p.position.x} y={p.position.y} fontSize={p.radius * 2.5} textAnchor="middle" dominantBaseline="central">
                   😡
                </text>
            ))}

            {particles.map(p => (
                <circle key={p.id} cx={p.position.x} cy={p.position.y} r={p.radius} fill={p.color} />
            ))}
        </svg>

        {(gameState === 'playing' && currentLevel) && (
            <>
                <HUD score={score} levelName={currentLevel.name} projectiles={remainingProjectiles} />
                <SlingshotControls onFire={handleFire} isVisible={remainingProjectiles > 0} />
            </>
        )}
    </div>
  );
};

export default Game;