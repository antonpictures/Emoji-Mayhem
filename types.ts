// Fix: Added type definitions used across the application.
export interface Vec2 {
  x: number;
  y: number;
}

export type EnemyType = 'grunt' | 'brute' | 'flyer' | 'bomber' | 'ghost' | 'hopper' | 'tank' | 'sparky';

export enum PokemonType {
  Normal = 'Normal', Fire = 'Fire', Water = 'Water', Grass = 'Grass',
  Electric = 'Electric', Ice = 'Ice', Fighting = 'Fighting', Poison = 'Poison',
  Ground = 'Ground', Flying = 'Flying', Psychic = 'Psychic', Bug = 'Bug',
  Rock = 'Rock', Ghost = 'Ghost', Dragon = 'Dragon', Dark = 'Dark',
  Steel = 'Steel', Fairy = 'Fairy'
}

export interface Platform {
  id: string;
  position: Vec2;
  width: number;
  height: number;
  health?: number;
  movement?: {
    type: 'horizontal-loop';
    speed: number;
    startX: number;
    endX: number;
  };
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
    health?: number;
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
  pokemonTypes: PokemonType[];
  basePosition?: Vec2; // For flyers' movement patterns
  // New state properties for special enemies
  isSolid?: boolean;
  jumpCooldown?: number;
  zigzagDirection?: number;
}

export interface Projectile {
  id:string;
  position: Vec2;
  velocity: Vec2;
  radius: number;
  bouncesLeft: number;
  projectileType: PokemonType;
}

export interface Particle {
    id: string;
    position: Vec2;
    velocity: Vec2;
    radius: number;
    color: string;
    lifespan: number;
}

export interface FloatingText {
    id: string;
    position: Vec2;
    text: string;
    color: string;
    lifespan: number;
}

export interface Level {
  id: number;
  name: string;
  projectiles: number;
  // Fix: Add optional id and radius to enemy definitions within a level.
  // This supports properties saved by the level editor and resolves type errors
  // when loading custom levels that have these properties on enemy objects.
  enemies: Array<{
    id?: string;
    type: EnemyType;
    position: Vec2;
    emoji?: string;
    radius?: number;
  }>;
  platforms?: Platform[];
  breakableBlocks?: BreakableBlock[];
  emojiStructures?: EmojiStructure[];
  theme?: {
      sky: [string, string, string]; // [startColor, midColor, endColor]
  }
  isCustom?: boolean;
}