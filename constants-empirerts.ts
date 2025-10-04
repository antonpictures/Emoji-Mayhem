/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Corrected import path for types.
import { UnitType, BuildingType, Resources, Age, ResourceType } from './types-empirerts';

export const TICK_RATE = 1000 / 60; // 60 ticks per second

// --- World & Viewport ---
export const WORLD_WIDTH = 3000;
export const WORLD_HEIGHT = 3000;
export const VIEWPORT_WIDTH = 800;
export const VIEWPORT_HEIGHT = 500;

// --- Object Sizes ---
export const UNIT_RADIUS = 15;
export const BUILDING_RADIUS = 40;
export const RESOURCE_RADIUS = 25;
export const TERRAIN_RADIUS = 50; // Generic, can be overridden in map
export const FORMATION_SPACING = UNIT_RADIUS * 3;

// --- Initial Game State ---
export const INITIAL_RESOURCES: Resources = {
    Wood: 200,
    Food: 200,
    Gold: 100,
};

export const CARRY_CAPACITY = 10;

// --- Age Progression ---
export const AGES: Age[] = ['Stone Age', 'Tool Age', 'Bronze Age', 'Iron Age'];
export const AGE_STATS: Record<Age, { cost: Partial<Resources>; researchTime: number; prerequisites: BuildingType[] }> = {
    'Stone Age': { cost: {}, researchTime: 0, prerequisites: [] },
    'Tool Age': { cost: { Food: 500 }, researchTime: 1800, prerequisites: [] }, // 30 seconds
    'Bronze Age': { cost: { Food: 800, Gold: 200 }, researchTime: 3600, prerequisites: ['Barracks'] }, // 60 seconds
    'Iron Age': { cost: { Food: 1000, Gold: 800 }, researchTime: 5400, prerequisites: [] }, // 90 seconds
};

// --- Game Balance Stats ---
export const UNIT_STATS: Record<UnitType, {
    hp: number;
    speed: number;
    attack: number;
    attackRange: number;
    cost: Partial<Resources>;
    trainTime: number; // in ticks
    requiredAge: Age;
    gatherRate?: number; // resources per tick
    buildRate?: number; // build points per tick
    repairRate?: number; // hp per tick
    aggroRadius?: number;
}> = {
    Villager: { hp: 50, speed: 2, attack: 5, attackRange: 20, cost: { Food: 50 }, trainTime: 300, requiredAge: 'Stone Age', gatherRate: 0.5, buildRate: 1, repairRate: 2 },
    Swordsman: { hp: 100, speed: 1.5, attack: 10, attackRange: 25, cost: { Food: 60, Gold: 20 }, trainTime: 500, requiredAge: 'Tool Age', aggroRadius: 150 },
    Archer: { hp: 70, speed: 1.8, attack: 8, attackRange: 150, cost: { Wood: 40, Gold: 40 }, trainTime: 600, requiredAge: 'Tool Age', aggroRadius: 200 },
    Knight: { hp: 120, speed: 1.8, attack: 25, attackRange: 30, cost: { Food: 60, Gold: 100 }, trainTime: 900, requiredAge: 'Bronze Age', aggroRadius: 180 },
};

export const BUILDING_STATS: Record<BuildingType, {
    hp: number;
    cost: Partial<Resources>;
    populationBonus?: number;
    trains?: UnitType[];
    requiredAge: Age;
    resourceDropOff?: ResourceType[];
}> = {
    TownHall: { hp: 1500, cost: { Wood: 400 }, populationBonus: 5, trains: ['Villager'], requiredAge: 'Stone Age', resourceDropOff: ['Wood', 'Food', 'Gold'] },
    House: { hp: 500, cost: { Wood: 50 }, populationBonus: 4, requiredAge: 'Stone Age' },
    Barracks: { hp: 1000, cost: { Wood: 150 }, trains: ['Swordsman', 'Archer', 'Knight'], requiredAge: 'Tool Age' },
    Granary: { hp: 700, cost: { Wood: 100 }, requiredAge: 'Stone Age', resourceDropOff: ['Food'] },
    StoragePit: { hp: 700, cost: { Wood: 100 }, requiredAge: 'Stone Age', resourceDropOff: ['Wood', 'Gold'] },
};

// --- Emojis for Rendering ---
export const EMOJI_MAP: Record<string, any> = {
    Villager: '🧑‍🌾',
    Swordsman: '⚔️',
    Archer: '🏹',
    Knight: '🛡️',
    TownHall: '🏛️',
    House: '🏠',
    Barracks: '⛺',
    Granary: '🌾',
    StoragePit: '📦',
    Wood: '🌳',
    Food: '🍓',
    Gold: '⛏️',
    Deer: '🦌',
    Lion: '🦁',
    Zebra: '🦓',
    Elephant: '🐘',
    Giraffe: '🦒',
    Mountain: '🏔️',
    Sand: '🏜️',
    Cactus: '🌵',
};