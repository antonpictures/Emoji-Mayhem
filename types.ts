import { GoogleGenAI } from '@google/genai';

// Fix: Created the full type definitions for the application.
export interface Vec2 {
  x: number;
  y: number;
}

export enum PokemonType {
  Normal = 'Normal', Fire = 'Fire', Water = 'Water', Grass = 'Grass',
  Electric = 'Electric', Ice = 'Ice', Fighting = 'Fighting', Poison = 'Poison',
  Ground = 'Ground', Flying = 'Flying', Psychic = 'Psychic', Bug = 'Bug',
  Rock = 'Rock', Ghost = 'Ghost', Dragon = 'Dragon', Dark = 'Dark',
  Steel = 'Steel', Fairy = 'Fairy'
}

// Fix: Changed EnemyType from an enum to a type alias to resolve assignment issues with string literals in level files.
export type EnemyType = 'grunt' | 'brute' | 'flyer' | 'bomber' | 'ghost' | 'hopper' | 'tank' | 'sparky';

export interface Movement {
    type: 'horizontal-loop' | 'vertical-loop' | 'circular';
    speed: number;
    startX: number;
    endX: number;
    // ... other properties for different movement types
}

export interface Entity {
  id: string;
  position: Vec2;
  scale?: Vec2;
}

export interface Enemy extends Entity {
  type: EnemyType;
  velocity: Vec2;
  health: number;
  radius: number;
  mpsReward: number;
  color: string;
  emoji: string;
  pokemonTypes: PokemonType[];
  isSolid?: boolean;
  jumpCooldown?: number;
  zigzagDirection?: number;
  teleportCooldown?: number;
  stunTimer?: number;
  poisonTimer?: number;
}

export interface Platform extends Entity {
  width: number;
  height: number;
  health?: number;
  movement?: Movement;
}

export interface BreakableBlock extends Entity {
  width: number;
  height: number;
  health: number;
}

export interface EmojiStructure extends Entity {
  emoji: string;
  fontSize: number;
  health?: number;
}

export interface Wormhole extends Entity {
    type: 'black' | 'white';
    radius: number;
    pairId: string;
    gravityRadius?: number;
    gravityForce?: number;
}

export interface BlackHole extends Entity {
    radius: number;
    gravityRadius: number;
    gravityForce: number;
}


export interface Projectile extends Entity {
  velocity: Vec2;
  radius: number;
  bounces: number;
  projectileType: PokemonType;
  teleportCooldown?: number;
  isSubProjectile?: boolean;
  penetrationsLeft?: number;
  // Fix: Added optional health property to allow projectiles to be marked for deletion.
  health?: number;
}

export interface Particle extends Entity {
  velocity: Vec2;
  radius: number;
  color: string;
  lifespan: number;
}

export interface FloatingText extends Entity {
    text: string;
    color: string;
    lifespan: number;
    velocity: Vec2;
}

export interface PoisonCloud extends Entity {
    radius: number;
    lifespan: number;
    damage: number;
}

export interface Level {
  id: number;
  name: string;
  projectiles: number;
  projectileAmmo?: Partial<Record<PokemonType, number>>;
  creator?: string;
  plays?: number;
  likes?: number;
  isCustom?: boolean;
  isCommunity?: boolean;
  enemies: Partial<Enemy>[];
  platforms?: Partial<Platform>[];
  breakableBlocks?: Partial<BreakableBlock>[];
  emojiStructures?: Partial<EmojiStructure>[];
  wormholes?: Partial<Wormhole>[];
  blackHoles?: Partial<BlackHole>[];
  theme?: {
    sky: [string, string, string];
  };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Chapter {
    id: number;
    name: string;
    emoji: string;
    levelIds: number[];
    position: { top: string, left: string };
    color: string;
}

export type HoverableEntity = Enemy | Platform | BreakableBlock | EmojiStructure | Wormhole | BlackHole;