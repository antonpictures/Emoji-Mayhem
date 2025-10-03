import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Level,
  Vec2,
  Projectile,
  Enemy,
  Particle,
  Platform,
  BreakableBlock,
  EmojiStructure,
  FloatingText,
  PokemonType,
  Wormhole,
  BlackHole,
} from '../types';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  GROUND_Y,
  PROJECTILE_RADIUS,
  PROJECTILE_MAX_BOUNCES,
  PROJECTILE_BOUNCE_DAMPENING,
  GRAVITY,
  ENEMY_COLLISION_DAMAGE,
  ENEMY_KNOCKBACK_FACTOR
} from '../constants';
import { ENEMY_CONFIG } from '../services/GameEngine';
import { POKEMON_DATA } from '../components/pokemon-data';
import { TYPE_CHART } from '../components/pokemon-type-chart';
import { soundManager } from '../components/SoundManager';
import { ENTITY_DATA } from '../services/entity-data';

type GameStatus = 'loading' | 'briefing' | 'playing' | 'won' | 'lost';

type Entities = {
  projectiles: Projectile[];
  enemies: Enemy[];
  particles: Particle[];
  platforms: Platform[];
  breakableBlocks: BreakableBlock[];
  emojiStructures: EmojiStructure[];
  floatingTexts: FloatingText[];
  wormholes: Wormhole[];
  blackHoles: BlackHole[];
};

export const useGameSession = (level: Level) => {
  const [status, setStatus] = useState<GameStatus>('loading');
  const [mpsEarned, setMpsEarned] = useState(0);
  const [entities, setEntities] = useState<Entities>({
    projectiles: [],
    enemies: [],
    particles: [],
    platforms: [],
    breakableBlocks: [],
    emojiStructures: [],
    floatingTexts: [],
    wormholes: [],
    blackHoles: [],
  });
  
  const [availableProjectiles, setAvailableProjectiles] = useState<Record<PokemonType, number>>(
      () => Object.values(PokemonType).reduce((acc, type) => ({...acc, [type]: 0}), {} as Record<PokemonType, number>)
  );

  const [selectedProjectileType, setSelectedProjectileType] = useState<PokemonType>(PokemonType.Normal);
  const [shake, setShake] = useState({ intensity: 0, duration: 0 });
  const [slingshotDrag, setSlingshotDrag] = useState<Vec2>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [slingshotPosition, setSlingshotPosition] = useState<Vec2 | null>(null);
  const [canPlaceProjectile, setCanPlaceProjectile] = useState(true);
  const [comboStreak, setComboStreak] = useState(0);

  const gameLoopRef = useRef<number | undefined>();
  
  const parallaxOffset = isDragging ? slingshotDrag : {
      x: (slingshotPosition?.x ?? WORLD_WIDTH / 2) - WORLD_WIDTH / 2,
      y: (slingshotPosition?.y ?? WORLD_HEIGHT / 2) - WORLD_HEIGHT / 2,
  };
    
  // Level Initialization
  useEffect(() => {
    setStatus('loading');
    
    const initialEnemies: Enemy[] = (level.enemies || []).map((e, index) => {
      const config = ENEMY_CONFIG[e.type];
      const emoji = e.emoji || config.emoji!;
      const pokemonInfo = POKEMON_DATA[emoji] || { name: 'Unknown', types: [PokemonType.Normal]};
      
      return {
        id: e.id || `enemy-${index}-${Date.now()}`,
        position: { ...e.position },
        basePosition: { ...e.position },
        velocity: { x: 0, y: 0 },
        health: config.health!,
        radius: e.radius || config.radius!,
        type: e.type,
        mpsReward: config.mpsReward!,
        color: config.color!,
        emoji: emoji,
        pokemonTypes: pokemonInfo.types,
        isSolid: config.isSolid,
        jumpCooldown: config.jumpCooldown,
        teleportCooldown: 0,
        zigzagDirection: 1,
        scale: e.scale || { x: 1, y: 1 },
      };
    });
    
    setEntities({
      projectiles: [],
      enemies: initialEnemies,
      particles: [],
      platforms: JSON.parse(JSON.stringify(level.platforms || [])),
      breakableBlocks: JSON.parse(JSON.stringify(level.breakableBlocks || [])),
      emojiStructures: JSON.parse(JSON.stringify(level.emojiStructures || [])),
      floatingTexts: [],
      wormholes: JSON.parse(JSON.stringify(level.wormholes || [])),
      blackHoles: JSON.parse(JSON.stringify(level.blackHoles || [])),
    });

    const allProjectileTypes = Object.values(PokemonType);
    const initialProjectiles = allProjectileTypes.reduce((acc, type) => {
        acc[type] = 15;
        return acc;
    }, {} as Record<PokemonType, number>);
    setAvailableProjectiles(initialProjectiles);
    setSelectedProjectileType(allProjectileTypes[0]);

    setMpsEarned(0);
    setComboStreak(0);
    setSlingshotPosition(null);
    setCanPlaceProjectile(true);
    setStatus('briefing');
  }, [level]);

  const createParticles = (position: Vec2, count: number, color: string, type?: 'swirl', center?: Vec2) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
        const particle: Particle = {
            id: `p-${Date.now()}-${Math.random()}`,
            position: { ...position },
            velocity: { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
            radius: Math.random() * 3 + 1,
            color,
            lifespan: 60,
        }
        if (type === 'swirl' && center) {
            particle.type = 'swirl';
            particle.center = center;
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 50 + 20;
            particle.position = { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius };
            particle.orbitRadius = radius;
            particle.angle = angle;
            particle.swirlSpeed = (Math.random() * 0.02 + 0.02) * (Math.random() > 0.5 ? 1 : -1)
        }
      newParticles.push(particle);
    }
    return newParticles;
  };
  
  const createFloatingText = (position: Vec2, text: string, color: string) => {
      return {
        id: `ft-${Date.now()}-${Math.random()}`,
        position,
        text,
        color,
        lifespan: 60
      };
  };
  
  const applyShake = (intensity: number, duration: number) => {
    setShake({ intensity, duration });
  };
  
  const handleSelectProjectile = (type: PokemonType) => {
    if(availableProjectiles[type] > 0) {
        setSelectedProjectileType(type);
        setSlingshotPosition(null);
        setCanPlaceProjectile(true);
    }
  };
  
  useEffect(() => {
    if (availableProjectiles[selectedProjectileType] === 0 && Object.values(availableProjectiles).some(c => c > 0)) {
      const allTypes = Object.values(PokemonType);
      const firstAvailable = allTypes.find(type => availableProjectiles[type] > 0);
      if (firstAvailable) {
        setSelectedProjectileType(firstAvailable);
      }
    }
  }, [availableProjectiles, selectedProjectileType]);

  const handleSlingshotDrag = (offset: Vec2) => setSlingshotDrag(offset);
  const handleDragStateChange = (isDragging: boolean) => setIsDragging(isDragging);
  const handlePlaceProjectile = (position: Vec2) => {
      if(canPlaceProjectile && status === 'playing') {
          setSlingshotPosition(position);
          setCanPlaceProjectile(false);
      }
  };
  const startGame = () => setStatus('playing');

  const handleFire = (velocity: Vec2) => {
    if (!slingshotPosition) return;
    
    setEntities(prev => ({ ...prev, projectiles: [...prev.projectiles, {
      id: `proj-${Date.now()}`,
      position: { ...slingshotPosition },
      velocity,
      radius: PROJECTILE_RADIUS,
      bouncesLeft: PROJECTILE_MAX_BOUNCES,
      projectileType: selectedProjectileType,
      teleportCooldown: 0,
    }] }));
    
    setAvailableProjectiles(prev => ({...prev, [selectedProjectileType]: prev[selectedProjectileType] - 1}));
    
    setSlingshotDrag({ x: 0, y: 0 });
    setSlingshotPosition(null);
    soundManager.playFire();
    setTimeout(() => setCanPlaceProjectile(true), 500);
  };
  
  const gameLoop = useCallback(() => {
    if (status !== 'playing') {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
    }

    let superEffectiveHitsThisFrame = 0;

    setEntities(prev => {
        // Fix: Provide the 'prev' state to JSON.stringify to correctly deep-clone the entities.
        const newEntities: Entities = JSON.parse(JSON.stringify(prev));
        let mpsToAdd = 0;
        let newParticles: Particle[] = [];
        let newFloatingTexts: FloatingText[] = [];

        // --- Physics & Interactions ---
        const gravitationalObjects = [...newEntities.blackHoles, ...newEntities.wormholes.filter(w => w.gravityRadius && w.gravityForce)];
        const movableObjects: (Projectile | Enemy)[] = [...newEntities.projectiles, ...newEntities.enemies];

        movableObjects.forEach(obj => {
            // Apply Gravity from Holes
            gravitationalObjects.forEach(gObj => {
                const dx = gObj.position.x - obj.position.x;
                const dy = gObj.position.y - obj.position.y;
                const distSq = dx * dx + dy * dy;
                if (distSq === 0) return;
                const gravityRadius = (gObj as BlackHole).gravityRadius || (gObj as Wormhole).gravityRadius!;
                
                if (distSq < gravityRadius * gravityRadius) {
                    const dist = Math.sqrt(distSq);
                    const force = ((gObj as BlackHole).gravityForce || (gObj as Wormhole).gravityForce!) / (distSq + 100); // Add softening factor
                    obj.velocity.x += (dx / dist) * force;
                    obj.velocity.y += (dy / dist) * force;
                }
            });

            // Black Hole Destruction
            let destroyedByBlackHole = false;
            newEntities.blackHoles.forEach(bh => {
                if (destroyedByBlackHole) return;
                const dx = bh.position.x - obj.position.x;
                const dy = bh.position.y - obj.position.y;
                const dist = Math.hypot(dx, dy);
                if (dist < bh.radius + obj.radius) {
                    if ('bouncesLeft' in obj) obj.bouncesLeft = 0;
                    else obj.health = 0;
                    newParticles.push(...createParticles(bh.position, 15, '#aaa', 'swirl', bh.position));
                    soundManager.playDestroy();
                    destroyedByBlackHole = true;
                }
            });
            if (destroyedByBlackHole) return;

            // Wormhole Teleportation
            if (obj.teleportCooldown && obj.teleportCooldown > 0) {
                obj.teleportCooldown--;
            } else {
                for (const wh of newEntities.wormholes) {
                    const dx = wh.position.x - obj.position.x;
                    const dy = wh.position.y - obj.position.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < wh.radius + obj.radius) {
                        const exitWh = newEntities.wormholes.find(w => w.id === wh.pairId);
                        if (exitWh) {
                            obj.position = { ...exitWh.position };
                            obj.teleportCooldown = 30; // 0.5s cooldown
                            newParticles.push(...createParticles(wh.position, 15, wh.type === 'black' ? '#FFA500' : '#ddd'));
                            newParticles.push(...createParticles(exitWh.position, 15, exitWh.type === 'black' ? '#FFA500' : '#ddd'));
                            soundManager.playImpact();
                            break; 
                        }
                    }
                }
            }

            // Apply World Gravity & Update Position
            obj.velocity.y += GRAVITY.y;
            obj.position.x += obj.velocity.x;
            obj.position.y += obj.velocity.y;

            // Wall & Ground Bounces / Checks
            if ('bouncesLeft' in obj) { // Is a projectile
                if (obj.position.x < -200 || obj.position.x > WORLD_WIDTH + 200 || obj.position.y > WORLD_HEIGHT + 200) {
                    obj.bouncesLeft = 0;
                }
                if ((obj.position.x - obj.radius < 0 || obj.position.x + obj.radius > WORLD_WIDTH) && obj.bouncesLeft > 0) {
                    obj.velocity.x *= -PROJECTILE_BOUNCE_DAMPENING;
                    obj.position.x = Math.max(obj.radius, Math.min(WORLD_WIDTH - obj.radius, obj.position.x));
                    obj.bouncesLeft--;
                    soundManager.playBounce();
                }
                if (obj.position.y + obj.radius > GROUND_Y && obj.bouncesLeft > 0) {
                    obj.velocity.y *= -PROJECTILE_BOUNCE_DAMPENING;
                    obj.position.y = GROUND_Y - obj.radius;
                    obj.bouncesLeft--;
                    soundManager.playBounce();
                }
            } else { // Is an enemy
                obj.velocity.x *= 0.98; obj.velocity.y *= 0.98;
                 if (obj.position.x - obj.radius < 0) { obj.position.x = obj.radius; obj.velocity.x *= -0.5; }
                if (obj.position.x + obj.radius > WORLD_WIDTH) { obj.position.x = WORLD_WIDTH - obj.radius; obj.velocity.x *= -0.5; }
                if (obj.position.y + obj.radius > GROUND_Y) { obj.position.y = GROUND_Y - obj.radius; obj.velocity.y = 0; }
                
                [...newEntities.platforms, ...newEntities.breakableBlocks].forEach(obstacle => {
                     if (!obstacle.position || !obstacle.width || !obstacle.height) return;
                    const closestX = Math.max(obstacle.position.x, Math.min(obj.position.x, obstacle.position.x + obstacle.width));
                    const closestY = Math.max(obstacle.position.y, Math.min(obj.position.y, obstacle.position.y + obstacle.height));
                    const dx = obj.position.x - closestX; const dy = obj.position.y - closestY;
                    if ((dx * dx) + (dy * dy) < obj.radius * obj.radius) {
                        const dist = Math.hypot(dx, dy); const overlap = obj.radius - dist;
                        const nx = dist === 0 ? 0 : dx / dist; const ny = dist === 0 ? -1 : dy / dist;
                        obj.position.x += nx * overlap; obj.position.y += ny * overlap;
                        const dot = obj.velocity.x * nx + obj.velocity.y * ny;
                        obj.velocity.x -= (1 + 0.1) * dot * nx; obj.velocity.y -= (1 + 0.1) * dot * ny;
                    }
                });
            }
        });
        
        // Projectile Collisions
        newEntities.projectiles.forEach(p => {
            if (p.bouncesLeft <= 0) return;
            // Find first valid collision
            const allTargets: (Enemy | Platform | BreakableBlock | EmojiStructure)[] = [...newEntities.enemies, ...newEntities.platforms, ...newEntities.breakableBlocks, ...newEntities.emojiStructures];
            const target = allTargets.find(t => {
                if (!t.health || t.health <= 0) return false;
                if ('radius' in t) { // Enemy
                     const enemy = t as Enemy;
                     const dx = p.position.x - enemy.position.x; const dy = p.position.y - enemy.position.y;
                     return Math.hypot(dx,dy) < p.radius + enemy.radius;
                } else if ('fontSize' in t) { // Emoji Structure
                    const structure = t as EmojiStructure;
                    const dx = p.position.x - structure.position.x; const dy = p.position.y - structure.position.y;
                    return Math.hypot(dx,dy) < p.radius + structure.fontSize/2;
                } else { // Platform or block
                    const block = t as Platform | BreakableBlock;
                    const closestX = Math.max(block.position.x, Math.min(p.position.x, block.position.x + block.width));
                    const closestY = Math.max(block.position.y, Math.min(p.position.y, block.position.y + block.height));
                    return Math.hypot(p.position.x - closestX, p.position.y - closestY) < p.radius;
                }
            });

            if (target) {
                soundManager.playImpact(); applyShake(5, 10);
                p.bouncesLeft = 0;
                const damage = (Math.hypot(p.velocity.x, p.velocity.y) * 5);
                let damageMultiplier = 1;
                const attackerType = p.projectileType;
                const targetTypes = (target as Enemy).pokemonTypes || ENTITY_DATA[('emoji' in target && target.emoji) || '❓']?.types || [PokemonType.Normal];

                targetTypes.forEach(defenderType => {
                    if (TYPE_CHART[attackerType].super_effective.includes(defenderType)) damageMultiplier *= 2;
                    if (TYPE_CHART[attackerType].not_very_effective.includes(defenderType)) damageMultiplier *= 0.5;
                    if (TYPE_CHART[attackerType].no_effect.includes(defenderType)) damageMultiplier *= 0;
                });
                
                const finalDamage = damage * damageMultiplier;
                target.health! -= finalDamage;
                newFloatingTexts.push(createFloatingText(target.position, Math.round(finalDamage).toString(), '#ffdd00'));
                if (damageMultiplier > 1) { newFloatingTexts.push(createFloatingText({x: target.position.x, y: target.position.y-25}, 'Super Effective!', '#4ade80')); superEffectiveHitsThisFrame++; }
                if (damageMultiplier < 1 && damageMultiplier > 0) newFloatingTexts.push(createFloatingText({x: target.position.x, y: target.position.y-25}, 'Not very effective...', '#a1a1aa'));

                if(target.health <= 0){
                    mpsToAdd += (target as Enemy).mpsReward || 50;
                    let position: Vec2;
                    if ('radius' in target) { // Enemy
                        position = target.position;
                    } else if ('fontSize' in target) { // EmojiStructure
                        position = target.position;
                    } else { // Platform or BreakableBlock
                        const block = target as Platform | BreakableBlock;
                        position = { x: block.position.x + block.width / 2, y: block.position.y + block.height / 2 };
                    }
                    newParticles.push(...createParticles(position, 20, (target as Enemy).color || '#ccc'));
                    soundManager.playDestroy();
                }
            }
        });

        // Enemy-Enemy Collision
        for (let i = 0; i < newEntities.enemies.length; i++) {
            for (let j = i + 1; j < newEntities.enemies.length; j++) {
                const e1 = newEntities.enemies[i]; const e2 = newEntities.enemies[j];
                const dx = e2.position.x - e1.position.x; const dy = e2.position.y - e1.position.y;
                const dist = Math.hypot(dx, dy); const min_dist = e1.radius + e2.radius;
                if (dist < min_dist) {
                    e1.health -= ENEMY_COLLISION_DAMAGE; e2.health -= ENEMY_COLLISION_DAMAGE;
                    const overlap = min_dist - dist;
                    const nx = dist === 0 ? 1 : dx / dist; const ny = dist === 0 ? 0 : dy / dist;
                    e1.position.x -= nx * overlap * 0.5; e1.position.y -= ny * overlap * 0.5;
                    e2.position.x += nx * overlap * 0.5; e2.position.y += ny * overlap * 0.5;
                    e1.velocity.x -= nx * ENEMY_KNOCKBACK_FACTOR; e1.velocity.y -= ny * ENEMY_KNOCKBACK_FACTOR;
                    e2.velocity.x += nx * ENEMY_KNOCKBACK_FACTOR; e2.velocity.y += ny * ENEMY_KNOCKBACK_FACTOR;
                }
            }
        }
        
        newEntities.enemies = newEntities.enemies.filter(e => e.health > 0);
        newEntities.breakableBlocks = newEntities.breakableBlocks.filter(b => b.health! > 0);
        newEntities.emojiStructures = newEntities.emojiStructures.filter(s => s.health! > 0 || s.health === undefined);
        newEntities.platforms = newEntities.platforms.filter(p => p.health! > 0 || p.health === undefined);
        newEntities.projectiles = newEntities.projectiles.filter(p => p.bouncesLeft > 0);

        newEntities.floatingTexts = newEntities.floatingTexts.map(t => ({...t, lifespan: t.lifespan - 1, position: {x: t.position.x, y: t.position.y-1}})).filter(t => t.lifespan > 0);
        newEntities.particles = newEntities.particles.map(p => ({...p, lifespan: p.lifespan - 1, position: {x: p.position.x + p.velocity.x, y: p.position.y + p.velocity.y}})).filter(p => p.lifespan > 0);
        newEntities.floatingTexts.push(...newFloatingTexts);
        newEntities.particles.push(...newParticles);

        if (mpsToAdd > 0) setMpsEarned(s => s + mpsToAdd);

        return newEntities;
    });

    if (superEffectiveHitsThisFrame > 0) {
        setComboStreak(prev => prev + superEffectiveHitsThisFrame);
    } else if (superEffectiveHitsThisFrame < 0) {
        setComboStreak(0);
    }

    setShake(prev => ({...prev, duration: Math.max(0, prev.duration -1)}));
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [status, comboStreak]);
  
  // Game Loop
  useEffect(() => {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return () => {
          if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      }
  }, [gameLoop]);
  
  // Win/Loss Condition
  useEffect(() => {
    if (status !== 'playing') return;
    const totalProjectilesLeft = Object.values(availableProjectiles).reduce((sum, count) => sum + count, 0);
    if (entities.enemies.length === 0) {
        setTimeout(() => { setStatus('won'); soundManager.playLevelComplete(); }, 500);
    } else if (totalProjectilesLeft === 0 && entities.projectiles.length === 0) {
        setTimeout(() => { setStatus('lost'); soundManager.playGameOver(); }, 1000);
    }
  }, [status, entities.enemies, entities.projectiles, availableProjectiles]);


  return {
    status, mpsEarned, entities, availableProjectiles, selectedProjectileType, shake, parallaxOffset,
    handleFire, handleSelectProjectile, handleSlingshotDrag, handleDragStateChange,
    slingshotPosition, canPlaceProjectile, handlePlaceProjectile, startGame,
  };
};