// Fix: Import Entities type from constants file where it is defined.
import { Projectile, Enemy, BreakableBlock, Platform } from '../../types';
import { Entities } from '../../constants';
import { soundManager } from '../../components/SoundManager';

// Helper to create particles - should be moved to a utility file if it grows
const createParticles = (count: number, position: any, color: string, speed: number) => {
    const newParticles: any[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        newParticles.push({
            id: `p-${Date.now()}-${Math.random()}`,
            position: { ...position },
            velocity: { x: Math.cos(angle) * Math.random() * speed, y: Math.sin(angle) * Math.random() * speed },
            radius: Math.random() * 3 + 1,
            color,
            lifespan: 60,
        });
    }
    return newParticles;
};

export const applyProjectileAbility = (
    proj: Projectile,
    hitTarget: Enemy | BreakableBlock | Platform,
    allEntities: Entities,
    callbacks: any
) => {
    const isEnemy = (target: any): target is Enemy => target.type !== undefined;

    switch (proj.projectileType) {
        case 'Fire':
            callbacks.applyShake(5, 15);
            allEntities.particles.push(...createParticles(40, proj.position, '#ff6347', 5));
            allEntities.enemies.forEach(otherEnemy => {
                if (Math.hypot(proj.position.x - otherEnemy.position.x, proj.position.y - otherEnemy.position.y) < 80) {
                    otherEnemy.health -= 30;
                    otherEnemy.velocity.x += (otherEnemy.position.x - proj.position.x) * 0.1;
                    otherEnemy.velocity.y += (otherEnemy.position.y - proj.position.y) * 0.1;
                }
            });
            break;

        case 'Water':
            callbacks.applyShake(3, 10);
            allEntities.particles.push(...createParticles(20, proj.position, '#4169e1', 3));
            allEntities.enemies.forEach(otherEnemy => {
                if (Math.hypot(proj.position.x - otherEnemy.position.x, proj.position.y - otherEnemy.position.y) < 100) {
                    otherEnemy.velocity.x += (otherEnemy.position.x - proj.position.x) * 0.3;
                    otherEnemy.velocity.y += (otherEnemy.position.y - proj.position.y) * 0.3;
                }
            });
            break;

        case 'Grass':
            if (!proj.isSubProjectile && isEnemy(hitTarget)) {
                for (let i = 0; i < 3; i++) {
                    const angle = (i - 1) * 0.5 + Math.atan2(proj.velocity.y, proj.velocity.x);
                    allEntities.projectiles.push({
                        ...proj, id: `${proj.id}-sub-${i}`,
                        velocity: { x: Math.cos(angle) * 10, y: Math.sin(angle) * 10 },
                        radius: proj.radius * 0.7, isSubProjectile: true, bounces: 0
                    });
                }
            }
            break;

        case 'Electric':
            if (isEnemy(hitTarget)) {
                let zapped = 0;
                allEntities.enemies.forEach(otherEnemy => {
                    if (otherEnemy.id !== hitTarget.id && zapped < 2 && Math.hypot(hitTarget.position.x - otherEnemy.position.x, hitTarget.position.y - otherEnemy.position.y) < 120) {
                        otherEnemy.health -= 25;
                        zapped++;
                    }
                });
            }
            break;
            
        case 'Fighting':
             if (isEnemy(hitTarget)) {
                hitTarget.velocity.x += proj.velocity.x * 0.8;
                hitTarget.velocity.y += proj.velocity.y * 0.8;
             }
            break;

        case 'Ice':
            allEntities.particles.push(...createParticles(15, proj.position, '#afeeee', 4));
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                allEntities.projectiles.push({
                    ...proj, id: `${proj.id}-shard-${i}`, projectileType: 'Ice',
                    velocity: { x: Math.cos(angle) * 8, y: Math.sin(angle) * 8 },
                    radius: proj.radius * 0.5, isSubProjectile: true, bounces: 2
                });
            }
            break;
        
        case 'Poison':
             allEntities.poisonClouds.push({
                id: `cloud-${Date.now()}`,
                position: { ...proj.position },
                radius: 80,
                lifespan: 300, // 5 seconds
                damage: 5
             });
            break;
            
        case 'Ground':
            if(!isEnemy(hitTarget)) { // Only on ground/platform impact
                callbacks.applyShake(6, 20);
                allEntities.enemies.forEach(enemy => {
                    if (Math.hypot(proj.position.x - enemy.position.x, proj.position.y - enemy.position.y) < 150) {
                         enemy.velocity.y -= 3; // Nudge upwards
                    }
                });
            }
            break;

        case 'Bug':
            allEntities.particles.push(...createParticles(10, proj.position, '#a3b18a', 2));
            break;
            
        case 'Dark':
            allEntities.particles.push(...createParticles(15, proj.position, '#4c1d95', 3));
            allEntities.enemies.forEach(enemy => {
                if (Math.hypot(proj.position.x - enemy.position.x, proj.position.y - enemy.position.y) < 100) {
                     enemy.stunTimer = 120; // Stun for 2 seconds
                }
            });
            break;

        case 'Fairy':
            allEntities.particles.push(...createParticles(25, proj.position, '#fbcfe8', 2));
            break;
    }
};