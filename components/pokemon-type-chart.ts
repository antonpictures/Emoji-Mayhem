import { PokemonType } from '../types';

// The classic type chart defining weaknesses, resistances, and immunities.
// Key: Attacking Type, Value: Defending Types it is effective against.
export const TYPE_CHART: Record<PokemonType, { super_effective: PokemonType[], not_very_effective: PokemonType[], no_effect: PokemonType[] }> = {
    [PokemonType.Normal]: {
        super_effective: [],
        not_very_effective: [PokemonType.Rock, PokemonType.Steel],
        no_effect: [PokemonType.Ghost]
    },
    [PokemonType.Fire]: {
        super_effective: [PokemonType.Grass, PokemonType.Ice, PokemonType.Bug, PokemonType.Steel],
        not_very_effective: [PokemonType.Fire, PokemonType.Water, PokemonType.Rock, PokemonType.Dragon],
        no_effect: []
    },
    [PokemonType.Water]: {
        super_effective: [PokemonType.Fire, PokemonType.Ground, PokemonType.Rock],
        not_very_effective: [PokemonType.Water, PokemonType.Grass, PokemonType.Dragon],
        no_effect: []
    },
    [PokemonType.Grass]: {
        super_effective: [PokemonType.Water, PokemonType.Ground, PokemonType.Rock],
        not_very_effective: [PokemonType.Fire, PokemonType.Grass, PokemonType.Poison, PokemonType.Flying, PokemonType.Bug, PokemonType.Dragon, PokemonType.Steel],
        no_effect: []
    },
    [PokemonType.Electric]: {
        super_effective: [PokemonType.Water, PokemonType.Flying],
        not_very_effective: [PokemonType.Grass, PokemonType.Electric, PokemonType.Dragon],
        no_effect: [PokemonType.Ground]
    },
    [PokemonType.Ice]: {
        super_effective: [PokemonType.Grass, PokemonType.Ground, PokemonType.Flying, PokemonType.Dragon],
        not_very_effective: [PokemonType.Fire, PokemonType.Water, PokemonType.Ice, PokemonType.Steel],
        no_effect: []
    },
    [PokemonType.Fighting]: {
        super_effective: [PokemonType.Normal, PokemonType.Ice, PokemonType.Rock, PokemonType.Dark, PokemonType.Steel],
        not_very_effective: [PokemonType.Poison, PokemonType.Flying, PokemonType.Psychic, PokemonType.Bug, PokemonType.Fairy],
        no_effect: [PokemonType.Ghost]
    },
    [PokemonType.Poison]: {
        super_effective: [PokemonType.Grass, PokemonType.Fairy],
        not_very_effective: [PokemonType.Poison, PokemonType.Ground, PokemonType.Rock, PokemonType.Ghost],
        no_effect: [PokemonType.Steel]
    },
    [PokemonType.Ground]: {
        super_effective: [PokemonType.Fire, PokemonType.Electric, PokemonType.Poison, PokemonType.Rock, PokemonType.Steel],
        not_very_effective: [PokemonType.Grass, PokemonType.Bug],
        no_effect: [PokemonType.Flying]
    },
    [PokemonType.Flying]: {
        super_effective: [PokemonType.Grass, PokemonType.Fighting, PokemonType.Bug],
        not_very_effective: [PokemonType.Electric, PokemonType.Rock, PokemonType.Steel],
        no_effect: []
    },
    [PokemonType.Psychic]: {
        super_effective: [PokemonType.Fighting, PokemonType.Poison],
        not_very_effective: [PokemonType.Psychic, PokemonType.Steel],
        no_effect: [PokemonType.Dark]
    },
    [PokemonType.Bug]: {
        super_effective: [PokemonType.Grass, PokemonType.Psychic, PokemonType.Dark],
        not_very_effective: [PokemonType.Fire, PokemonType.Fighting, PokemonType.Poison, PokemonType.Flying, PokemonType.Ghost, PokemonType.Steel, PokemonType.Fairy],
        no_effect: []
    },
    [PokemonType.Rock]: {
        super_effective: [PokemonType.Fire, PokemonType.Ice, PokemonType.Flying, PokemonType.Bug],
        not_very_effective: [PokemonType.Fighting, PokemonType.Ground, PokemonType.Steel],
        no_effect: []
    },
    [PokemonType.Ghost]: {
        super_effective: [PokemonType.Psychic, PokemonType.Ghost],
        not_very_effective: [PokemonType.Dark],
        no_effect: [PokemonType.Normal]
    },
    [PokemonType.Dragon]: {
        super_effective: [PokemonType.Dragon],
        not_very_effective: [PokemonType.Steel],
        no_effect: [PokemonType.Fairy]
    },
    [PokemonType.Dark]: {
        super_effective: [PokemonType.Psychic, PokemonType.Ghost],
        not_very_effective: [PokemonType.Fighting, PokemonType.Dark, PokemonType.Fairy],
        no_effect: []
    },
    [PokemonType.Steel]: {
        super_effective: [PokemonType.Ice, PokemonType.Rock, PokemonType.Fairy],
        not_very_effective: [PokemonType.Fire, PokemonType.Water, PokemonType.Electric, PokemonType.Steel],
        no_effect: []
    },
    [PokemonType.Fairy]: {
        super_effective: [PokemonType.Fighting, PokemonType.Dragon, PokemonType.Dark],
        not_very_effective: [PokemonType.Fire, PokemonType.Poison, PokemonType.Steel],
        no_effect: []
    },
};
