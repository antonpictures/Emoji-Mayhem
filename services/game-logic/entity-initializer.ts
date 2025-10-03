// Fix: Import Entities type from constants file where it is defined.
import { Level, PokemonType, Wormhole, BlackHole, Vec2, Enemy } from '../../types';
import { Entities } from '../../constants';
import { ENEMY_CONFIG } from '../GameEngine';
import { POKEMON_DATA } from '../../components/pokemon-data';
import { PLAYER_PROJECTILE_TYPES } from '../../components/projectile-data';

export const initializeAmmo = (level: Level): Record<PokemonType, number> => {
    const ammo: Record<string, number> = {};
    PLAYER_PROJECTILE_TYPES.forEach(t => ammo[t] = 0);

    if (level.projectileAmmo) {
        for (const type in level.projectileAmmo) {
            ammo[type as PokemonType] = level.projectileAmmo[type as PokemonType]!;
        }
        return ammo as Record<PokemonType, number>;
    }

    // Create a default distribution if projectileAmmo is not defined
    let remaining = level.projectiles;
    const defaultAmmoCount = Math.max(1, Math.floor(remaining / PLAYER_PROJECTILE_TYPES.length));
    
    PLAYER_PROJECTILE_TYPES.forEach(type => {
        if(remaining > 0) {
            const count = Math.min(remaining, defaultAmmoCount);
            ammo[type] = count;
            remaining -= count;
        }
    });

    // Distribute any remainder
    let i = 0;
    while (remaining > 0) {
        const type = PLAYER_PROJECTILE_TYPES[i % PLAYER_PROJECTILE_TYPES.length];
        ammo[type]++;
        remaining--;
        i++;
    }


    return ammo as Record<PokemonType, number>;
}


export const initializeEntities = (level: Level): Entities => {
    return {
        platforms: (level.platforms || []).map(p => ({
            id: p.id || `plt-${Math.random()}`,
            position: { ...p.position } as Vec2,
            width: p.width!,
            height: p.height!,
            health: p.health,
            movement: p.movement ? { ...p.movement } : undefined
        })),
        breakableBlocks: (level.breakableBlocks || []).map(b => ({
            id: b.id || `brk-${Math.random()}`,
            position: { ...b.position } as Vec2,
            width: b.width!,
            height: b.height!,
            health: b.health!
        })),
        enemies: level.enemies.map(e => {
            const config = ENEMY_CONFIG[e.type!];
            const emoji = e.emoji || config.emoji;
            const pokemonInfo = POKEMON_DATA[emoji!] || { types: [PokemonType.Normal] };
            return {
                id: e.id || `enm-${Math.random()}`,
                position: { ...e.position } as Vec2,
                velocity: { x: 0, y: 0 },
                health: e.health || config.health!,
                radius: e.radius || config.radius!,
                mpsReward: e.mpsReward || config.mpsReward!,
                color: config.color!,
                emoji: emoji!,
                pokemonTypes: pokemonInfo.types,
                type: e.type!,
                isSolid: config.isSolid,
                jumpCooldown: config.jumpCooldown,
                zigzagDirection: 1,
            } as Enemy;
        }),
        projectiles: [],
        particles: [],
        emojiStructures: (level.emojiStructures || []).map(s => ({
            id: s.id || `emo-${Math.random()}`,
            position: { ...s.position } as Vec2,
            emoji: s.emoji!,
            fontSize: s.fontSize!,
            health: s.health
        })),
        floatingTexts: [],
        poisonClouds: [],
        wormholes: (level.wormholes || []).map(w => ({ ...w } as Wormhole)),
        blackHoles: (level.blackHoles || []).map(b => ({ ...b } as BlackHole)),
    };
};