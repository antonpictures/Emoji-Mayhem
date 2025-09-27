// Fix: Added type definitions used across the application.
export interface Vec2 {
  x: number;
  y: number;
}

export type EnemyType = 'grunt' | 'brute' | 'flyer' | 'bomber' | 'ghost' | 'hopper' | 'tank' | 'sparky';

export interface Platform {
  id: string;
  position: Vec2;
  width: number;
  height: number;
}

export interface BreakableBlock {
  id: string;
  position: Vec2;
  width: number;
  height: number;
  health: number;
}

export interface EmojiStructure {
    id: string;
    position: Vec2;
    emoji: string;
    fontSize: number;
}

export interface Enemy {
  id: string;
  position: Vec2;
  velocity: Vec2;
  health: number;
  radius: number;
  type: EnemyType;
  points: number;
  color: string;
  emoji: string;
  basePosition?: Vec2; // For flyers' movement patterns
  // New state properties for special enemies
  isSolid?: boolean;
  jumpCooldown?: number;
  zigzagDirection?: number;
}

export interface Projectile {
  id: string;
  position: Vec2;
  velocity: Vec2;
  radius: number;
  bouncesLeft: number;
}

export interface Particle {
    id: string;
    position: Vec2;
    velocity: Vec2;
    radius: number;
    color: string;
    lifespan: number;
}

export interface Level {
  id: number;
  name: string;
  projectiles: number;
  enemies: Array<{
    type: EnemyType;
    position: Vec2;
    emoji?: string;
  }>;
  platforms?: Platform[];
  breakableBlocks?: BreakableBlock[];
  emojiStructures?: EmojiStructure[];
  theme?: {
      sky: [string, string, string]; // [startColor, midColor, endColor]
  }
}