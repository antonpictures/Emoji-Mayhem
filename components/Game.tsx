import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Vec2, Projectile, Enemy, Level, Particle, Platform, BreakableBlock } from '../types';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  GROUND_Y,
  PLAYER_START_POS,
  PROJECTILE_RADIUS,
  GRAVITY,
  PROJECTILE_MAX_BOUNCES,
  PROJECTILE_BOUNCE_DAMPENING,
} from '../constants';
import { LEVELS } from './level-data';

import SlingshotControls from './SlingshotControls';
import HUD from './HUD';
import LevelSelectScreen from './LevelSelectScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import GameOverScreen from './GameOverScreen';

type GameState = 'level-select' | 'playing' | 'level-complete' | 'game-over';

const ENEMY_CONFIG = {
    grunt: { radius: 25, health: 50, color: '#ef4444', points: 100, emoji: '🐷' },
    brute: { radius: 40, health: 150, color: '#9333ea', points: 300, emoji: '👹' },
    flyer: { radius: 20, health: 30, color: '#3b82f6', points: 150, emoji: '👾' },
    bomber: { radius: 30, health: 50, color: '#f97316', points: 250, emoji: '💣' },
    ghost: { radius: 25, health: 60, color: '#a78bfa', points: 200, emoji: '👻' },
    hopper: { radius: 25, health: 40, color: '#22c55e', points: 175, emoji: '🐸' },
    tank: { radius: 50, health: 400, color: '#6b7280', points: 500, emoji: '🛡️' },
    sparky: { radius: 20, health: 80, color: '#facc15', points: 225, emoji: '⚡' },
};

const JUMP_COOLDOWN = 120; // frames
const BLAST_RADIUS = 100;
const BLAST_DAMAGE = 100;


interface GameProps {
  onQuit: () => void;
}

const Game: React.FC<GameProps> = ({ onQuit }) => {
  const [gameState, setGameState] = useState<GameState>('level-select');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [breakableBlocks, setBreakableBlocks] = useState<BreakableBlock[]>([]);
  const [remainingProjectiles, setRemainingProjectiles] = useState(0);
  const [score, setScore] = useState(0);

  const gameLoopRef = useRef<number | null>(null);

  const createParticleBurst = (position: Vec2, count: number, color: string): Particle[] => {
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
  };
  
  const loadLevel = useCallback((level: Level) => {
    setCurrentLevel(level);
    setRemainingProjectiles(level.projectiles);
    const newEnemies = level.enemies.map((e, i) => {
        const config = ENEMY_CONFIG[e.type];
        const enemy: Enemy = {
            ...config,
            id: `e-${level.id}-${i}`,
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
    setBreakableBlocks(level.breakableBlocks?.map(b => ({...b})) || []);
    setProjectiles([]);
    setParticles([]);
    setGameState('playing');
  }, []);

  const handleFire = useCallback((velocity: Vec2) => {
    if (remainingProjectiles <= 0) return;
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
  
    // 1. Update physics for existing entities
    const updatedProjectiles = projectiles.map(p => {
      let newVel = { x: p.velocity.x, y: p.velocity.y + GRAVITY.y };
      let newPos = { x: p.position.x + newVel.x, y: p.position.y + newVel.y };
      let bouncesLeft = p.bouncesLeft;

      if (newPos.y > GROUND_Y - p.radius && newVel.y > 0) {
        newPos.y = GROUND_Y - p.radius;
        newVel.y *= -PROJECTILE_BOUNCE_DAMPENING;
        bouncesLeft--;
      }
      return { ...p, position: newPos, velocity: newVel, bouncesLeft };
    });
  
    const updatedEnemies = enemies.map(enemy => {
        let newEnemy = {...enemy};

        if (newEnemy.type === 'flyer') {
            const phase = parseInt(newEnemy.id.replace(/\D/g,'')) % 100;
            newEnemy.position = {
              x: newEnemy.basePosition!.x + Math.sin((Date.now() / 1000) + phase) * 60,
              y: newEnemy.basePosition!.y + Math.cos((Date.now() / 800) + phase) * 40,
            };
            return newEnemy;
        } else if (newEnemy.type === 'sparky') {
            const phase = parseInt(newEnemy.id.replace(/\D/g,'')) % 100;
            // Vertical oscillation
            newEnemy.position.y = newEnemy.basePosition!.y + Math.sin((Date.now() / 500) + phase) * 50;
            // Horizontal zigzag
            newEnemy.position.x += 3 * (newEnemy.zigzagDirection || 1);
            if (Math.abs(newEnemy.position.x - newEnemy.basePosition!.x) > 80) {
                newEnemy.zigzagDirection = -(newEnemy.zigzagDirection || 1);
                newEnemy.position.x += 3 * (newEnemy.zigzagDirection || 1); // Correct overshoot
            }
            return newEnemy;
        } else if (newEnemy.type === 'ghost') {
            newEnemy.isSolid = (Date.now() % 4000) < 2500; // Visible for 2.5s, invisible for 1.5s
        } else if (newEnemy.type === 'hopper') {
            newEnemy.jumpCooldown = (newEnemy.jumpCooldown ?? 0) - 1;
            if (newEnemy.jumpCooldown <= 0 && newEnemy.position.y + newEnemy.radius >= GROUND_Y - 1) {
                newEnemy.velocity.y = -8; // Jump!
                newEnemy.jumpCooldown = JUMP_COOLDOWN;
            }
        }
        
        let newVel = { x: newEnemy.velocity.x, y: newEnemy.velocity.y + GRAVITY.y };
        let newPos = { x: newEnemy.position.x + newVel.x, y: newEnemy.position.y + newVel.y };

        const platforms = currentLevel?.platforms || [];
        for (const platform of platforms) {
            const pLeft = platform.position.x;
            const pRight = platform.position.x + platform.width;
            const pTop = platform.position.y;
            
            const wasAbove = newEnemy.position.y + newEnemy.radius <= pTop + 1;
            const willIntersectX = newPos.x + newEnemy.radius > pLeft && newPos.x - newEnemy.radius < pRight;
            const willIntersectY = newPos.y + newEnemy.radius >= pTop;

            if (wasAbove && willIntersectX && willIntersectY) {
                newPos.y = pTop - newEnemy.radius;
                newVel.y = 0;
                newVel.x *= 0.9; // Friction on platform
            }
        }
        
        if (newPos.y > GROUND_Y - newEnemy.radius) {
          newPos.y = GROUND_Y - newEnemy.radius;
          newVel.y = 0;
          newVel.x *= 0.9; // Ground friction
        }

        newEnemy.position = newPos;
        newEnemy.velocity = newVel;
        return newEnemy;
    });
  
    // 2. Collision detection and resolution
    let survivingEnemies = [...updatedEnemies];
    let survivingProjectiles: Projectile[] = [];
    let survivingBlocks = [...breakableBlocks];
  
    for (const projectile of updatedProjectiles) {
        let hasCollided = false;

        // Check against breakable blocks
        const nextSurvivingBlocks: BreakableBlock[] = [];
        for (const block of survivingBlocks) {
            if (projectile.position.x + projectile.radius > block.position.x &&
                projectile.position.x - projectile.radius < block.position.x + block.width &&
                projectile.position.y + projectile.radius > block.position.y &&
                projectile.position.y - projectile.radius < block.position.y + block.height) 
            {
                hasCollided = true;
                newParticles.push(...createParticleBurst(projectile.position, 15, '#8B4513'));
                const newHealth = block.health - 50;
                if (newHealth > 0) {
                    nextSurvivingBlocks.push({ ...block, health: newHealth });
                } else {
                    newParticles.push(...createParticleBurst({x: block.position.x + block.width / 2, y: block.position.y + block.height / 2}, 30, '#8B4513'));
                }
            } else {
                nextSurvivingBlocks.push(block);
            }
        }
        survivingBlocks = nextSurvivingBlocks;

        // Check against enemies
        const nextSurvivingEnemies: Enemy[] = [];
        for (const enemy of survivingEnemies) {
            const isGhostPhased = enemy.type === 'ghost' && !enemy.isSolid;
            const dx = projectile.position.x - enemy.position.x;
            const dy = projectile.position.y - enemy.position.y;
            const distance = Math.hypot(dx, dy);
    
            if (!isGhostPhased && distance < projectile.radius + enemy.radius) {
              hasCollided = true;
              newParticles.push(...createParticleBurst(projectile.position, 20, '#ffc700'));
              const damage = Math.hypot(projectile.velocity.x, projectile.velocity.y) * 5;
              const remainingHealth = enemy.health - damage;
              
              const enemyWithNewVelocity = {
                  ...enemy,
                  velocity: {
                      x: enemy.velocity.x + projectile.velocity.x * 0.2,
                      y: enemy.velocity.y + projectile.velocity.y * 0.2 - 2,
                  }
              };

              if (remainingHealth <= 0) {
                scoreToAdd += enemy.points;
                newParticles.push(...createParticleBurst(enemy.position, 30, enemy.color));

                // Handle Bomber explosion
                if (enemy.type === 'bomber') {
                    newParticles.push(...createParticleBurst(enemy.position, 100, '#ff0000'));
                    survivingEnemies.forEach(otherEnemy => {
                        if (otherEnemy.id !== enemy.id) {
                            const dist = Math.hypot(enemy.position.x - otherEnemy.position.x, enemy.position.y - otherEnemy.position.y);
                            if (dist < BLAST_RADIUS) {
                                otherEnemy.health -= BLAST_DAMAGE;
                                otherEnemy.velocity.x += (otherEnemy.position.x - enemy.position.x) * 0.1;
                                otherEnemy.velocity.y += (otherEnemy.position.y - enemy.position.y) * 0.1 - 3;
                            }
                        }
                    });
                    // Filter out enemies destroyed by blast
                    survivingEnemies = survivingEnemies.filter(e => {
                        if (e.health <= 0 && e.id !== enemy.id) {
                            scoreToAdd += e.points;
                            newParticles.push(...createParticleBurst(e.position, 30, e.color));
                            return false;
                        }
                        return true;
                    });
                }
              } else {
                nextSurvivingEnemies.push({ ...enemyWithNewVelocity, health: remainingHealth });
              }
            } else {
              nextSurvivingEnemies.push(enemy);
            }
        }
        survivingEnemies = nextSurvivingEnemies;

        // Check against static platforms
        for (const platform of (currentLevel?.platforms || [])) {
            if (projectile.position.x + projectile.radius > platform.position.x &&
                projectile.position.x - projectile.radius < platform.position.x + platform.width &&
                projectile.position.y + projectile.radius > platform.position.y &&
                projectile.position.y - projectile.radius < platform.position.y + platform.height)
            {
                hasCollided = true;
                newParticles.push(...createParticleBurst(projectile.position, 10, '#A0522D'));
                break;
            }
        }
        
        if (!hasCollided) {
            survivingProjectiles.push(projectile);
        }
    }
  
    const finalProjectiles = survivingProjectiles.filter(p =>
      p.bouncesLeft >= 0 &&
      p.position.x > -p.radius &&
      p.position.x < WORLD_WIDTH + p.radius
    );
  
    finalProjectiles.forEach(p => {
        if (Math.random() < 0.7) {
            newParticles.push({
                id: `trail-${Date.now()}-${Math.random()}`,
                position: { ...p.position },
                velocity: { x: (Math.random() - 0.5) * 1, y: (Math.random() - 0.5) * 1 },
                radius: Math.random() * 2 + 1,
                color: 'rgba(255, 255, 255, 0.5)',
                lifespan: 20 + Math.random() * 10
            });
        }
    });

    const updatedParticles = particles.map(p => ({
      ...p,
      position: { x: p.position.x + p.velocity.x, y: p.position.y + p.velocity.y },
      lifespan: p.lifespan - 1,
      radius: p.radius * 0.98
    })).filter(p => p.lifespan > 0);
  
    setProjectiles(finalProjectiles);
    setEnemies(survivingEnemies);
    setBreakableBlocks(survivingBlocks);
    setParticles([...updatedParticles, ...newParticles]);
    if (scoreToAdd > 0) {
      setScore(s => s + scoreToAdd);
    }
  
    if (survivingEnemies.length === 0 && currentLevel) {
      setScore(s => s + finalProjectiles.length * 50);
      setGameState('level-complete');
    } else if (finalProjectiles.length === 0 && remainingProjectiles === 0) {
      setGameState('game-over');
    } else {
      gameLoopRef.current = requestAnimationFrame(gameTick);
    }
  }, [projectiles, enemies, particles, breakableBlocks, remainingProjectiles, currentLevel]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameTick);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameTick]);

  const handleRestart = () => {
      setScore(0);
      setGameState('level-select');
  };

  const handleNextLevel = () => {
      if (!currentLevel) return;
      let nextLevelId = currentLevel.id + 1;
      let nextLevel = LEVELS.find(l => l.id === nextLevelId);
      if (!nextLevel) { // Loop back to first level if it's the end
          nextLevelId = 1;
          nextLevel = LEVELS.find(l => l.id === nextLevelId);
      }

      if (nextLevel) {
          loadLevel(nextLevel);
      } else {
          setGameState('level-select');
      }
  };
  
  const renderEnemy = (enemy: Enemy) => {
      const opacity = (enemy.type === 'ghost' && !enemy.isSolid) ? 0.4 : 1;
      return (
        <g key={enemy.id} transform={`translate(${enemy.position.x}, ${enemy.position.y})`} style={{ opacity }}>
          <text
            x="0"
            y="0"
            fontSize={enemy.radius * 1.8}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ userSelect: 'none' }}
          >
            {enemy.emoji}
          </text>
        </g>
      );
  };
  
  const sky = currentLevel?.theme?.sky || ['rgb(2, 6, 23)', 'rgb(17, 24, 39)', 'rgb(30, 41, 59)'];

  return (
    <div className="relative w-full h-full bg-blue-900 overflow-hidden">
      <svg
        viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: sky[0], stopOpacity:1}} />
                <stop offset="80%" style={{stopColor: sky[1], stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: sky[2], stopOpacity:1}} />
            </linearGradient>
            <pattern id="wood" patternUnits="userSpaceOnUse" width="60" height="60">
              <image href="https://www.transparenttextures.com/patterns/wood-pattern.png" x="0" y="0" width="60" height="60" />
            </pattern>
        </defs>
        <rect x="0" y="0" width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#skyGradient)" />

        <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height={WORLD_HEIGHT - GROUND_Y} fill="#228b22" />
        
        {currentLevel?.emojiStructures?.map(s => (
            <text
                key={s.id}
                x={s.position.x}
                y={s.position.y}
                fontSize={s.fontSize}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ userSelect: 'none', opacity: 0.8 }}
            >
                {s.emoji}
            </text>
        ))}
        
        <path d={`M ${PLAYER_START_POS.x - 20} ${GROUND_Y} L ${PLAYER_START_POS.x - 20} ${PLAYER_START_POS.y-10}`} stroke="saddlebrown" strokeWidth="10" />
        <path d={`M ${PLAYER_START_POS.x + 20} ${GROUND_Y} L ${PLAYER_START_POS.x + 20} ${PLAYER_START_POS.y-10}`} stroke="saddlebrown" strokeWidth="10" />
        
        {currentLevel?.platforms?.map(p => (
            <rect key={p.id} x={p.position.x} y={p.position.y} width={p.width} height={p.height} fill="#A0522D" stroke="#654321" strokeWidth="2" />
        ))}
        {breakableBlocks?.map(b => (
            <rect key={b.id} x={b.position.x} y={b.position.y} width={b.width} height={b.height} fill="url(#wood)" stroke="#663300" strokeWidth="3" opacity={(b.health / 100) * 0.7 + 0.3} />
        ))}

        {enemies.map(renderEnemy)}
        {projectiles.map(p => (
            <text
                key={p.id}
                x={p.position.x}
                y={p.position.y}
                fontSize={p.radius * 2.5}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ userSelect: 'none' }}
             >
                😡
             </text>
        ))}
        {particles.map(p => (
            <circle key={p.id} cx={p.position.x} cy={p.position.y} r={p.radius} fill={p.color} opacity={p.lifespan / 60} />
        ))}

      </svg>
      <SlingshotControls onFire={handleFire} isVisible={gameState === 'playing' && remainingProjectiles > 0} />
      <HUD
        score={score}
        levelName={currentLevel?.name || '---'}
        projectiles={remainingProjectiles}
      />
      
      {gameState === 'level-select' && <LevelSelectScreen onLevelSelect={loadLevel} onQuit={onQuit} />}
      {gameState === 'level-complete' && <LevelCompleteScreen score={score} onNext={handleNextLevel} />}
      {gameState === 'game-over' && <GameOverScreen onRestart={handleRestart} onQuit={onQuit} />}
    </div>
  );
};

export default Game;