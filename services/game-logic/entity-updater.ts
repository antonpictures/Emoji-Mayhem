import { Entities, GRAVITY, GROUND_Y, WORLD_HEIGHT, WORLD_WIDTH, PROJECTILE_BOUNCE_DAMPENING } from '../../constants';
import { PokemonType, Enemy, Projectile } from '../../types';

const applySpecialPhysics = (entity: Projectile | Enemy, allEntities: Entities) => {
    // Cooldown prevents infinite teleport loops
    if (entity.teleportCooldown && entity.teleportCooldown > 0) {
        entity.teleportCooldown--;
    } else {
        for (const wh of allEntities.wormholes) {
            const dist = Math.hypot(entity.position.x - wh.position.x, entity.position.y - wh.position.y);
            const radius = 'radius' in entity ? entity.radius : 0;
            if (dist < wh.radius + radius) {
                const pair = allEntities.wormholes.find(otherWh => otherWh.id === wh.pairId && otherWh.id !== wh.id);
                if (pair) {
                    entity.position.x = pair.position.x;
                    entity.position.y = pair.position.y;
                    entity.teleportCooldown = 15; // Cooldown for 15 frames
                    break;
                }
            }
        }
    }

    // Black hole logic
    for (const bh of allEntities.blackHoles) {
        const dx = bh.position.x - entity.position.x;
        const dy = bh.position.y - entity.position.y;
        const dist = Math.hypot(dx, dy);

        if (dist < bh.gravityRadius) {
            const force = (bh.gravityForce / (dist * dist + 1000)) * 50;
            entity.velocity.x += (dx / dist) * force;
            entity.velocity.y += (dy / dist) * force;
        }

        if (dist < bh.radius) {
            entity.health = 0; // Mark for deletion
        }
    }
};


export const updateAllEntities = (currentEntities: Entities): Entities => {
    const newEntities = { ...currentEntities };

    // Update Platforms
    newEntities.platforms.forEach(p => {
        if (p.movement) {
            if (p.movement.type === 'horizontal-loop') {
                p.position.x += p.movement.speed;
                if ((p.movement.speed > 0 && p.position.x > p.movement.endX) || (p.movement.speed < 0 && p.position.x < p.movement.startX)) {
                    p.movement.speed *= -1;
                }
            }
        }
    });
    
    // Update Enemies
    newEntities.enemies.forEach(e => {
        if (e.health <= 0) return;
        
        if(e.stunTimer && e.stunTimer > 0) {
            e.stunTimer--;
            return; // Skip movement if stunned
        }
        
        applySpecialPhysics(e, newEntities);
        e.velocity.x += GRAVITY.x;
        e.velocity.y += GRAVITY.y;
        e.position.x += e.velocity.x;
        e.position.y += e.velocity.y;

        if (e.position.y + e.radius > GROUND_Y) {
            e.position.y = GROUND_Y - e.radius;
            e.velocity.y = 0;
        }
    });

    // Update Projectiles
    newEntities.projectiles.forEach(p => {
        if (p.health === 0) return;
        applySpecialPhysics(p, newEntities);
        
        let gravityY = GRAVITY.y;
        if (p.projectileType === PokemonType.Rock) gravityY *= 1.5;
        if (p.projectileType === PokemonType.Flying) gravityY *= 0.5;

        p.velocity.x += GRAVITY.x;
        p.velocity.y += gravityY;

        // Psychic Homing
        if (p.projectileType === PokemonType.Psychic && newEntities.enemies.length > 0) {
            const nearestEnemy = newEntities.enemies.reduce((prev, curr) => {
                const prevDist = Math.hypot(p.position.x - prev.position.x, p.position.y - prev.position.y);
                const currDist = Math.hypot(p.position.x - curr.position.x, p.position.y - curr.position.y);
                return (currDist < prevDist) ? curr : prev;
            });
            const dx = nearestEnemy.position.x - p.position.x;
            const dy = nearestEnemy.position.y - p.position.y;
            const dist = Math.hypot(dx, dy);
            if(dist > 0) {
                p.velocity.x += (dx / dist) * 0.2;
                p.velocity.y += (dy / dist) * 0.2;
            }
        }

        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;

        // World bounds
        if (p.position.y + p.radius > GROUND_Y || p.position.y - p.radius < 0) {
            p.velocity.y *= -PROJECTILE_BOUNCE_DAMPENING;
            p.position.y = Math.min(p.position.y, GROUND_Y - p.radius);
            p.position.y = Math.max(p.position.y, p.radius);
            p.bounces++;
        }
        if (p.position.x + p.radius > WORLD_WIDTH || p.position.x - p.radius < 0) {
            p.velocity.x *= -PROJECTILE_BOUNCE_DAMPENING;
            p.position.x = Math.min(p.position.x, WORLD_WIDTH - p.radius);
            p.position.x = Math.max(p.position.x, p.radius);
            p.bounces++;
        }
    });
    
    // Update Poison Clouds
    newEntities.poisonClouds.forEach(cloud => {
        cloud.lifespan--;
        newEntities.enemies.forEach(enemy => {
            if (Math.hypot(cloud.position.x - enemy.position.x, cloud.position.y - enemy.position.y) < cloud.radius + enemy.radius) {
                if(!enemy.poisonTimer || enemy.poisonTimer <= 0) {
                    enemy.poisonTimer = 180; // Apply poison for 3 seconds
                }
            }
        });
    });
    newEntities.enemies.forEach(e => {
        if(e.poisonTimer && e.poisonTimer > 0) {
            e.poisonTimer--;
            if(e.poisonTimer % 30 === 0) e.health -= 5; // Damage every half second
        }
    });
    newEntities.poisonClouds = newEntities.poisonClouds.filter(c => c.lifespan > 0);

    // Update Particles and Floating Texts
    newEntities.particles = newEntities.particles.filter(p => {
        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;
        p.lifespan--;
        return p.lifespan > 0;
    });
    newEntities.floatingTexts = newEntities.floatingTexts.filter(t => {
        t.position.y += t.velocity.y;
        t.lifespan--;
        return t.lifespan > 0;
    });

    return newEntities;
};