import { Enemy, PokemonType, EnemyType } from '../types';

export const ENEMY_CONFIG: Record<EnemyType, Partial<Enemy>> = {
  grunt: {
    health: 50,
    radius: 20,
    mpsReward: 100,
    color: '#ff6347',
    emoji: '😠',
    pokemonTypes: [PokemonType.Normal],
  },
  brute: {
    health: 150,
    radius: 35,
    mpsReward: 500,
    color: '#8b0000',
    emoji: '😡',
    pokemonTypes: [PokemonType.Fighting],
  },
  flyer: {
    health: 40,
    radius: 18,
    mpsReward: 150,
    color: '#add8e6',
    emoji: '🕊️',
    pokemonTypes: [PokemonType.Flying],
  },
  bomber: {
    health: 30,
    radius: 22,
    mpsReward: 250,
    color: '#ffa500',
    emoji: '💣',
    pokemonTypes: [PokemonType.Fire],
  },
  ghost: {
    health: 60,
    radius: 20,
    mpsReward: 300,
    color: '#e6e6fa',
    emoji: '👻',
    pokemonTypes: [PokemonType.Ghost],
    isSolid: true, // Start as solid
  },
  hopper: {
    health: 50,
    radius: 20,
    mpsReward: 200,
    color: '#32cd32',
    emoji: '🐸',
    pokemonTypes: [PokemonType.Grass],
    jumpCooldown: 120, // Ticks before next jump
  },
  tank: {
    health: 300,
    radius: 40,
    mpsReward: 1000,
    color: '#a9a9a9',
    emoji: '🗿',
    pokemonTypes: [PokemonType.Rock, PokemonType.Steel],
  },
  sparky: {
    health: 40,
    radius: 18,
    mpsReward: 350,
    color: '#ffd700',
    emoji: '⚡',
    pokemonTypes: [PokemonType.Electric],
    zigzagDirection: 1,
  },
};