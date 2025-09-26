// Fix: Create types file to define data structures used throughout the application.
export type GameState = 'level-select' | 'playing' | 'level-complete' | 'game-over';

export type Character = 'zen' | 'spark';

export interface Vec2 {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  type: 'enemy' | 'projectile';
  position: Vec2;
  velocity: Vec2;
  radius: number;
}

export interface Enemy extends Entity {
  type: 'enemy';
  emoji: string;
  score: number;
}

export interface Projectile extends Entity {
  type: 'projectile';
}

export interface Particle {
  id: string;
  position: Vec2;
  velocity: Vec2;
  life: number;
  maxLife: number;
  emoji: string;
  size: number;
}

export interface EnemyConfig {
    radius: number;
    score: number;
    emoji: string;
}

export interface Level {
  id: number;
  name: string;
  enemies: EnemyConfig[];
  backgroundColor: string;
}