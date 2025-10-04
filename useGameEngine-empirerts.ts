/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
// FIX: Imported BuildingType to resolve type error.
import { GameState, GameAction, Unit, Building, ResourceNode, UnitAction, Owner, ResourceType, BuildingType } from './types-empirerts';
import { UNIT_STATS, BUILDING_STATS, CARRY_CAPACITY, AGE_STATS, AGES } from './constants-empirerts';

interface UseGameEngineProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
}

export const useGameEngine = ({ gameState, dispatch }: UseGameEngineProps) => {
    // Add a tick counter to prevent instant-defeat bug on load
    const tickCounter = React.useRef(0);

    const tick = React.useCallback(() => {
        if (gameState.gameStatus !== 'running') return;
        tickCounter.current++;

        const nextState = produce(gameState, draft => {
            // --- Unit Updates ---
            draft.units.forEach(unit => {
                // Cooldowns
                if (unit.attackCooldown && unit.attackCooldown > 0) unit.attackCooldown--;

                // Movement
                if (unit.action === 'moving' && typeof unit.target === 'object' && unit.target) {
                    const target = unit.target as { x: number, y: number };
                    const dx = target.x - unit.x;
                    const dy = target.y - unit.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < 5) {
                        unit.action = 'idle';
                        unit.target = null;
                    } else {
                        unit.x += (dx / distance) * unit.speed;
                        unit.y += (dy / distance) * unit.speed;
                    }
                }

                // Gathering
                if (unit.action === 'gathering' && typeof unit.target === 'string') {
                    const resource = draft.resourceNodes.find(r => r.id === unit.target);
                    if (!resource || resource.amount <= 0) {
                        unit.action = 'idle'; unit.target = null;
                        return;
                    }
                    const distance = Math.hypot(resource.x - unit.x, resource.y - unit.y);
                    if (distance < 30) {
                        const gatherRate = UNIT_STATS[unit.type].gatherRate || 0;
                        const gathered = Math.min(resource.amount, gatherRate);
                        resource.amount -= gathered;
                        unit.carrying = resource.type;
                        unit.carryingAmount = (unit.carryingAmount || 0) + gathered;

                        if (unit.carryingAmount >= CARRY_CAPACITY) {
                            unit.action = 'returning';
                            const dropOff = findClosestDropOff(unit, draft.buildings);
                            unit.target = dropOff ? dropOff.id : null;
                        }
                    } else { // Move to resource
                        const dx = resource.x - unit.x;
                        const dy = resource.y - unit.y;
                        unit.x += (dx / distance) * unit.speed;
                        unit.y += (dy / distance) * unit.speed;
                    }
                }

                // Returning Resources
                if (unit.action === 'returning' && typeof unit.target === 'string') {
                     const dropOff = draft.buildings.find(b => b.id === unit.target);
                     if (!dropOff) { unit.action = 'idle'; unit.target = null; return; }

                     const distance = Math.hypot(dropOff.x - unit.x, dropOff.y - unit.y);
                     if (distance < 40) {
                        if (unit.carrying && unit.carryingAmount) {
                            draft.players[unit.owner].resources[unit.carrying] += Math.floor(unit.carryingAmount);
                        }
                        unit.carrying = undefined;
                        unit.carryingAmount = 0;
                        // Go back to gathering
                        unit.action = 'gathering';
                        unit.target = unit.gatherTarget || null;
                     } else { // Move to drop-off
                        const dx = dropOff.x - unit.x;
                        const dy = dropOff.y - unit.y;
                        unit.x += (dx / distance) * unit.speed;
                        unit.y += (dy / distance) * unit.speed;
                     }
                }
                
                // Building
                if (unit.action === 'building' && typeof unit.target === 'string') {
                    const building = draft.buildings.find(b => b.id === unit.target);
                    if (!building || building.buildProgress >= 100) { unit.action = 'idle'; unit.target = null; return; }

                    const distance = Math.hypot(building.x - unit.x, building.y - unit.y);
                    if (distance < 50) {
                        const buildRate = UNIT_STATS.Villager.buildRate || 0;
                        building.buildProgress = Math.min(100, building.buildProgress + buildRate / 20); // Slower build rate
                        building.hp = Math.max(1, Math.floor(building.maxHp * (building.buildProgress / 100)));
                        if (building.buildProgress >= 100) {
                            unit.action = 'idle';
                            unit.target = null;
                        }
                    } else {
                        // Move to site
                    }
                }

                // Attacking
                if (unit.action === 'attacking' && typeof unit.target === 'string') {
                     const targetUnit = draft.units.find(u => u.id === unit.target);
                     const targetBuilding = draft.buildings.find(b => b.id === unit.target);
                     const target = targetUnit || targetBuilding;

                     if (!target || target.hp <= 0) { unit.action = 'idle'; unit.target = null; return; }

                     const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
                     if (distance <= unit.attackRange) {
                        if (!unit.attackCooldown) {
                            target.hp -= unit.attack;
                            unit.attackCooldown = 60; // 1 second cooldown
                             draft.fightEffects.push({ id: uuidv4(), x: target.x, y: target.y, ttl: 20 });
                        }
                     } else {
                         // Move towards target
                         unit.x += ((target.x - unit.x) / distance) * unit.speed;
                         unit.y += ((target.y - unit.y) / distance) * unit.speed;
                     }
                } else if (unit.stance === 'aggressive' && unit.action === 'idle' && !['Villager'].includes(unit.type)) {
                     // Aggro check
                     const aggroRadius = UNIT_STATS[unit.type].aggroRadius || 150;
                     const enemyTargets = [...draft.units, ...draft.buildings].filter(e => e.owner !== unit.owner && e.owner !== 'NEUTRAL');
                     let closestTarget = null;
                     let closestDist = aggroRadius;

                     enemyTargets.forEach(target => {
                         const dist = Math.hypot(target.x - unit.x, target.y - unit.y);
                         if (dist < closestDist) {
                             closestDist = dist;
                             closestTarget = target;
                         }
                     });
                     if (closestTarget) {
                         unit.action = 'attacking';
                         unit.target = closestTarget.id;
                     }
                }

            });
            
            // --- Building Updates ---
            draft.buildings.forEach(building => {
                // Training
                if (building.isTraining) {
                    const unitType = building.isTraining;
                    const stats = UNIT_STATS[unitType];
                    building.trainingProgress = (building.trainingProgress || 0) + 1;
                    if (building.trainingProgress >= stats.trainTime) {
                        const newUnit: Unit = {
                            id: uuidv4(), type: unitType, owner: building.owner as Owner,
                            x: building.x + 50, y: building.y + 50, hp: stats.hp, maxHp: stats.hp,
                            speed: stats.speed, attack: stats.attack, attackRange: stats.attackRange,
                            action: 'idle', target: null, stance: 'aggressive',
                        };
                        draft.units.push(newUnit);
                        building.isTraining = undefined;
                        building.trainingProgress = 0;
                    }
                }
                // Researching
                if (building.isResearching) {
                    const playerState = draft.players[building.owner];
                    const nextAge = AGES[AGES.indexOf(playerState.currentAge) + 1];
                    const ageInfo = AGE_STATS[nextAge];
                    if (ageInfo) {
                        building.researchProgress = (building.researchProgress || 0) + 1;
                        if (building.researchProgress >= ageInfo.researchTime) {
                            playerState.currentAge = nextAge;
                            building.isResearching = false;
                            building.researchProgress = 0;
                        }
                    }
                }
            });

            // --- Remove destroyed units/buildings ---
            draft.units = draft.units.filter(u => u.hp > 0);
            draft.buildings = draft.buildings.filter(b => b.hp > 0);
            draft.resourceNodes = draft.resourceNodes.filter(r => r.amount > 0);
            draft.fightEffects = draft.fightEffects.filter(f => { f.ttl--; return f.ttl > 0; });
            draft.screenMessages = draft.screenMessages.filter(m => { m.ttl--; return m.ttl > 0; });
            
            // --- Win/Loss Condition (with delay) ---
            if (tickCounter.current > 10) {
                const playerTownHall = draft.buildings.find(b => b.owner === 'PLAYER' && b.type === 'TownHall');
                const enemyTownHall = draft.buildings.find(b => b.owner === 'ENEMY' && b.type === 'TownHall');

                if (!playerTownHall) draft.gameStatus = 'enemy-won';
                if (!enemyTownHall) draft.gameStatus = 'player-won';
            }
        });

        dispatch({ type: 'TICK', payload: nextState });

    }, [gameState, dispatch]);
    
    // Helper function
    const findClosestDropOff = (unit: Unit, buildings: Building[]): Building | null => {
        const dropOffs = buildings.filter(b => 
            b.owner === unit.owner && 
            b.buildProgress === 100 && 
            BUILDING_STATS[b.type as BuildingType].resourceDropOff?.includes(unit.carrying as ResourceType)
        );
        if (dropOffs.length === 0) return null;
        return dropOffs.reduce((closest, b) => {
            const distToClosest = Math.hypot(closest.x - unit.x, closest.y - unit.y);
            const distToB = Math.hypot(b.x - unit.x, b.y - unit.y);
            return distToB < distToClosest ? b : closest;
        });
    };

    return { tick };
};