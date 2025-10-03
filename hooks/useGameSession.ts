import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// Fix: Import Entities type from constants file where it is defined.
import { Level, Vec2, Projectile, PokemonType } from '../types';
import { Entities } from '../constants';
import { initializeEntities, initializeAmmo } from '../services/game-logic/entity-initializer';
import { updateAllEntities } from '../services/game-logic/entity-updater';
import { handleCollisions } from '../services/game-logic/collision-handler';
import { soundManager } from '../components/SoundManager';
import { PROJECTILE_RADIUS } from '../constants';

type GameStatus = 'playing' | 'won' | 'lost';

export const useGameSession = (initialLevel: Level, isRunning: boolean) => {
    const [level, setLevel] = useState(initialLevel);
    const [entities, setEntities] = useState<Entities>(() => initializeEntities(level));
    const [ammo, setAmmo] = useState<Record<PokemonType, number>>(() => initializeAmmo(level));
    const [mpsEarned, setMpsEarned] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
    const [shake, setShake] = useState({ intensity: 0, duration: 0 });
    const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

    const projectilesLeft = useMemo(() => Object.values(ammo).reduce((sum, count) => sum + count, 0), [ammo]);

    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | undefined>(undefined);

    const gameLoop = useCallback(() => {
        let newEntities = JSON.parse(JSON.stringify(entities));

        // 1. Update positions, velocities, and AI behaviors
        newEntities = updateAllEntities(newEntities);

        // 2. Handle all collisions and game events
        const collisionResults = handleCollisions(newEntities, {
            applyShake: (intensity, duration) => setShake(prev => ({
                intensity: Math.max(prev.intensity, intensity),
                duration: Math.max(prev.duration, duration)
            }))
        });

        // 3. Update state based on collision results
        setEntities(collisionResults.entities);
        if (collisionResults.mps > 0) {
            setMpsEarned(prev => prev + collisionResults.mps);
        }

        // 4. Update shake effect
        if (shake.duration > 0) {
            setShake(prev => ({...prev, duration: prev.duration - 1}));
        } else if (shake.intensity > 0) {
            setShake({ intensity: 0, duration: 0 });
        }

        // 5. Check win/loss conditions
        if (collisionResults.entities.enemies.length === 0) {
            setGameStatus('won');
        } else if (projectilesLeft <= 0 && collisionResults.entities.projectiles.length === 0) {
            setGameStatus('lost');
        }
        
        requestRef.current = requestAnimationFrame(gameLoop);
    }, [entities, projectilesLeft, shake.duration, shake.intensity]);

    useEffect(() => {
        if (isRunning && gameStatus === 'playing') {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            lastTimeRef.current = undefined;
        };
    }, [isRunning, gameStatus, gameLoop]);
    
    const fireProjectile = useCallback((velocity: Vec2, projectileType: PokemonType) => {
        if ((ammo[projectileType] || 0) <= 0) return;
        
        soundManager.playFire();
        
        setAmmo(prev => ({
            ...prev,
            [projectileType]: prev[projectileType] - 1
        }));

        const newProjectile: Projectile = {
            id: `proj-${Date.now()}`,
            position: { x: 150, y: 600 },
            velocity,
            radius: PROJECTILE_RADIUS,
            bounces: 0,
            projectileType,
        };
        
        if (projectileType === PokemonType.Ghost) {
            newProjectile.penetrationsLeft = 1;
        }

        setEntities(prev => ({
            ...prev,
            projectiles: [...prev.projectiles, newProjectile]
        }));
    }, [ammo]);

    const restartLevel = useCallback(() => {
        setEntities(initializeEntities(level));
        setAmmo(initializeAmmo(level));
        setMpsEarned(0);
        setGameStatus('playing');
    }, [level]);

    const loadNewLevel = useCallback((newLevelData: Level) => {
        const preservedProps = {
            id: level.id,
            name: level.name,
            projectiles: level.projectiles,
            creator: level.creator,
            isCustom: level.isCustom,
            isCommunity: level.isCommunity,
        };
        const sanitizedLevel = { ...newLevelData, ...preservedProps };
        setLevel(sanitizedLevel);
        setEntities(initializeEntities(sanitizedLevel));
        setAmmo(initializeAmmo(sanitizedLevel));
        setMpsEarned(0);
        setGameStatus('playing');
    }, [level]);

    return { entities, ammo, projectilesLeft, mpsEarned, gameStatus, shake, parallaxOffset, fireProjectile, restartLevel, loadNewLevel };
};