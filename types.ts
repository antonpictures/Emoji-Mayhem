// Fix: Added type definitions used across the application.
export interface Vec2 {
  x: number;
  y: number;
}

export type EnemyType = 'grunt' | 'brute' | 'flyer';

export interface Enemy {
  id: string;
  position: Vec2;
  velocity: Vec2;
  health: number;
  radius: number;
  type: EnemyType;
  points: number;
  color: string;
}

export interface Projectile {
  id: string;
  position: Vec2;
  velocity: Vec2;
  radius: number;
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
  }>;
}
