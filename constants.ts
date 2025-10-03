// Fix: Create constants file to centralize game configuration values.
// Fix: Corrected import path for Vec2 type.
import { Vec2, Platform, BreakableBlock, Enemy, Projectile, Particle, EmojiStructure, FloatingText, Wormhole, BlackHole, PoisonCloud } from './types';

export const WORLD_WIDTH = 1280;
export const WORLD_HEIGHT = 720;
export const GROUND_Y = 650;

export const PLAYER_RADIUS = 25;
export const PLAYER_MAX_HEALTH = 100;

export const PROJECTILE_RADIUS = 15;
export const PROJECTILE_MAX_BOUNCES = 5;
export const PROJECTILE_BOUNCE_DAMPENING = 0.7;
export const SLINGSHOT_POWER_MULTIPLIER = 0.2;
export const MAX_SLINGSHOT_DRAG = 150;

export const GRAVITY: Vec2 = { x: 0, y: 0.3 };

export const ENEMY_COLLISION_DAMAGE = 0.5; // Damage per tick of contact
export const ENEMY_KNOCKBACK_FACTOR = 0.5; // Impulse strength

export type Entities = {
    platforms: Platform[];
    breakableBlocks: BreakableBlock[];
    enemies: Enemy[];
    projectiles: Projectile[];
    particles: Particle[];
    emojiStructures: EmojiStructure[];
    floatingTexts: FloatingText[];
    wormholes: Wormhole[];
    blackHoles: BlackHole[];
    poisonClouds: PoisonCloud[];
};