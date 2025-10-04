import { GoogleGenAI } from '@google/genai';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type ResourceType = 'Wood' | 'Food' | 'Gold';
export type UnitType = 'Villager' | 'Swordsman' | 'Archer' | 'Knight';
export type BuildingType = 'TownHall' | 'House' | 'Barracks' | 'Granary' | 'StoragePit';
export type Owner = 'PLAYER' | 'ENEMY' | 'NEUTRAL';
export type Age = 'Stone Age' | 'Tool Age' | 'Bronze Age' | 'Iron Age';
export type FormationType = 'loose' | 'line' | 'box' | 'wedge';

// FIX: Added LiveAgentStatus type definition for use in the interactive agent hook.
export type LiveAgentStatus = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error';

export interface Resources {
    Wood: number;
    Food: number;
    Gold: number;
}

export type UnitAction = 'idle' | 'moving' | 'gathering' | 'returning' | 'attacking' | 'building' | 'repairing';

export interface BaseObject {
    id: string;
    owner: Owner;
    type: string;
    x: number;
    y: number;
}

export interface Unit extends BaseObject {
    type: UnitType;
    hp: number;
    maxHp: number;
    speed: number;
    attack: number;
    attackRange: number;
    action: UnitAction;
    target: { x: number, y: number } | string | null;
    gatherTarget?: string | null;
    variant?: 'male' | 'female';
    carrying?: ResourceType;
    carryingAmount?: number;
    attackCooldown?: number;
    stuckCounter?: number;
    stance: 'aggressive' | 'stand_ground';
}

export interface Building extends BaseObject {
    type: BuildingType;
    hp: number;
    maxHp: number;
    buildProgress: number; // 0-100
    isTraining?: UnitType;
    trainingProgress?: number;
    isResearching?: boolean;
    researchProgress?: number;
}

export interface ResourceNode extends BaseObject {
    type: ResourceType;
    amount: number;
    visualType?: 'Deer' | 'Lion' | 'Zebra' | 'Elephant' | 'Giraffe';
}

export interface Terrain extends BaseObject {
    type: 'Mountain' | 'Sand' | 'Cactus';
    radius: number;
}

export interface FightEffect {
    id: string;
    x: number;
    y: number;
    ttl: number; // time to live in ticks
}

export interface ImpactMessage {
    text: string;
    type: 'victory' | 'defeat' | 'info';
}

export interface ScreenMessage {
    id: string;
    text: string;
    ttl: number;
}

export type GameStatus = 'pre-game' | 'running' | 'player-won' | 'enemy-won';

export interface PlayerState {
    resources: Resources;
    currentAge: Age;
    activeFormation: FormationType;
    name: string;
}

export interface GameState {
    units: Unit[];
    buildings: Building[];
    resourceNodes: ResourceNode[];
    terrain: Terrain[];
    players: Record<Owner, PlayerState>;
    selectedObjectIds: string[];
    camera: { x: number, y: number };
    gameStatus: GameStatus;
    fightEffects: FightEffect[];
    impactMessage: ImpactMessage | null;
    screenMessages: ScreenMessage[];
}

export type GameAction =
    | { type: 'START_GAME' }
    | { type: 'TICK', payload: GameState }
    | { type: 'SELECT_OBJECTS', payload: { objectIds: string[] } }
    | { type: 'SET_UNIT_ACTION', payload: { unitIds: string[], action: UnitAction, target: { x: number, y: number } | string | null } }
    | { type: 'CREATE_BUILDING', payload: { owner: Owner, buildingType: BuildingType, x: number, y: number, builderId: string } }
    | { type: 'TRAIN_UNIT', payload: { buildingId: string, unitType: UnitType } }
    | { type: 'UPDATE_CAMERA', payload: { x: number, y: number } }
    | { type: 'SET_IMPACT_MESSAGE', payload: ImpactMessage | null }
    | { type: 'ADVANCE_AGE', payload: { owner: Owner } }
    | { type: 'SET_FORMATION', payload: { owner: Owner, formation: FormationType } }
    | { type: 'SELECT_IDLE_VILLAGER' }
    | { type: 'SET_UNIT_STANCE', payload: { unitIds: string[], stance: 'aggressive' | 'stand_ground' } };

export interface MapData {
    meta: {
        name: string;
        width: number;
        height: number;
    };
    terrain: Omit<Terrain, 'id' | 'owner'>[];
    units: Omit<Unit, 'id' | 'hp' | 'maxHp' | 'speed' | 'attack' | 'attackRange' | 'action' | 'target' | 'stance'>[];
    buildings: Omit<Building, 'id' | 'hp' | 'maxHp' | 'buildProgress'>[];
    resources: Omit<ResourceNode, 'id' | 'owner'>[];
}