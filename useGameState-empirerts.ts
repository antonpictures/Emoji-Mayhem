/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Empire MPS

import React from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
// FIX: Corrected import paths for types and constants.
import { GameState, GameAction, Unit, Building, ResourceNode, Terrain, Owner, FormationType } from './types-empirerts';
import { INITIAL_RESOURCES, UNIT_STATS, BUILDING_STATS, AGES, AGE_STATS, FORMATION_SPACING, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WORLD_WIDTH, WORLD_HEIGHT } from './constants-empirerts';
import { sampleMap } from './maps/sample-map';

// --- Formation Logic Helper ---
function calculateFormationPositions(
    units: Unit[],
    destination: { x: number; y: number },
    formation: FormationType
): Map<string, { x: number; y: number }> {
    const positionMap = new Map<string, { x: number; y: number }>();
    const n = units.length;
    if (n === 0) return positionMap;

    // Calculate centroid of units to determine movement direction
    const centroid = units.reduce(
        (acc, unit) => ({ x: acc.x + unit.x, y: acc.y + unit.y }),
        { x: 0, y: 0 }
    );
    centroid.x /= n;
    centroid.y /= n;

    // Angle from centroid to destination
    const angle = Math.atan2(destination.y - centroid.y, destination.x - centroid.x);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    const getRotatedPosition = (relX: number, relY: number) => {
        return {
            x: destination.x + relX * cosAngle - relY * sinAngle,
            y: destination.y + relX * sinAngle + relY * cosAngle,
        };
    };

    switch (formation) {
        case 'line': {
            const width = (n - 1) * FORMATION_SPACING;
            units.forEach((unit, i) => {
                const relY = (i * FORMATION_SPACING) - (width / 2);
                const pos = getRotatedPosition(0, relY);
                positionMap.set(unit.id, pos);
            });
            break;
        }
        case 'box': {
            const cols = Math.ceil(Math.sqrt(n));
            const rows = Math.ceil(n / cols);
            const width = (cols - 1) * FORMATION_SPACING;
            const depth = (rows - 1) * FORMATION_SPACING;

            units.forEach((unit, i) => {
                const row = Math.floor(i / cols);
                const col = i % cols;
                const relX = -(row * FORMATION_SPACING) + (depth / 2);
                const relY = (col * FORMATION_SPACING) - (width / 2);
                const pos = getRotatedPosition(relX, relY);
                positionMap.set(unit.id, pos);
            });
            break;
        }
        case 'wedge': {
            positionMap.set(units[0].id, destination); // Leader at the point
            let leftCount = 1;
            let rightCount = 1;
            for (let i = 1; i < n; i++) {
                if (i % 2 !== 0) { // Place on the left flank
                    const relX = -leftCount * FORMATION_SPACING * 0.8;
                    const relY = -leftCount * FORMATION_SPACING;
                    positionMap.set(units[i].id, getRotatedPosition(relX, relY));
                    leftCount++;
                } else { // Place on the right flank
                    const relX = -rightCount * FORMATION_SPACING * 0.8;
                    const relY = rightCount * FORMATION_SPACING;
                    positionMap.set(units[i].id, getRotatedPosition(relX, relY));
                    rightCount++;
                }
            }
            break;
        }
        case 'loose':
        default:
            units.forEach(unit => {
                positionMap.set(unit.id, destination);
            });
            break;
    }

    return positionMap;
}


export const getInitialState = (): GameState => {
    const mapData = sampleMap;

    const units: Unit[] = mapData.units.map(u => {
        const stats = UNIT_STATS[u.type];
        return {
            ...u,
            id: uuidv4(),
            hp: stats.hp,
            maxHp: stats.hp,
            speed: stats.speed,
            attack: stats.attack,
            attackRange: stats.attackRange,
            action: 'idle',
            target: null,
        }
    });

    const buildings: Building[] = mapData.buildings.map(b => {
        const stats = BUILDING_STATS[b.type];
        return {
            ...b,
            id: uuidv4(),
            hp: stats.hp,
            maxHp: stats.hp,
            buildProgress: 100,
        }
    });

    const resourceNodes: ResourceNode[] = mapData.resources.map(r => ({
        ...r,
        id: uuidv4(),
        owner: 'NEUTRAL',
    }));
    
    const terrain: Terrain[] = mapData.terrain.map(t => ({
        ...t,
        id: uuidv4(),
        owner: 'NEUTRAL',
    }));


    return {
        units,
        buildings,
        resourceNodes,
        terrain,
        players: {
            PLAYER: { resources: { ...INITIAL_RESOURCES }, currentAge: 'Stone Age', activeFormation: 'loose' },
            ENEMY: { resources: { ...INITIAL_RESOURCES }, currentAge: 'Stone Age', activeFormation: 'loose' },
            NEUTRAL: { resources: { Wood: 0, Food: 0, Gold: 0 }, currentAge: 'Stone Age', activeFormation: 'loose' }
        },
        selectedObjectIds: [],
        camera: { x: 0, y: 0 },
        gameStatus: 'running',
        fightEffects: [],
        impactMessage: null,
        screenMessages: [],
    };
};

const gameReducer = produce((draft: GameState, action: GameAction) => {
    switch (action.type) {
        case 'START_GAME': {
            const freshState = getInitialState();
            freshState.gameStatus = 'running';
            return freshState;
        }
        case 'TICK':
            // The game engine calculates the next state and sends it as a payload
            return action.payload;
        case 'SELECT_OBJECTS':
            draft.selectedObjectIds = action.payload.objectIds;
            break;
        case 'SET_UNIT_ACTION': {
            const { unitIds, action: newAction, target } = action.payload;
            const movingUnits = draft.units.filter(u => unitIds.includes(u.id));

            // Formation Logic
            if (newAction === 'moving' && movingUnits.length > 1 && typeof target === 'object' && target !== null && 'x' in target && 'y' in target) {
                const owner = movingUnits[0].owner as Owner;
                const formation = draft.players[owner].activeFormation;
                
                if (formation !== 'loose') {
                    const positionMap = calculateFormationPositions(movingUnits, target, formation);
                    movingUnits.forEach(unit => {
                        const newTargetPos = positionMap.get(unit.id);
                        if (newTargetPos) {
                            unit.action = 'moving';
                            unit.target = newTargetPos;
                            unit.gatherTarget = null;
                            if (unit.carrying) {
                                unit.carrying = undefined;
                                unit.carryingAmount = 0;
                            }
                        }
                    });
                    return; // Exit after handling formation movement
                }
            }

            // Default Logic
            draft.units.forEach(unit => {
                if (unitIds.includes(unit.id)) {
                    unit.action = newAction;
                    unit.target = target;

                    // When issuing a new gather command, set the persistent gather target.
                    if (newAction === 'gathering' && typeof target === 'string') {
                        unit.gatherTarget = target;
                    } else if (newAction !== 'returning') {
                        // Clear it for other commands, but not when auto-returning.
                        unit.gatherTarget = null;
                    }

                    // Villagers drop resources if given a new task
                    if (unit.carrying) {
                        unit.carrying = undefined;
                        unit.carryingAmount = 0;
                    }
                }
            });
            break;
        }
        case 'CREATE_BUILDING': {
            const { owner, buildingType, x, y, builderId } = action.payload;
            const stats = BUILDING_STATS[buildingType];
            const playerState = draft.players[owner];
            
            const currentAgeIndex = AGES.indexOf(playerState.currentAge);
            const requiredAgeIndex = AGES.indexOf(stats.requiredAge);

            if (currentAgeIndex < requiredAgeIndex) {
                 draft.screenMessages.push({ id: uuidv4(), text: `Must be in the ${stats.requiredAge} to build a ${buildingType}`, ttl: 120 });
                 return;
            }
            
            const canAfford = Object.entries(stats.cost).every(([resource, cost]) => playerState.resources[resource as keyof typeof playerState.resources] >= (cost || 0));

            if (canAfford) {
                Object.entries(stats.cost).forEach(([resource, cost]) => {
                    playerState.resources[resource as keyof typeof playerState.resources] -= (cost || 0);
                });

                const newBuilding: Building = {
                    id: uuidv4(), type: buildingType, owner, x, y, hp: 1, maxHp: stats.hp, buildProgress: 0,
                };
                draft.buildings.push(newBuilding);

                const builder = draft.units.find(u => u.id === builderId);
                if(builder) {
                    builder.action = 'building';
                    builder.target = newBuilding.id;
                }
            } else {
                 draft.screenMessages.push({ id: uuidv4(), text: `Not enough resources to build ${buildingType}`, ttl: 120 });
            }
            break;
        }
        case 'TRAIN_UNIT': {
            const { buildingId, unitType } = action.payload;
            const building = draft.buildings.find(b => b.id === buildingId);
            if (building && building.buildProgress === 100 && !building.isTraining) {
                const stats = UNIT_STATS[unitType];
                const owner = building.owner as Owner;
                const playerState = draft.players[owner];
                
                const currentAgeIndex = AGES.indexOf(playerState.currentAge);
                const requiredAgeIndex = AGES.indexOf(stats.requiredAge);

                if (currentAgeIndex < requiredAgeIndex) {
                    draft.screenMessages.push({ id: uuidv4(), text: `Must be in the ${stats.requiredAge} to train a ${unitType}`, ttl: 120 });
                    return;
                }

                const canAfford = Object.entries(stats.cost).every(([resource, cost]) => playerState.resources[resource as keyof typeof playerState.resources] >= (cost || 0));
                
                const currentPopulation = draft.units.filter(u => u.owner === owner).length;
                const maxPopulation = draft.buildings
                    .filter(b => b.owner === owner && b.buildProgress === 100)
                    .reduce((acc, b) => acc + (BUILDING_STATS[b.type]?.populationBonus || 0), 0);

                if (canAfford && currentPopulation < maxPopulation) {
                    Object.entries(stats.cost).forEach(([resource, cost]) => {
                        playerState.resources[resource as keyof typeof playerState.resources] -= (cost || 0);
                    });
                    building.isTraining = unitType;
                    building.trainingProgress = 0;
                } else if (!canAfford) {
                     draft.screenMessages.push({ id: uuidv4(), text: `Not enough resources to train ${unitType}`, ttl: 120 });
                } else { // Population capped
                     draft.screenMessages.push({ id: uuidv4(), text: `Population limit reached!`, ttl: 120 });
                }
            }
            break;
        }
        case 'ADVANCE_AGE': {
            const { owner } = action.payload;
            const playerState = draft.players[owner];
            const currentAgeIndex = AGES.indexOf(playerState.currentAge);
            if (currentAgeIndex >= AGES.length - 1) return;

            const nextAge = AGES[currentAgeIndex + 1];
            const ageInfo = AGE_STATS[nextAge];
            const cost = ageInfo.cost;
            const canAfford = Object.entries(cost).every(([resource, amount]) => playerState.resources[resource as keyof typeof cost] >= (amount || 0));
            
            const playerBuildings = new Set(draft.buildings.filter(b => b.owner === owner && b.buildProgress === 100).map(b => b.type));
            const hasPrerequisites = ageInfo.prerequisites.every(p => playerBuildings.has(p));

            const townHall = draft.buildings.find(b => b.owner === owner && b.type === 'TownHall');
            
            if (townHall && !townHall.isResearching && canAfford && hasPrerequisites) {
                 Object.entries(cost).forEach(([resource, amount]) => {
                    playerState.resources[resource as keyof typeof cost] -= (amount || 0);
                });
                townHall.isResearching = true;
                townHall.researchProgress = 0;
            } else if (!canAfford) {
                draft.screenMessages.push({ id: uuidv4(), text: `Not enough resources to advance`, ttl: 120 });
            } else if (!hasPrerequisites) {
                const missing = ageInfo.prerequisites.filter(p => !playerBuildings.has(p));
                draft.screenMessages.push({ id: uuidv4(), text: `Requires: ${missing.join(', ')}`, ttl: 150 });
            }
            break;
        }
        case 'SET_FORMATION': {
            const { owner, formation } = action.payload;
            if (draft.players[owner]) {
                draft.players[owner].activeFormation = formation;
            }
            break;
        }
        case 'SELECT_IDLE_VILLAGER': {
            const idleVillagers = draft.units.filter(u => u.owner === 'PLAYER' && u.type === 'Villager' && u.action === 'idle');
            if (idleVillagers.length === 0) {
                draft.screenMessages.push({ id: uuidv4(), text: `No idle villagers available.`, ttl: 120 });
                return;
            }

            let nextVillager: Unit;
            const currentSelectionId = draft.selectedObjectIds.length === 1 ? draft.selectedObjectIds[0] : null;
            
            if (currentSelectionId) {
                const currentIndex = idleVillagers.findIndex(v => v.id === currentSelectionId);
                if (currentIndex !== -1) {
                    const nextIndex = (currentIndex + 1) % idleVillagers.length;
                    nextVillager = idleVillagers[nextIndex];
                } else {
                    nextVillager = idleVillagers[0];
                }
            } else {
                nextVillager = idleVillagers[0];
            }
            
            draft.selectedObjectIds = [nextVillager.id];
            
            const targetX = nextVillager.x - VIEWPORT_WIDTH / 2;
            const targetY = nextVillager.y - VIEWPORT_HEIGHT / 2;
            
            draft.camera.x = Math.max(0, Math.min(targetX, WORLD_WIDTH - VIEWPORT_WIDTH));
            draft.camera.y = Math.max(0, Math.min(targetY, WORLD_HEIGHT - VIEWPORT_HEIGHT));

            break;
        }
        case 'UPDATE_CAMERA':
            draft.camera = action.payload;
            break;
        case 'SET_IMPACT_MESSAGE':
            draft.impactMessage = action.payload;
            break;
    }
}, getInitialState());

export const useGameState = () => {
    const [gameState, dispatch] = React.useReducer(gameReducer, undefined, getInitialState);
    return { gameState, dispatch };
};