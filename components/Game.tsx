



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Vec2, Projectile, Enemy, Level, Particle, Platform, BreakableBlock, EnemyType, EmojiStructure, PokemonType, FloatingText } from '../types';
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
  ENEMY_KNOCKBACK_FACTOR,
  PLAYER_RADIUS
} from '../constants';

import SlingshotControls from './SlingshotControls';
import HUD from './HUD';
import LevelSelectScreen from './LevelSelectScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import GameOverScreen from './GameOverScreen';
import LevelEditorUI from './LevelEditorUI';
import ProjectileSelector, { TYPE_EMOJI_MAP, TYPE_COLOR_MAP } from './ProjectileSelector';
import { soundManager } from './SoundManager';
import { POKEMON_DATA } from './pokemon-data';
import { TYPE_CHART } from './pokemon-type-chart';

type GameState = 'level-select' | 'playing' | 'level-complete' | 'game-over' | 'level-editor';
type EditorObjectType = 'enemy' | 'platform' | 'breakableBlock' | 'emojiStructure';
type EditorObject = (Enemy | Platform | BreakableBlock | EmojiStructure) & { objectType: EditorObjectType };
type DragInfo = {
    type: 'move' | 'resize';
    handle: string; // e.g., 'body', 'bottom-right'
    startMousePos: Vec2;
    startObjectState: EditorObject;
};
type AvailableProjectiles = Record<PokemonType, number>;

export const ENEMY_CONFIG: Record<EnemyType, Omit<Enemy, 'id' | 'position' | 'velocity' | 'basePosition' | 'isSolid' | 'jumpCooldown' | 'zigzagDirection' | 'pokemonTypes'>> = {
    grunt: { radius: 25, health: 100, color: '#ef4444', points: 100, emoji: '🐷', type: 'grunt' },
    brute: { radius: 40, health: 200, color: '#9333ea', points: 300, emoji: '👹', type: 'brute' },
    flyer: { radius: 20, health: 60, color: '#3b82f6', points: 150, emoji: '👾', type: 'flyer' },
    bomber: { radius: 30, health: 80, color: '#f97316', points: 250, emoji: '💣', type: 'bomber' },
    ghost: { radius: 25, health: 120, color: '#a78bfa', points: 200, emoji: '👻', type: 'ghost' },
    hopper: { radius: 25, health: 80, color: '#22c55e', points: 175, emoji: '🐸', type: 'hopper' },
    tank: { radius: 50, health: 500, color: '#6b7280', points: 500, emoji: '🛡️', type: 'tank' },
    sparky: { radius: 20, health: 100, color: '#facc15', points: 225, emoji: '⚡', type: 'sparky' },
};

const ENEMY_DESCRIPTIONS: Record<EnemyType, string> = {
    grunt: 'A standard, reliable foe.',
    brute: 'Tough and heavy, difficult to move.',
    flyer: 'Hovers in the air, tricky to hit.',
    bomber: 'Explodes upon defeat, causing area damage.',
    ghost: 'Periodically becomes intangible and cannot be hit.',
    hopper: 'Jumps around unpredictably, making it hard to target.',
    tank: 'Extremely durable with very high health.',
    sparky: 'Moves in an erratic zigzag pattern, avoiding projectiles.'
};

const JUMP_COOLDOWN = 120; // frames
const BLAST_RADIUS = 100;
const BLAST_DAMAGE = 100;
const EDITOR_GRID_SNAP = 5;

const createNewLevel = (): Level => ({
    id: Date.now(),
    name: 'New Custom Level',
    projectiles: 20,
    enemies: [],
    platforms: [],
    breakableBlocks: [],
    emojiStructures: [],
    isCustom: true,
    theme: { sky: ['#87CEEB', '#B0E0E6', '#ADD8E6'] }
});

interface GameProps {
  onQuit: () => void;
  levels: Level[];
  onSaveLevel: (level: Level) => void;
  onDeleteLevel: (levelId: number) => void;
}
// Fix: Initialize available projectiles with all Pokemon types to satisfy the 'AvailableProjectiles' record type.
const initialAvailableProjectiles: AvailableProjectiles = Object.fromEntries(Object.values(PokemonType).map(t => [t, 0])) as AvailableProjectiles;

const Game: React.FC<GameProps> = ({ onQuit, levels, onSaveLevel, onDeleteLevel }) => {
  const [gameState, setGameState] = useState<GameState>('level-select');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  // Fix: Use a more specific type for platforms in the game state to reflect that health is always present after initialization.
  const [platforms, setPlatforms] = useState<(Platform & { health: number })[]>([]);
  const [breakableBlocks, setBreakableBlocks] = useState<BreakableBlock[]>([]);
  const [emojiStructures, setEmojiStructures] = useState<EmojiStructure[]>([]); // Only for editor
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  
  const [availableProjectiles, setAvailableProjectiles] = useState<AvailableProjectiles>(initialAvailableProjectiles);
  const [selectedProjectile, setSelectedProjectile] = useState<PokemonType>(PokemonType.Fire);
  
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState({ intensity: 0, duration: 0 });
  const [parallaxOffset, setParallaxOffset] = useState<Vec2>({ x: 0, y: 0 });
  const [isSlingshotDragging, setIsSlingshotDragging] = useState(false);

  // Hover Card State
  const [hoveredEnemy, setHoveredEnemy] = useState<Enemy | null>(null);
  const [cardPosition, setCardPosition] = useState<Vec2 | null>(null);

  // Editor State
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [editorTool, setEditorTool] = useState<string | null>(null);
  const [isTestingEditorLevel, setIsTestingEditorLevel] = useState(false);
  const [history, setHistory] = useState<Level[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [viewOffset, setViewOffset] = useState<Vec2>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Vec2>({ x: 0, y: 0 });
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const getCollectionName = useCallback((objectType: EditorObjectType): 'enemies' | 'platforms' | 'breakableBlocks' | 'emojiStructures' => {
    if (objectType === 'enemy') return 'enemies';
    return `${objectType}s` as 'platforms' | 'breakableBlocks' | 'emojiStructures';
  }, []);

  const getSVGMousePos = useCallback((e: MouseEvent | React.MouseEvent): Vec2 => {
    const svg = gameContainerRef.current?.querySelector('svg');
    if (!svg) return { x: 0, y: 0 };
    const screenPoint = svg.createSVGPoint();
    screenPoint.x = e.clientX;
    screenPoint.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const transformedPoint = screenPoint.matrixTransform(ctm.inverse());
    return { x: transformedPoint.x, y: transformedPoint.y };
  }, []);

  const triggerShake = useCallback((intensity: number, duration: number) => {
    setShake(prev => ({
        intensity: Math.max(prev.intensity, intensity),
        duration: Math.max(prev.duration, duration)
    }));
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

    const populateLevelEntities = useCallback((level: Level) => {
        const allEnemiesFromLevel = [
            ...(level.enemies || []),
            ...(level.emojiStructures || []).map(s => ({
                id: s.id,
                type: 'grunt' as EnemyType,
                position: s.position,
                emoji: s.emoji,
                radius: s.fontSize / 2
            }))
        ];

        const newEnemies = allEnemiesFromLevel.map((e, i) => {
            const config = ENEMY_CONFIG[e.type];
            const pokemonInfo = POKEMON_DATA[e.emoji || config.emoji] || { name: 'Unknown', types: [PokemonType.Normal]};
            
            const enemy: Enemy = {
                ...config,
                id: e.id || `e-${level.id}-${i}-${Math.random()}`,
                position: { ...e.position },
                velocity: { x: 0, y: 0 },
                type: e.type,
                emoji: e.emoji || config.emoji,
                radius: e.radius || config.radius,
                pokemonTypes: pokemonInfo.types,
            };
            if (e.type === 'flyer' || e.type === 'sparky') enemy.basePosition = { ...e.position };
            if (e.type === 'ghost') enemy.isSolid = true;
            if (e.type === 'hopper') enemy.jumpCooldown = Math.random() * JUMP_COOLDOWN;
            if (e.type === 'sparky') enemy.zigzagDirection = 1;
            return enemy;
        });
        setEnemies(newEnemies);
        setBreakableBlocks(level.breakableBlocks?.map(b => ({...b, health: b.health || 100, id: b.id || `bb-${Math.random()}`})) || []);
        setPlatforms(level.platforms?.map(p => ({...p, health: p.health || 200, id: p.id || `p-${Math.random()}`})) || []);
    }, []);
  
  const loadLevelForPlay = useCallback((level: Level) => {
    setCurrentLevel(level);
    // Fix: Correctly initialize the available projectiles object to match the 'AvailableProjectiles' type.
    const newAvailable = { ...initialAvailableProjectiles };
    const totalProjectiles = level.projectiles;
    const types: PokemonType[] = [PokemonType.Fire, PokemonType.Water, PokemonType.Grass];
    const projectilesPerType = Math.floor(totalProjectiles / types.length);
    const remainder = totalProjectiles % types.length;

    newAvailable[PokemonType.Fire] = projectilesPerType + (remainder > 0 ? 1 : 0);
    newAvailable[PokemonType.Water] = projectilesPerType + (remainder > 1 ? 1 : 0);
    newAvailable[PokemonType.Grass] = projectilesPerType;
    
    setAvailableProjectiles(newAvailable);
    setSelectedProjectile(PokemonType.Fire);

    populateLevelEntities(level);
    setProjectiles([]);
    setParticles([]);
    setFloatingTexts([]);
    setScore(0);
    setGameState('playing');
  }, [populateLevelEntities]);
  
  const loadLevelForEditor = (level: Level) => {
    const levelCopy = JSON.parse(JSON.stringify(level)); // Deep copy
    setEditingLevel(levelCopy);
    setGameState('level-editor');
    setHistory([levelCopy]);
    setHistoryIndex(0);
    setViewOffset({ x: 0, y: 0 });
    setZoom(1);
    setSelectedObjectId(null);
  };
  
  const handleFire = useCallback((velocity: Vec2) => {
    if (availableProjectiles[selectedProjectile] <= 0) return;

    soundManager.playFire();
    setAvailableProjectiles(prev => ({...prev, [selectedProjectile]: prev[selectedProjectile] - 1}));

    const newProjectile: Projectile = {
      id: `proj-${Date.now()}`,
      position: { ...PLAYER_START_POS },
      velocity,
      radius: PROJECTILE_RADIUS,
      bouncesLeft: PROJECTILE_MAX_BOUNCES,
      projectileType: selectedProjectile,
    };
    setProjectiles(prev => [...prev, newProjectile]);
  }, [availableProjectiles, selectedProjectile]);

  const calculateTypeEffectiveness = (attacker: PokemonType, defenders: PokemonType[]): { multiplier: number, message: string } => {
    let finalMultiplier = 1;
    for (const defenderType of defenders) {
        const chart = TYPE_CHART[attacker];
        if (chart.super_effective.includes(defenderType)) finalMultiplier *= 2;
        if (chart.not_very_effective.includes(defenderType)) finalMultiplier *= 0.5;
        if (chart.no_effect.includes(defenderType)) return { multiplier: 0, message: 'No effect...' };
    }

    if (finalMultiplier > 1) return { multiplier: finalMultiplier, message: 'Super Effective!' };
    if (finalMultiplier < 1) return { multiplier: finalMultiplier, message: 'Not very effective...' };
    return { multiplier: 1, message: '' };
  };

    const gameTick = useCallback(() => {
    if (gameState !== 'playing') return;

    if (shake.duration > 0) { setShake(s => ({ intensity: s.intensity * 0.9, duration: s.duration - 1 })); }

    let scoreToAdd = 0;
    const newParticles: Particle[] = [];
    const newFloatingTexts: FloatingText[] = [];
    let localPlatforms = [...platforms];
    let localBreakableBlocks = [...breakableBlocks];
    
    let updatedProjectiles = projectiles.map(p => {
      let newVel = { x: p.velocity.x, y: p.velocity.y + GRAVITY.y };
      let newPos = { x: p.position.x + newVel.x, y: p.position.y + newVel.y };
      let bouncesLeft = p.bouncesLeft;
      if (newPos.y > GROUND_Y - p.radius && newVel.y > 0) {
        newPos.y = GROUND_Y - p.radius;
        newVel.y *= -PROJECTILE_BOUNCE_DAMPENING;
        bouncesLeft--;
        if (bouncesLeft > 0) {
          newParticles.push(...createParticleBurst(newPos, 5, '#ffffff'));
          soundManager.playBounce();
        }
      }
      return { ...p, position: newPos, velocity: newVel, bouncesLeft };
    });

    // Fix: Explicitly type the mapped array and the enemy object to prevent type inference issues.
    let updatedEnemies: Enemy[] = enemies.map((enemy): Enemy => {
        let newEnemy: Enemy = {...enemy, velocity: {...enemy.velocity}, position: {...enemy.position}};
        if (newEnemy.type === 'flyer') {
            const phase = parseInt(newEnemy.id.replace(/\D/g,'')) % 100;
            newEnemy.position = { x: newEnemy.basePosition!.x + Math.sin((Date.now() / 1000) + phase) * 60, y: newEnemy.basePosition!.y + Math.cos((Date.now() / 800) + phase) * 40 };
        } else if (newEnemy.type === 'sparky') {
            const phase = parseInt(newEnemy.id.replace(/\D/g,'')) % 100;
            newEnemy.position.y = newEnemy.basePosition!.y + Math.sin((Date.now() / 500) + phase) * 20;
            newEnemy.position.x += 2 * newEnemy.zigzagDirection!;
            if (newEnemy.position.x > newEnemy.basePosition!.x + 50 || newEnemy.position.x < newEnemy.basePosition!.x - 50) newEnemy.zigzagDirection! *= -1;
        } else if (newEnemy.type === 'hopper') {
            if (Number(newEnemy.jumpCooldown!) <= 0 && newEnemy.position.y >= GROUND_Y - newEnemy.radius) {
                newEnemy.velocity.y = -10; newEnemy.velocity.x = (Math.random() - 0.5) * 8;
                newEnemy.jumpCooldown = JUMP_COOLDOWN + Math.random() * 60;
            } else { newEnemy.jumpCooldown! -= 1; }
        } else if (newEnemy.type === 'ghost') { newEnemy.isSolid = Math.random() > 0.05; }
        
        if (newEnemy.type !== 'flyer' && newEnemy.type !== 'sparky') {
            newEnemy.velocity.y += GRAVITY.y;
            newEnemy.position.x += newEnemy.velocity.x;
            newEnemy.position.y += newEnemy.velocity.y;
            const allSupports = [...platforms, ...breakableBlocks];
            for (const p of allSupports) {
                const enemyBottom = newEnemy.position.y + newEnemy.radius;
                const wasAbove = (enemy.position.y + enemy.radius) <= p.position.y + 1;
                const isWithinX = (newEnemy.position.x + newEnemy.radius > p.position.x) && (newEnemy.position.x - newEnemy.radius < p.position.x + p.width);
                if (newEnemy.velocity.y >= 0 && wasAbove && isWithinX && enemyBottom >= p.position.y) {
                    newEnemy.position.y = p.position.y - newEnemy.radius;
                    newEnemy.velocity.y = 0; newEnemy.velocity.x *= 0.8;
                }
            }
            if (newEnemy.position.y > GROUND_Y - newEnemy.radius) {
                newEnemy.position.y = GROUND_Y - newEnemy.radius;
                newEnemy.velocity.y = 0; newEnemy.velocity.x *= 0.8;
            }
        }
        return newEnemy;
    });

    for (let i = 0; i < updatedEnemies.length; i++) {
        for (let j = i + 1; j < updatedEnemies.length; j++) {
            const enemyA = updatedEnemies[i]; const enemyB = updatedEnemies[j];
            if (enemyA.type === 'flyer' || enemyA.type === 'sparky' || enemyB.type === 'flyer' || enemyB.type === 'sparky') continue;
            const dx = enemyB.position.x - enemyA.position.x; const dy = enemyB.position.y - enemyA.position.y;
            const dist = Math.hypot(dx, dy); const overlap = (enemyA.radius + enemyB.radius) - dist;
            if (overlap > 0) {
                enemyA.health -= ENEMY_COLLISION_DAMAGE; enemyB.health -= ENEMY_COLLISION_DAMAGE;
                soundManager.playCollision();
                const angle = Math.atan2(dy, dx); const moveX = Math.cos(angle) * overlap / 2; const moveY = Math.sin(angle) * overlap / 2;
                enemyA.position.x -= moveX; enemyA.position.y -= moveY; enemyB.position.x += moveX; enemyB.position.y += moveY;
                enemyA.velocity.x -= moveX * ENEMY_KNOCKBACK_FACTOR; enemyA.velocity.y -= moveY * ENEMY_KNOCKBACK_FACTOR;
                enemyB.velocity.x += moveX * ENEMY_KNOCKBACK_FACTOR; enemyB.velocity.y += moveY * ENEMY_KNOCKBACK_FACTOR;
            }
        }
    }

    let destroyedEnemyIds = new Set<string>();
    let destroyedPlatformIds = new Set<string>();
    let destroyedBlockIds = new Set<string>();

    updatedProjectiles = updatedProjectiles.filter(proj => {
        if (proj.bouncesLeft <= 0) return false;
        
        for (const enemy of updatedEnemies) {
            if (destroyedEnemyIds.has(enemy.id) || (enemy.type === 'ghost' && !enemy.isSolid)) continue;
            if (Math.hypot(proj.position.x - enemy.position.x, proj.position.y - enemy.position.y) < proj.radius + enemy.radius) {
                soundManager.playImpact();
                const baseDamage = Math.max(20, Math.hypot(proj.velocity.x, proj.velocity.y) * 8);
                const { multiplier, message } = calculateTypeEffectiveness(proj.projectileType, enemy.pokemonTypes);
                
                if (message) {
                    const color = multiplier > 1 ? '#34d399' : (multiplier < 1 ? '#fbbf24' : '#f87171');
                    newFloatingTexts.push({ id: `ft-${Date.now()}`, text: message, position: {x: enemy.position.x, y: enemy.position.y - enemy.radius}, color, lifespan: 60 });
                }

                enemy.health -= baseDamage * multiplier;
                if (enemy.type === 'brute' || enemy.type === 'tank') triggerShake(8, 15);
                newParticles.push(...createParticleBurst(proj.position, 20, enemy.color));
                const angle = Math.atan2(proj.position.y - enemy.position.y, proj.position.x - enemy.position.x);
                enemy.velocity.x += Math.cos(angle) * 5; enemy.velocity.y += Math.sin(angle) * 5;
                if (enemy.health <= 0) destroyedEnemyIds.add(enemy.id);
                return false;
            }
        }
        for (const block of localBreakableBlocks) {
            const closestX = Math.max(block.position.x, Math.min(proj.position.x, block.position.x + block.width));
            const closestY = Math.max(block.position.y, Math.min(proj.position.y, block.position.y + block.height));
            if (Math.hypot(proj.position.x - closestX, proj.position.y - closestY) < proj.radius) {
                soundManager.playImpact(); block.health -= 100;
                newParticles.push(...createParticleBurst({x: closestX, y: closestY}, 10, '#a16207'));
                if (block.health <= 0) destroyedBlockIds.add(block.id); return false;
            }
        }
        for (const plat of localPlatforms) {
            const closestX = Math.max(plat.position.x, Math.min(proj.position.x, plat.position.x + plat.width));
            const closestY = Math.max(plat.position.y, Math.min(proj.position.y, plat.position.y + plat.height));
            if (Math.hypot(proj.position.x - closestX, proj.position.y - closestY) < proj.radius) {
                soundManager.playImpact();
                // Fix: Remove non-null assertion as the more specific state type ensures health is a number.
                plat.health -= 50;
                newParticles.push(...createParticleBurst({x: closestX, y: closestY}, 10, '#6b7280'));
                if (plat.health <= 0) destroyedPlatformIds.add(plat.id); return false;
            }
        }
        return proj.position.x > -proj.radius && proj.position.x < WORLD_WIDTH + proj.radius;
    });
    
    let destructionQueue = new Set(destroyedEnemyIds);
    updatedEnemies.forEach(e => { if (e.health <= 0) destructionQueue.add(e.id); });
    let processedDestruction = new Set<string>();
    while (destructionQueue.size > 0) {
        const currentId = destructionQueue.values().next().value;
        destructionQueue.delete(currentId);
        if (processedDestruction.has(currentId)) continue;
        const deadEnemy = updatedEnemies.find(e => e.id === currentId);
        if (deadEnemy) {
            processedDestruction.add(currentId);
            scoreToAdd += deadEnemy.points;
            newParticles.push(...createParticleBurst(deadEnemy.position, 50, deadEnemy.color));
            soundManager.playDestroy();
            if (deadEnemy.type === 'bomber') {
                triggerShake(20, 30); newParticles.push(...createParticleBurst(deadEnemy.position, 100, '#ff9900'));
                const applyBlastDamage = (target: { position: Vec2, health: number, id: string, radius?: number, width?: number, height?: number }, targetType: 'enemy' | 'block' | 'platform') => {
                    let closestX, closestY;
                    if (targetType === 'enemy') {
                        closestX = target.position.x;
                        closestY = target.position.y;
                    } else {
                        closestX = Math.max(target.position.x, Math.min(deadEnemy.position.x, target.position.x + target.width!));
                        closestY = Math.max(target.position.y, Math.min(deadEnemy.position.y, target.position.y + target.height!));
                    }
                    const dist = Math.hypot(deadEnemy.position.x - closestX, deadEnemy.position.y - closestY);
                    const radius = (targetType === 'enemy' ? target.radius! : 0);

                    if (dist < BLAST_RADIUS + radius) {
                        target.health -= BLAST_DAMAGE * (1 - dist / (BLAST_RADIUS + radius));
                        if (target.health <= 0) {
                            if (targetType === 'enemy') destructionQueue.add(target.id);
                            if (targetType === 'block') destroyedBlockIds.add(target.id);
                            if (targetType === 'platform') destroyedPlatformIds.add(target.id);
                        }
                    }
                };
                updatedEnemies.forEach(other => !processedDestruction.has(other.id) && !destructionQueue.has(other.id) && applyBlastDamage(other, 'enemy'));
                localBreakableBlocks.forEach(block => !destroyedBlockIds.has(block.id) && applyBlastDamage(block, 'block'));
                localPlatforms.forEach(plat => !destroyedPlatformIds.has(plat.id) && applyBlastDamage({ ...plat, health: plat.health, radius: 0 }, 'platform'));
            }
        }
    }

    const stillEnemies = updatedEnemies.filter(e => !processedDestruction.has(e.id));
    
    if (destroyedPlatformIds.size > 0) { localPlatforms = localPlatforms.filter(p => !destroyedPlatformIds.has(p.id)); destroyedPlatformIds.forEach(() => soundManager.playBlockBreak()); }
    if (destroyedBlockIds.size > 0) { localBreakableBlocks = localBreakableBlocks.filter(b => !destroyedBlockIds.has(b.id)); destroyedBlockIds.forEach(() => soundManager.playBlockBreak()); }
    
    // FIX: Explicitly cast 'count' to a number to prevent type errors with the reduce function.
    const remainingProjCount = Object.values(availableProjectiles).reduce((sum, count) => sum + Number(count), 0);

    const updatedParticles = particles.map(p => ({ ...p, position: { x: p.position.x + p.velocity.x, y: p.position.y + p.velocity.y }, lifespan: p.lifespan - 1 })).filter(p => p.lifespan > 0);
    const updatedFloatingTexts = floatingTexts.map(t => ({ ...t, position: { x: t.position.x, y: t.position.y - 0.5 }, lifespan: t.lifespan - 1})).filter(t => t.lifespan > 0);

    setScore(s => s + scoreToAdd);
    setEnemies(stillEnemies);
    setProjectiles(updatedProjectiles);
    setParticles([...updatedParticles, ...newParticles]);
    setFloatingTexts([...updatedFloatingTexts, ...newFloatingTexts]);
    setPlatforms(localPlatforms);
    setBreakableBlocks(localBreakableBlocks);

    if (stillEnemies.length === 0 && gameState === 'playing') { soundManager.playLevelComplete(); setGameState('level-complete'); } 
    else if (remainingProjCount <= 0 && updatedProjectiles.length === 0 && stillEnemies.length > 0 && gameState === 'playing') { soundManager.playGameOver(); setGameState('game-over'); }
  }, [projectiles, enemies, particles, platforms, breakableBlocks, floatingTexts, availableProjectiles, createParticleBurst, gameState, triggerShake, shake.duration]);

  const recordHistory = useCallback((newLevelState: Level) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLevelState)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  useEffect(() => {
    if (gameState === 'level-editor' && editingLevel) {
        setEnemies([]); // Clear game enemies
        // Fix: Map over platforms to ensure each has a 'health' property, satisfying the state's more specific type.
        setPlatforms((editingLevel.platforms || []).map(p => ({ ...p, health: p.health || 200 })));
        setBreakableBlocks(editingLevel.breakableBlocks || []);
        setEmojiStructures(editingLevel.emojiStructures || []);
    }
  }, [editingLevel, gameState]);
  
  const getEditorObjects = useCallback((): EditorObject[] => {
    if (!editingLevel) return [];
    const allObjects: EditorObject[] = [];
    // Fix: Inflate partial enemy data from the level file into full Enemy objects to satisfy the EditorObject type.
    editingLevel.enemies?.forEach(e => {
        const config = ENEMY_CONFIG[e.type];
        const pokemonInfo = POKEMON_DATA[e.emoji || config.emoji] || { name: 'Unknown', types: [PokemonType.Normal]};
        const enemy: Enemy = {
            ...config,
            id: e.id || `e-editor-${Math.random()}`,
            position: { ...e.position },
            velocity: { x: 0, y: 0 },
            type: e.type,
            emoji: e.emoji || config.emoji,
            radius: e.radius || config.radius,
            pokemonTypes: pokemonInfo.types,
        };
        if (e.type === 'flyer' || e.type === 'sparky') enemy.basePosition = { ...e.position };
        if (e.type === 'ghost') enemy.isSolid = true;
        if (e.type === 'hopper') enemy.jumpCooldown = Math.random() * JUMP_COOLDOWN;
        if (e.type === 'sparky') enemy.zigzagDirection = 1;
        allObjects.push({ ...enemy, objectType: 'enemy' });
    });
    editingLevel.platforms?.forEach(p => allObjects.push({ ...p, objectType: 'platform' }));
    editingLevel.breakableBlocks?.forEach(b => allObjects.push({ ...b, objectType: 'breakableBlock' }));
    editingLevel.emojiStructures?.forEach(s => allObjects.push({ ...s, objectType: 'emojiStructure' }));
    return allObjects;
  }, [editingLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Delete' || gameState !== 'level-editor' || !selectedObjectId || !editingLevel) return;
      const objectToDelete = getEditorObjects().find(o => o.id === selectedObjectId);
      if (objectToDelete) {
        const newLevel = JSON.parse(JSON.stringify(editingLevel));
        const collectionName = getCollectionName(objectToDelete.objectType);
        const collection = (newLevel as any)[collectionName];
        if(Array.isArray(collection)) { (newLevel as any)[collectionName] = collection.filter((item: any) => item.id !== objectToDelete.id); }
        setEditingLevel(newLevel);
        recordHistory(newLevel);
        setSelectedObjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [gameState, selectedObjectId, editingLevel, getEditorObjects, recordHistory, getCollectionName]);

  useEffect(() => {
    const handleInteraction = () => { soundManager.initialize(); document.removeEventListener('mousedown', handleInteraction); document.removeEventListener('touchstart', handleInteraction); }
    document.addEventListener('mousedown', handleInteraction); document.addEventListener('touchstart', handleInteraction);
    
    let animationFrameId: number;
    const runGameTick = () => { if (gameState === 'playing') gameTick(); animationFrameId = window.requestAnimationFrame(runGameTick); };
    animationFrameId = window.requestAnimationFrame(runGameTick);

    return () => {
      document.removeEventListener('mousedown', handleInteraction); document.removeEventListener('touchstart', handleInteraction);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, gameTick]);

  const handleNextLevel = () => {
    const sortedLevels = levels.filter(l => !l.isCustom).sort((a,b) => a.id - b.id);
    const currentIndex = sortedLevels.findIndex(l => l.id === currentLevel!.id);
    if (currentIndex !== -1 && currentIndex + 1 < sortedLevels.length) { loadLevelForPlay(sortedLevels[currentIndex + 1]); } 
    else { setGameState('level-select'); }
  };
  const handleRestartLevel = () => { currentLevel && loadLevelForPlay(currentLevel); };
  const handleReturnToEditor = () => { setIsTestingEditorLevel(false); if (editingLevel) loadLevelForEditor(editingLevel); };
    
  const handleUndo = () => { if (historyIndex > 0) { const newIndex = historyIndex - 1; setHistoryIndex(newIndex); setEditingLevel(history[newIndex]); } };
  const handleRedo = () => { if (historyIndex < history.length - 1) { const newIndex = historyIndex + 1; setHistoryIndex(newIndex); setEditingLevel(history[newIndex]); } };
  const handleZoom = (direction: 'in' | 'out') => setZoom(prev => Math.max(0.2, Math.min(5, direction === 'in' ? prev * 1.2 : prev / 1.2)));
  const handleResetView = () => { setZoom(1); setViewOffset({x: 0, y: 0}); };
  const handleSaveAndExitEditor = () => { if (!editingLevel) return; onSaveLevel(editingLevel); setGameState('level-select'); };

  const getObjectBoundingBox = (obj: EditorObject) => {
    if (obj.objectType === 'enemy') {
        // FIX: The object from the level editor is not a full 'Enemy' type.
        // Casting to a more accurate, partial type prevents properties from being inferred as 'unknown'.
        const e = obj as { position: Vec2; radius?: number; type: EnemyType; };
        const radius = e.radius || ENEMY_CONFIG[e.type].radius;
        return { x: e.position.x - radius, y: e.position.y - radius, width: radius * 2, height: radius * 2 };
    }
    if (obj.objectType === 'emojiStructure') {
        const s = obj as EmojiStructure;
        const size = s.fontSize;
        return { x: s.position.x - size / 2, y: s.position.y - size / 2, width: size, height: size };
    }
    const o = obj as Platform | BreakableBlock;
    return { x: o.position.x, y: o.position.y, width: o.width, height: o.height };
  };
  
  const handleEditorMouseDown = (e: React.MouseEvent) => {
    if (gameState !== 'level-editor' || e.button === 2) return;
    const mousePos = getSVGMousePos(e);

    const checkHandleClick = () => {
        if (!selectedObjectId) return null;
        const selectedObject = getEditorObjects().find(o => o.id === selectedObjectId);
        if (!selectedObject) return null;
        const box = getObjectBoundingBox(selectedObject);
        const handles = {
            'top-left': { x: box.x, y: box.y }, 'top-right': { x: box.x + box.width, y: box.y },
            'bottom-left': { x: box.x, y: box.y + box.height }, 'bottom-right': { x: box.x + box.width, y: box.y + box.height },
        };
        for (const [handleName, pos] of Object.entries(handles)) {
            if (Math.hypot(mousePos.x - pos.x, mousePos.y - pos.y) < 10 / zoom) return { handle: handleName, object: selectedObject };
        }
        return null;
    };

    const handleInfo = checkHandleClick();
    if (handleInfo) {
        e.stopPropagation();
        setDragInfo({ type: 'resize', handle: handleInfo.handle, startMousePos: mousePos, startObjectState: handleInfo.object });
        return;
    }

    const clickedObject = getEditorObjects().reverse().find(obj => {
        const box = getObjectBoundingBox(obj);
        return mousePos.x >= box.x && mousePos.x <= box.x + box.width && mousePos.y >= box.y && mousePos.y <= box.y + box.height;
    });

    if (clickedObject) {
        e.stopPropagation(); setSelectedObjectId(clickedObject.id);
        setDragInfo({ type: 'move', handle: 'body', startMousePos: mousePos, startObjectState: clickedObject });
    } else {
        setSelectedObjectId(null);
        if (editorTool) {
            // Fix: Explicitly type the newLevel object to avoid losing type information after JSON operations.
            const newLevel = JSON.parse(JSON.stringify(editingLevel!)) as Level;
            const snappedPos = { x: Math.round(mousePos.x / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP, y: Math.round(mousePos.y / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP };
            
            if (editorTool.startsWith('emoji:')) {
                const emoji = editorTool.substring('emoji:'.length);
                const id = `emoji-${Date.now()}-${Math.random()}`;
                if (!newLevel.emojiStructures) newLevel.emojiStructures = [];
                newLevel.emojiStructures.push({ id, position: snappedPos, emoji, fontSize: 50, health: 50 });
            } else {
                const id = `${editorTool.slice(0, 4)}-${Date.now()}`;
                if (editorTool === 'platform') { if (!newLevel.platforms) newLevel.platforms = []; newLevel.platforms.push({ id, position: snappedPos, width: 150, height: 20, health: 200 }); }
                else if (editorTool === 'breakable') { if (!newLevel.breakableBlocks) newLevel.breakableBlocks = []; newLevel.breakableBlocks.push({ id, position: snappedPos, width: 80, height: 80, health: 100 }); }
                else if (Object.keys(ENEMY_CONFIG).includes(editorTool)) { if (!newLevel.enemies) newLevel.enemies = []; newLevel.enemies.push({ id, type: editorTool as EnemyType, position: snappedPos, emoji: ENEMY_CONFIG[editorTool as EnemyType].emoji }); }
            }
            setEditingLevel(newLevel); recordHistory(newLevel);
        }
    }
  };

  const handleEditorMouseMove = (e: React.MouseEvent) => {
    if (!dragInfo || !editingLevel) return;
    const mousePos = getSVGMousePos(e);
    const dx = mousePos.x - dragInfo.startMousePos.x; const dy = mousePos.y - dragInfo.startMousePos.y;
    // Fix: Explicitly type the newLevel object to avoid losing type information after JSON operations.
    const newLevel = JSON.parse(JSON.stringify(editingLevel)) as Level;
    const findAndApplyUpdate = (collectionName: keyof Level, updates: any) => {
        const collection = (newLevel as any)[collectionName] as any[];
        const entity = collection?.find((item: any) => item.id === dragInfo.startObjectState.id);
        if (entity) Object.assign(entity, updates);
    };
    const collectionName = getCollectionName(dragInfo.startObjectState.objectType);

    if (dragInfo.type === 'move') {
        const newX = (dragInfo.startObjectState as any).position.x + dx; const newY = (dragInfo.startObjectState as any).position.y + dy;
        const pos = { position: { x: Math.round(newX / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP, y: Math.round(newY / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP } };
        findAndApplyUpdate(collectionName, pos);
    } else if (dragInfo.type === 'resize') {
        const startBox = getObjectBoundingBox(dragInfo.startObjectState);
        let {x, y, width, height} = startBox;
        if (dragInfo.handle.includes('right')) width = Math.max(10, startBox.width + dx);
        if (dragInfo.handle.includes('left')) { width = Math.max(10, startBox.width - dx); x = startBox.x + dx; }
        if (dragInfo.handle.includes('bottom')) height = Math.max(10, startBox.height + dy);
        if (dragInfo.handle.includes('top')) { height = Math.max(10, startBox.height - dy); y = startBox.y + dy; }
        width = Math.round(width / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP; height = Math.round(height / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP;

        const type = dragInfo.startObjectState.objectType;
        if (type === 'platform' || type === 'breakableBlock') { findAndApplyUpdate(collectionName, { position: {x,y}, width, height }); }
        else if (type === 'enemy' || type === 'emojiStructure') {
            const size = Math.max(width, height);
            const newRadius = Math.max(10, size / 2); const newFontSize = Math.max(10, size);
            const newPos = { x: x + width/2, y: y + height/2 };
            const updates = type === 'enemy' ? { position: newPos, radius: newRadius } : { position: newPos, fontSize: newFontSize };
            findAndApplyUpdate(collectionName, updates);
        }
    }
    setEditingLevel(newLevel);
  };
  
  const handleEditorMouseUp = () => { if (dragInfo && editingLevel) recordHistory(editingLevel); setDragInfo(null); };

  const handleEditorContextMenu = (e: React.MouseEvent) => {
      if (gameState !== 'level-editor') return; e.preventDefault();
      const mousePos = getSVGMousePos(e);
      const clickedObject = getEditorObjects().reverse().find(obj => {
          const box = getObjectBoundingBox(obj);
          return mousePos.x >= box.x && mousePos.x <= box.x + box.width && mousePos.y >= box.y && mousePos.y <= box.y + box.height;
      });
      if (clickedObject) {
          // Fix: Explicitly type the newLevel object to avoid losing type information after JSON operations.
          const newLevel = JSON.parse(JSON.stringify(editingLevel!)) as Level;
          const collectionName = getCollectionName(clickedObject.objectType);
          (newLevel as any)[collectionName] = ((newLevel as any)[collectionName] as any[]).filter((item: any) => item.id !== clickedObject.id);
          setEditingLevel(newLevel); recordHistory(newLevel); setSelectedObjectId(null);
      }
  };

  useEffect(() => {
    const handlePanStart = (e: MouseEvent) => { if (gameState === 'level-editor' && e.button === 2) { e.preventDefault(); setIsPanning(true); setPanStart({ x: e.clientX, y: e.clientY }); }};
    const handlePanMove = (e: MouseEvent) => { if (isPanning) { e.preventDefault(); const dx = (e.clientX - panStart.x) / zoom; const dy = (e.clientY - panStart.y) / zoom; setViewOffset(prev => ({ x: prev.x - dx, y: prev.y - dy })); setPanStart({ x: e.clientX, y: e.clientY }); }};
    const handlePanEnd = (e: MouseEvent) => { if (e.button === 2) setIsPanning(false); };
    window.addEventListener('mousedown', handlePanStart); window.addEventListener('mousemove', handlePanMove); window.addEventListener('mouseup', handlePanEnd);
    return () => { window.removeEventListener('mousedown', handlePanStart); window.removeEventListener('mousemove', handlePanMove); window.removeEventListener('mouseup', handlePanEnd); };
  }, [gameState, isPanning, panStart, zoom]);

  const handleEnemyHover = (enemy: Enemy, e: React.MouseEvent) => {
    if (gameState === 'playing') {
      const rect = gameContainerRef.current?.getBoundingClientRect();
      if(rect) {
        setHoveredEnemy(enemy);
        setCardPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    }
  };

  const handleEnemyLeave = () => {
    setHoveredEnemy(null);
  };

  const renderStatsCard = () => {
    if (!hoveredEnemy || !cardPosition) return null;

    const pokemonInfo = POKEMON_DATA[hoveredEnemy.emoji] || { name: 'Unknown', types: [PokemonType.Normal] };
    const maxHealth = ENEMY_CONFIG[hoveredEnemy.type].health;

    return (
        <div 
            className="w-64 rounded-xl shadow-2xl bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-600 p-4 text-white font-sans overflow-hidden transition-all duration-200"
            style={{ position: 'absolute', top: cardPosition.y + 20, left: cardPosition.x + 20, zIndex: 50, pointerEvents: 'none' }}
        >
            <div className="flex items-center space-x-4 mb-3">
                <span className="text-5xl">{hoveredEnemy.emoji}</span>
                <div>
                    <h3 className="font-black text-xl tracking-tighter">{pokemonInfo.name}</h3>
                    <div className="flex space-x-1.5 mt-1">
                        {hoveredEnemy.pokemonTypes.map(type => (
                            <span 
                                key={type} 
                                className={`px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-md ${TYPE_COLOR_MAP[type].split(' ')[0]}`}
                            >
                                {type.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                    <div className="text-gray-400 text-xs font-bold uppercase">Health</div>
                    <div className="font-bold text-lg">{Math.max(0, Math.round(hoveredEnemy.health))} / {maxHealth}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-xs font-bold uppercase">Points</div>
                    <div className="font-bold text-lg">{hoveredEnemy.points}</div>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-300 italic">{ENEMY_DESCRIPTIONS[hoveredEnemy.type]}</p>
            </div>
        </div>
    );
  };

  const renderSky = () => {
    const theme = currentLevel?.theme || editingLevel?.theme;
    if (!theme) return <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="#333" />;
    const [start, mid, end] = theme.sky;
    const parallaxX = 50 + parallaxOffset.x * 0.02; const parallaxY = 80 + parallaxOffset.y * 0.02;
    return (<><defs><radialGradient id="skyGradient" cx={`${parallaxX}%`} cy={`${parallaxY}%`} r="100%" fx="50%" fy="100%"><stop offset="0%" style={{stopColor: end}} /><stop offset="40%" style={{stopColor: mid}} /><stop offset="100%" style={{stopColor: start}} /></radialGradient></defs><rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#skyGradient)" /></>)
  };

  const renderSelectionBox = () => {
    if (gameState !== 'level-editor' || !selectedObjectId) return null;
    const selectedObject = getEditorObjects().find(o => o.id === selectedObjectId);
    if (!selectedObject) return null;
    const box = getObjectBoundingBox(selectedObject);
    const handleSize = 8 / zoom;
    const handles = {'top-left': { x: box.x, y: box.y }, 'top-right': { x: box.x + box.width, y: box.y },'bottom-left': { x: box.x, y: box.y + box.height }, 'bottom-right': { x: box.x + box.width, y: box.y + box.height },};
    return (<g><rect x={box.x} y={box.y} width={box.width} height={box.height} fill="none" stroke="cyan" strokeWidth={2 / zoom} strokeDasharray={`${4/zoom}, ${2/zoom}`} />{Object.values(handles).map((pos, i) => (<rect key={i} x={pos.x - handleSize / 2} y={pos.y - handleSize / 2} width={handleSize} height={handleSize} fill="cyan" stroke="black" strokeWidth={1/zoom} style={{cursor: 'pointer'}} />))}</g>);
  };
  
  let shakeTransform = shake.duration > 0 ? `translate(${(Math.random() - 0.5) * 2 * shake.intensity}px, ${(Math.random() - 0.5) * 2 * shake.intensity}px)` : '';

  const editorEntities = { 
      p: editingLevel?.platforms || [], 
      bb: editingLevel?.breakableBlocks || [], 
      e: (editingLevel?.enemies || []).map(e => ({...e, radius: e.radius || ENEMY_CONFIG[e.type].radius})),
      es: editingLevel?.emojiStructures || [] 
  };
  const playingEntities = {
      p: platforms, bb: breakableBlocks, e: enemies, es: []
  };
  const entitiesToRender = gameState === 'level-editor' ? editorEntities : playingEntities;
  // FIX: Explicitly cast 'count' to a number to prevent type errors with the reduce function.
  const totalProjectiles = Object.values(availableProjectiles).reduce((sum, count) => sum + Number(count), 0);

  return (
    <div ref={gameContainerRef} className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden select-none">
        {gameState === 'level-select' && (<LevelSelectScreen levels={levels} onLevelSelect={loadLevelForPlay} onQuit={onQuit} onStartEditor={() => loadLevelForEditor(createNewLevel())} onEditLevel={loadLevelForEditor} onDeleteLevel={onDeleteLevel}/>)}
        {gameState === 'level-complete' && <LevelCompleteScreen score={score} onNext={handleNextLevel} isTestingEditorLevel={isTestingEditorLevel} onReturnToEditor={handleReturnToEditor} />}
        {gameState === 'game-over' && <GameOverScreen onRestart={handleRestartLevel} onQuit={onQuit} isTestingEditorLevel={isTestingEditorLevel} onReturnToEditor={handleReturnToEditor} />}
        {gameState === 'level-editor' && (<LevelEditorUI onSelectTool={setEditorTool} selectedTool={editorTool} onTest={() => { setIsTestingEditorLevel(true); loadLevelForPlay(editingLevel!); }} onSave={handleSaveAndExitEditor} onExit={() => setGameState('level-select')} onUndo={handleUndo} onRedo={handleRedo} canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1} onZoomIn={() => handleZoom('in')} onZoomOut={() => handleZoom('out')} onResetView={handleResetView}/>)}
        
        {renderStatsCard()}
      
        <svg viewBox={`${viewOffset.x} ${viewOffset.y} ${WORLD_WIDTH / zoom} ${WORLD_HEIGHT / zoom}`} className="h-full w-auto" style={{ maxHeight: '100vh', maxWidth: '100vw', transform: shakeTransform, cursor: gameState === 'level-editor' ? 'default' : 'auto' }} onMouseDown={handleEditorMouseDown} onMouseMove={handleEditorMouseMove} onMouseUp={handleEditorMouseUp} onContextMenu={handleEditorContextMenu}>
            {renderSky()}
            <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height={WORLD_HEIGHT - GROUND_Y} fill="#4a3b2b" />
            <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height="20" fill="#6a563f" />
            
            {(gameState === 'playing') && (
              <text
                x={PLAYER_START_POS.x}
                y={PLAYER_START_POS.y}
                fontSize={PLAYER_RADIUS * 2}
                textAnchor="middle"
                dominantBaseline="central"
              >
                😡
              </text>
            )}

            {(gameState === 'playing' && !isSlingshotDragging && totalProjectiles > 0) && (
              <text
                x={PLAYER_START_POS.x}
                y={PLAYER_START_POS.y}
                fontSize={PROJECTILE_RADIUS * 2.5}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {TYPE_EMOJI_MAP[selectedProjectile]}
              </text>
            )}
            
            {entitiesToRender.p?.map(p => <rect key={p.id} x={p.position.x} y={p.position.y} width={p.width} height={p.height} fill="#6b7280" stroke="#4b5563" strokeWidth="2" />)}
            {entitiesToRender.bb?.map(b => <rect key={b.id} x={b.position.x} y={b.position.y} width={b.width} height={b.height} fill="#a16207" stroke="#451a03" strokeWidth="2" />)}
            {entitiesToRender.es?.map(s => <text key={s.id} x={s.position.x} y={s.position.y} fontSize={s.fontSize} textAnchor="middle" dominantBaseline="central">{s.emoji}</text>)}
            
            {entitiesToRender.e.map(enemy => {
                const maxHealth = ENEMY_CONFIG[enemy.type].health;
                const healthPercentage = Math.max(0, enemy.health) / maxHealth;
                const barWidth = enemy.radius * 1.5;
                const barHeight = 8;
                const healthColor = healthPercentage > 0.5 ? '#4ade80' : healthPercentage > 0.2 ? '#facc15' : '#ef4444';

                return (
                  <g key={enemy.id} onMouseEnter={(e) => handleEnemyHover(enemy, e)} onMouseLeave={handleEnemyLeave}>
                      <text x={enemy.position.x} y={enemy.position.y} fontSize={enemy.radius * 2} textAnchor="middle" dominantBaseline="central" style={{ opacity: (enemy.type === 'ghost' && !enemy.isSolid) ? 0.5 : 1, transition: 'opacity 0.1s' }}>{enemy.emoji}</text>
                      {gameState === 'playing' && (
                        <g transform={`translate(${enemy.position.x - barWidth / 2}, ${enemy.position.y + enemy.radius + 5})`}>
                            <rect width={barWidth} height={barHeight} fill="#3f3f46" rx="4" ry="4" stroke="#18181b" strokeWidth="1" />
                            <rect width={barWidth * healthPercentage} height={barHeight} fill={healthColor} rx="4" ry="4" style={{ transition: 'width 0.2s ease' }} />
                        </g>
                      )}
                  </g>
                );
            })}

            {projectiles.map(p => <text key={p.id} x={p.position.x} y={p.position.y} fontSize={p.radius * 2.5} textAnchor="middle" dominantBaseline="central">{TYPE_EMOJI_MAP[p.projectileType]}</text>)}
            {particles.map(p => <circle key={p.id} cx={p.position.x} cy={p.position.y} r={p.radius} fill={p.color} />)}
            {floatingTexts.map(t => <text key={t.id} x={t.position.x} y={t.position.y} fill={t.color} fontSize="24" fontWeight="bold" textAnchor="middle" style={{ opacity: t.lifespan / 60, pointerEvents: 'none', textShadow: '1px 1px 2px black' }}>{t.text}</text>)}

            {renderSelectionBox()}
        </svg>

        {(gameState === 'playing' && currentLevel) && (
            <>
                <HUD score={score} levelName={currentLevel.name} projectiles={totalProjectiles} onBackToMenu={() => setGameState('level-select')} />
                <SlingshotControls onFire={handleFire} onDrag={setParallaxOffset} isVisible={totalProjectiles > 0} selectedProjectileType={selectedProjectile} onDragStateChange={setIsSlingshotDragging} />
                <ProjectileSelector availableProjectiles={availableProjectiles} selectedType={selectedProjectile} onSelectType={setSelectedProjectile} />
            </>
        )}
    </div>
  );
};

export default Game;