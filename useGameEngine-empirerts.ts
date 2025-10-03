/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Empire MPS

import React from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
// FIX: Corrected import paths for types and constants.
import { GameState, Unit, Building, ResourceNode, UnitAction, Owner } from './types-empirerts';
import { UNIT_STATS, BUILDING_STATS, CARRY_CAPACITY, UNIT_RADIUS, BUILDING_RADIUS, RESOURCE_RADIUS, AGE_STATS, AGES } from './constants-empirerts';

interface UseGameEngineProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
}

export const useGameEngine = ({ gameState, dispatch }: UseGameEngineProps) => {

    const findClosestObject = (unit: Unit, objects: (Unit | Building | ResourceNode)[]) => {
        if (objects.length === 0) return null;
        return objects.sort((a, b) => 
            Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y)
        )[0];
    };

    const tick = React.useCallback(() => {
        if (gameState.gameStatus !== 'running') return;
        
        const nextState = produce(gameState, draft => {
            // --- Update Screen/Fight Effects ---
            draft.fightEffects = draft.fightEffects.filter(e => { e.ttl--; return e.ttl > 0; });
            draft.screenMessages = draft.screenMessages.filter(m => { m.ttl--; return m.ttl > 0; });

            const allObjects = [...draft.units, ...draft.buildings, ...draft.resourceNodes];

            // --- Process Units ---
            draft.units.forEach(unit => {
                const stats = UNIT_STATS[unit.type];
                let targetObject: Unit | Building | ResourceNode | null = null;
                if (typeof unit.target === 'string') {
                    targetObject = allObjects.find(obj => obj.id === unit.target) as Unit | Building | ResourceNode || null;
                    if (!targetObject) { // Target is gone
                        unit.action = 'idle';
                        unit.target = null;
                    }
                }
                
                // Attack Cooldown
                if(unit.attackCooldown && unit.attackCooldown > 0) unit.attackCooldown--;

                // --- Unit Action Logic ---
                switch (unit.action) {
                    case 'moving': {
                        if (typeof unit.target === 'object' && unit.target) {
                            const { x: targetX, y: targetY } = unit.target;
                            const dx = targetX - unit.x;
                            const dy = targetY - unit.y;
                            const distance = Math.hypot(dx, dy);

                            if (distance > stats.speed) {
                                unit.x += (dx / distance) * stats.speed;
                                unit.y += (dy / distance) * stats.speed;
                            } else {
                                unit.action = 'idle';
                                unit.target = null;
                            }
                        }
                        break;
                    }
                    case 'gathering': {
                        if (targetObject && 'amount' in targetObject && targetObject.amount > 0) {
                            const distance = Math.hypot(targetObject.x - unit.x, targetObject.y - unit.y);
                            if (distance > (RESOURCE_RADIUS + UNIT_RADIUS)) {
                                // Move closer
                                unit.x += ((targetObject.x - unit.x) / distance) * stats.speed;
                                unit.y += ((targetObject.y - unit.y) / distance) * stats.speed;
                            } else {
                                // Gather
                                const resourceType = targetObject.type;
                                unit.carrying = resourceType;
                                unit.carryingAmount = (unit.carryingAmount || 0) + (stats.gatherRate || 0);
                                (targetObject as ResourceNode).amount -= (stats.gatherRate || 0);
                                
                                if (unit.carryingAmount >= CARRY_CAPACITY || targetObject.amount <= 0) {
                                    unit.action = 'returning';
                                    unit.target = null; // will find closest drop-off
                                }
                            }
                        } else {
                            unit.action = 'idle'; unit.target = null;
                        }
                        break;
                    }
                    case 'returning': {
                        const dropOffs = draft.buildings.filter(b => 
                            b.owner === unit.owner && 
                            b.buildProgress === 100 &&
                            BUILDING_STATS[b.type]?.resourceDropOff?.includes(unit.carrying!)
                        );
                        const closestDropOff = findClosestObject(unit, dropOffs);
                        if (closestDropOff) {
                            const distance = Math.hypot(closestDropOff.x - unit.x, closestDropOff.y - unit.y);
                             if (distance > (BUILDING_RADIUS + UNIT_RADIUS)) {
                                // Move closer
                                unit.x += ((closestDropOff.x - unit.x) / distance) * stats.speed;
                                unit.y += ((closestDropOff.y - unit.y) / distance) * stats.speed;
                            } else {
                                // Drop off
                                draft.players[unit.owner].resources[unit.carrying!] += unit.carryingAmount || 0;
                                unit.carrying = undefined;
                                unit.carryingAmount = 0;
                                
                                // Go back to gathering if the original node still exists and has resources
                                const originalNode = allObjects.find(o => o.id === unit.gatherTarget) as ResourceNode;
                                if (originalNode && originalNode.amount > 0) {
                                    unit.action = 'gathering';
                                    unit.target = unit.gatherTarget;
                                } else {
                                    unit.action = 'idle';
                                    unit.target = null;
                                    unit.gatherTarget = null;
                                }
                            }
                        } else { // No drop-off point, go idle
                           unit.action = 'idle';
                        }
                        break;
                    }
                    case 'attacking': {
                        if (targetObject) {
                             const distance = Math.hypot(targetObject.x - unit.x, targetObject.y - unit.y);
                             if (distance > stats.attackRange) {
                                // Move closer
                                unit.x += ((targetObject.x - unit.x) / distance) * stats.speed;
                                unit.y += ((targetObject.y - unit.y) / distance) * stats.speed;
                             } else {
                                // Attack
                                if (!unit.attackCooldown || unit.attackCooldown <= 0) {
                                    (targetObject as Unit | Building).hp -= stats.attack;
                                    unit.attackCooldown = 60; // 1 second cooldown
                                    draft.fightEffects.push({ id: uuidv4(), x: targetObject.x, y: targetObject.y, ttl: 20 });
                                }
                             }
                        } else if (stats.aggroRadius) { // Find new target if old one is gone
                            const nearbyEnemies = draft.units.filter(u => u.owner !== unit.owner && u.owner !== 'NEUTRAL' && Math.hypot(u.x-unit.x, u.y-unit.y) < stats.aggroRadius!);
                            if(nearbyEnemies.length > 0){
                                unit.target = nearbyEnemies[0].id;
                            } else {
                                unit.action = 'idle';
                            }
                        }
                        break;
                    }
                    case 'building':
                    case 'repairing': {
                         if (targetObject && 'buildProgress' in targetObject) {
                            const building = targetObject as Building;
                            const distance = Math.hypot(building.x - unit.x, building.y - unit.y);
                             if (distance > (BUILDING_RADIUS + UNIT_RADIUS + 10)) {
                                unit.x += ((building.x - unit.x) / distance) * stats.speed;
                                unit.y += ((building.y - unit.y) / distance) * stats.speed;
                            } else {
                                if (unit.action === 'building' && building.buildProgress < 100) {
                                    building.buildProgress = Math.min(100, building.buildProgress + (stats.buildRate || 0));
                                    building.hp += (building.maxHp / (100 / (stats.buildRate || 1)));
                                    if(building.buildProgress >= 100) unit.action = 'idle';
                                } else if (unit.action === 'repairing' && building.hp < building.maxHp) {
                                     building.hp = Math.min(building.maxHp, building.hp + (stats.repairRate || 0));
                                     if(building.hp >= building.maxHp) unit.action = 'idle';
                                } else {
                                    unit.action = 'idle';
                                }
                            }
                         } else {
                            unit.action = 'idle';
                         }
                        break;
                    }
                }
            });

            // --- Process Buildings ---
            draft.buildings.forEach(building => {
                if (building.isTraining) {
                    const unitStats = UNIT_STATS[building.isTraining];
                    building.trainingProgress = (building.trainingProgress || 0) + (100 / unitStats.trainTime);
                    if (building.trainingProgress >= 100) {
                        const newUnit: Unit = {
                            id: uuidv4(),
                            owner: building.owner,
                            type: building.isTraining,
                            hp: unitStats.hp,
                            maxHp: unitStats.hp,
                            speed: unitStats.speed,
                            attack: unitStats.attack,
                            attackRange: unitStats.attackRange,
                            x: building.x + BUILDING_RADIUS + UNIT_RADIUS,
                            y: building.y,
                            action: 'idle',
                            target: null,
                        };
                        draft.units.push(newUnit);
                        building.isTraining = undefined;
                        building.trainingProgress = 0;
                    }
                }
                if (building.isResearching) {
                    const playerState = draft.players[building.owner];
                    const currentAgeIndex = AGES.indexOf(playerState.currentAge);
                    const nextAge = AGES[currentAgeIndex + 1];
                    const ageInfo = AGE_STATS[nextAge];
                    building.researchProgress = (building.researchProgress || 0) + (100 / ageInfo.researchTime);
                    if(building.researchProgress >= 100) {
                        playerState.currentAge = nextAge;
                        building.isResearching = false;
                        building.researchProgress = 0;
                         draft.screenMessages.push({ id: uuidv4(), text: `${building.owner} has advanced to the ${nextAge}!`, ttl: 240 });
                    }
                }
            });

            // --- Remove destroyed objects ---
            draft.units = draft.units.filter(u => u.hp > 0);
            draft.buildings = draft.buildings.filter(b => b.hp > 0);
            draft.resourceNodes = draft.resourceNodes.filter(r => r.amount > 0);
            
            // --- Check for Game Over ---
            const playerTownHall = draft.buildings.find(b => b.owner === 'PLAYER' && b.type === 'TownHall');
            const enemyTownHall = draft.buildings.find(b => b.owner === 'ENEMY' && b.type === 'TownHall');

            if (!playerTownHall) draft.gameStatus = 'enemy-won';
            if (!enemyTownHall) draft.gameStatus = 'player-won';
        });

        dispatch({ type: 'TICK', payload: nextState });

    }, [gameState, dispatch]);
    
    return { tick };
};