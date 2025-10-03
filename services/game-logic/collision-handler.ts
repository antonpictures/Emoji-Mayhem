import { Entities, PROJECTILE_MAX_BOUNCES } from '../../constants';
import { PokemonType, Projectile, Enemy, BreakableBlock, Platform, FloatingText } from '../../types';
import { POKEMON_DATA } from '../../components/pokemon-data';
import { TYPE_CHART } from '../../components/pokemon-type-chart';
import { soundManager } from '../../components/SoundManager';
import { applyProjectileAbility } from './projectile-abilities';

const calculateDamage = (attacker: PokemonType, defenders: PokemonType[]) => {
    let multiplier = 1;
    const chart = TYPE_CHART[attacker];
    
    if (attacker === PokemonType.Dragon) {
        multiplier *= 1.5; // Dragon Rage flat damage boost
    }

    defenders.forEach(defender => {
        if (chart.super_effective.includes(defender)) multiplier *= 2;
        if (chart.not_very_effective.includes(defender)) multiplier *= 0.5;
        if (chart.no_effect.includes(defender)) multiplier *= 0;
    });

    return {
        amount: 50 * multiplier,
        effectiveness: multiplier
    };
};

export const handleCollisions = (currentEntities: Entities, callbacks: any) => {
    const newEntities = { ...currentEntities };
    let totalMpsEarned = 0;

    newEntities.projectiles = newEntities.projectiles.filter(proj => {
        if (proj.bounces > PROJECTILE_MAX_BOUNCES || proj.health === 0) {
            return false;
        }

        let hitSomething = false;

        // Projectile vs Enemy
        for (const enemy of newEntities.enemies) {
            if (enemy.health <= 0) continue;
            const dist = Math.hypot(proj.position.x - enemy.position.x, proj.position.y - enemy.position.y);
            if (dist < proj.radius + enemy.radius) {
                hitSomething = true;
                soundManager.playImpact();
                
                const damage = calculateDamage(proj.projectileType, enemy.pokemonTypes);
                enemy.health -= damage.amount;
                enemy.velocity.x += proj.velocity.x * 0.2;
                enemy.velocity.y += proj.velocity.y * 0.2;

                let damageColor = '#ffffff'; // white for normal
                if (damage.effectiveness > 1) damageColor = '#4ade80'; // green for super effective
                if (damage.effectiveness < 1 && damage.effectiveness > 0) damageColor = '#f87171'; // red for not very effective
                if (damage.effectiveness === 0) damageColor = '#94a3b8'; // gray for no effect

                newEntities.floatingTexts.push({
                    id: `ft-dmg-${Date.now()}-${Math.random()}`,
                    position: { x: enemy.position.x, y: enemy.position.y - enemy.radius },
                    text: `${Math.round(damage.amount)}`,
                    color: damageColor,
                    lifespan: 60,
                    velocity: { x: 0, y: -0.5 }
                });
                
                applyProjectileAbility(proj, enemy, newEntities, callbacks);
                
                if (proj.projectileType === PokemonType.Fire) break; // Fire explodes and is gone
            }
        }
        if (hitSomething && proj.projectileType === PokemonType.Fire) return false;

        // Projectile vs BreakableBlock
        for (const block of newEntities.breakableBlocks) {
            if (block.health <= 0) continue;
            const closestX = Math.max(block.position.x, Math.min(proj.position.x, block.position.x + block.width));
            const closestY = Math.max(block.position.y, Math.min(proj.position.y, block.position.y + block.height));
            const distance = Math.hypot(proj.position.x - closestX, proj.position.y - closestY);

            if (distance < proj.radius) {
                // Ghost projectile can phase through one block
                if (proj.projectileType === PokemonType.Ghost && proj.penetrationsLeft && proj.penetrationsLeft > 0) {
                    proj.penetrationsLeft--;
                    continue; // Skip collision
                }

                hitSomething = true;
                soundManager.playBlockBreak();
                let damage = 25;
                if (proj.projectileType === PokemonType.Steel || proj.projectileType === PokemonType.Rock) {
                    damage = 75; // Steel/Rock are good against structures
                }
                block.health -= damage;
                applyProjectileAbility(proj, block, newEntities, callbacks);
                break;
            }
        }
        if (hitSomething && proj.projectileType !== PokemonType.Steel) {
            return false; // Most projectiles break on impact with blocks
        }
        
        // Projectile vs Platform
        for (const platform of newEntities.platforms) {
             const closestX = Math.max(platform.position.x, Math.min(proj.position.x, platform.position.x + platform.width));
             const closestY = Math.max(platform.position.y, Math.min(proj.position.y, platform.position.y + platform.height));
             const distance = Math.hypot(proj.position.x - closestX, proj.position.y - closestY);

             if (distance < proj.radius) {
                 hitSomething = true;
                 soundManager.playImpact();
                 applyProjectileAbility(proj, platform, newEntities, callbacks);
                 break;
             }
        }

        return !hitSomething || proj.projectileType === PokemonType.Steel; // Steel projectile persists
    });

    // Filter out destroyed enemies and blocks
    newEntities.enemies = newEntities.enemies.filter(e => {
        if (e.health <= 0) {
            soundManager.playDestroy();
            callbacks.applyShake(4, 10);
            totalMpsEarned += e.mpsReward;
            
            newEntities.floatingTexts.push({
                id: `ft-mps-${Date.now()}-${Math.random()}`,
                position: { x: e.position.x, y: e.position.y - e.radius },
                text: `+${e.mpsReward}`,
                color: '#facc15', // yellow-400
                lifespan: 60,
                velocity: { x: 0, y: -1 }
            });
            
            return false;
        }
        return true;
    });

    newEntities.breakableBlocks = newEntities.breakableBlocks.filter(b => b.health > 0);
    
    return { entities: newEntities, mps: totalMpsEarned };
};