import { PokemonType } from '../types';

export const PLAYER_PROJECTILE_TYPES = [
    PokemonType.Normal, PokemonType.Fire, PokemonType.Water, PokemonType.Grass, PokemonType.Electric, PokemonType.Ice,
    PokemonType.Fighting, PokemonType.Poison, PokemonType.Ground, PokemonType.Flying, PokemonType.Psychic, PokemonType.Bug,
    PokemonType.Rock, PokemonType.Ghost, PokemonType.Dragon, PokemonType.Dark, PokemonType.Steel, PokemonType.Fairy
];

export const TYPE_EMOJI_MAP: Record<PokemonType, string> = {
    [PokemonType.Normal]: '⚪', [PokemonType.Fire]: '🔥', [PokemonType.Water]: '💧',
    [PokemonType.Grass]: '🍃', [PokemonType.Electric]: '⚡', [PokemonType.Ice]: '❄️',
    [PokemonType.Fighting]: '🥊', [PokemonType.Poison]: '☠️', [PokemonType.Ground]: '⛰️',
    [PokemonType.Flying]: '🕊️', [PokemonType.Psychic]: '🔮', [PokemonType.Bug]: '🐛',
    [PokemonType.Rock]: '🪨', [PokemonType.Ghost]: '👻', [PokemonType.Dragon]: '🐉',
    [PokemonType.Dark]: '🌑', [PokemonType.Steel]: '🔩', [PokemonType.Fairy]: '✨'
};

export const TYPE_COLOR_MAP: Record<PokemonType, string> = {
    [PokemonType.Normal]: 'bg-gray-400', [PokemonType.Fire]: 'bg-red-500',
    [PokemonType.Water]: 'bg-blue-500', [PokemonType.Grass]: 'bg-green-500',
    [PokemonType.Electric]: 'bg-yellow-400', [PokemonType.Ice]: 'bg-cyan-300',
    [PokemonType.Fighting]: 'bg-orange-700', [PokemonType.Poison]: 'bg-purple-600',
    [PokemonType.Ground]: 'bg-amber-600', [PokemonType.Flying]: 'bg-sky-400',
    [PokemonType.Psychic]: 'bg-pink-500', [PokemonType.Bug]: 'bg-lime-500',
    [PokemonType.Rock]: 'bg-stone-500', [PokemonType.Ghost]: 'bg-indigo-700',
    [PokemonType.Dragon]: 'bg-violet-600', [PokemonType.Dark]: 'bg-gray-800',
    [PokemonType.Steel]: 'bg-slate-500', [PokemonType.Fairy]: 'bg-rose-400'
};

export const PROJECTILE_ABILITY_DATA: Record<string, { name: string; description: string }> = {
    [PokemonType.Normal]: { name: 'Normal Shot', description: 'A standard, reliable projectile. No special effects.' },
    [PokemonType.Fire]: { name: 'Fireball', description: 'Explodes on impact, dealing damage to nearby enemies.' },
    [PokemonType.Water]: { name: 'Water Blast', description: 'Creates a powerful splash that pushes enemies and objects away.' },
    [PokemonType.Grass]: { name: 'Seed Shot', description: 'Splits into three smaller, fast-moving seeds on impact.' },
    [PokemonType.Electric]: { name: 'Chain Lightning', description: 'Zaps up to two nearby enemies for extra damage.' },
    [PokemonType.Fighting]: { name: 'Power Punch', description: 'Delivers a massive knockback punch, sending foes flying.' },
    [PokemonType.Rock]: { name: 'Meteor', description: 'Extremely heavy and powerful. It drops faster and deals more impact damage.' },
    [PokemonType.Ice]: { name: 'Ice Shard', description: 'Shatters on impact, firing damaging ice fragments in all directions.' },
    [PokemonType.Poison]: { name: 'Toxic Blob', description: 'Leaves a lingering cloud of acid that damages enemies over time.' },
    [PokemonType.Ground]: { name: 'Earthquake', description: 'Creates a small shockwave on impact, shaking and disrupting nearby enemies.' },
    [PokemonType.Flying]: { name: 'Gale', description: 'A lightweight projectile that is less affected by gravity, allowing for long, flat shots.' },
    [PokemonType.Psychic]: { name: 'Psybeam', description: 'Gently homes in on the nearest enemy, altering its course mid-flight.' },
    [PokemonType.Bug]: { name: 'Bug Swarm', description: 'Unleashes a distracting (but harmless) swarm of bugs on impact.' },
    [PokemonType.Ghost]: { name: 'Phase Shot', description: 'Can pass through one destructible wall unharmed to hit protected targets.' },
    [PokemonType.Dragon]: { name: 'Dragon Rage', description: 'A highly powerful shot that deals significantly increased damage.' },
    [PokemonType.Dark]: { name: 'Dark Pulse', description: 'Temporarily stuns enemies in a small radius, stopping them from moving or attacking.' },
    [PokemonType.Steel]: { name: 'Iron Head', description: 'A very durable projectile that is excellent at destroying structures and blocks.' },
    [PokemonType.Fairy]: { name: 'Moonblast', description: 'Bursts into a dazzling (but harmless) shower of sparkles on impact.' },
};