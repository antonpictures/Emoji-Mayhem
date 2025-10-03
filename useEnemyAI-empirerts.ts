/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Empire MPS

import React from 'react';
// FIX: Corrected import paths for types and constants.
import { GameState, BuildingType, UnitType, ResourceType, Building, ResourceNode, Terrain, Unit } from './types-empirerts';
import { BUILDING_STATS, UNIT_STATS, AGES, AGE_STATS, BUILDING_RADIUS, RESOURCE_RADIUS, TERRAIN_RADIUS } from './constants-empirerts';

interface UseEnemyAIProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
    isEnabled: boolean;
}

type AIPhase = 'EXPANDING' | 'BUILDING_ARMY' | 'ATTACKING';

const isPositionValid = (pos: { x: number; y: number }, allObstacles: (Building | ResourceNode | Terrain)[]) => {
    const newBuildingRadius = BUILDING_RADIUS + 30;
    for (const obj of allObstacles) {
        let otherRadius = 0;
        if (obj.type === 'Mountain' || obj.type === 'Cactus') {
            otherRadius = (obj as Terrain).radius;
        } else if ('buildProgress' in obj) {
            otherRadius = BUILDING_RADIUS;
        } else if ('amount' in obj) {
            otherRadius = RESOURCE_RADIUS;
        }
        
        if (Math.hypot(obj.x - pos.x, obj.y - pos.y) < newBuildingRadius + otherRadius) {
            return false;
        }
    }
    return true;
};

const findBuildPosition = (gameState: GameState): { x: number; y: number } | null => {
    const enemyBuildings = gameState.buildings.filter(b => b.owner === 'ENEMY');
    const townHall = enemyBuildings.find(b => b.type === 'TownHall');
    if (!townHall) return null;

    const allObstacles = [
        ...gameState.buildings,
        ...gameState.resourceNodes,
        ...gameState.terrain,
    ];

    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 120 + Math.random() * 250;
        const candidatePos = {
            x: townHall.x + Math.cos(angle) * distance,
            y: townHall.y + Math.sin(angle) * distance,
        };

        if (isPositionValid(candidatePos, allObstacles)) {
            return candidatePos;
        }
    }
    return null;
};

export const useEnemyAI = ({ gameState, dispatch, isEnabled }: UseEnemyAIProps) => {
    const lastActionTime = React.useRef(Date.now());
    const aiPhase = React.useRef<AIPhase>('EXPANDING');

    const tick = React.useCallback(() => {
        if (!isEnabled || gameState.gameStatus !== 'running') return;

        const now = Date.now();
        if (now - lastActionTime.current < 2500) return; // Cooldown of 2.5 seconds
        lastActionTime.current = now;

        const enemyState = gameState.players.ENEMY;
        const enemyUnits = gameState.units.filter(u => u.owner === 'ENEMY');
        const enemyBuildings = gameState.buildings.filter(b => b.owner === 'ENEMY');
        const enemyVillagers = enemyUnits.filter(u => u.type === 'Villager');
        const enemyArmy = enemyUnits.filter(u => u.type !== 'Villager');
        const currentPop = enemyUnits.length;
        const maxPop = enemyBuildings.filter(b => b.buildProgress === 100).reduce((acc, b) => acc + (BUILDING_STATS[b.type as BuildingType]?.populationBonus || 0), 0);
        
        // --- Phase Transition Logic ---
        if (aiPhase.current === 'EXPANDING' && enemyVillagers.length >= 12 && enemyBuildings.some(b => b.type === 'Barracks')) {
            aiPhase.current = 'BUILDING_ARMY';
        }
        if (aiPhase.current === 'BUILDING_ARMY' && enemyArmy.length >= 15) {
            aiPhase.current = 'ATTACKING';
        }
        if (aiPhase.current === 'ATTACKING' && enemyArmy.length < 5) {
            aiPhase.current = 'BUILDING_ARMY'; // Retreat and rebuild
        }

        // --- Action Logic based on Phase ---
        switch (aiPhase.current) {
            case 'EXPANDING':
                // Priority: Villagers -> Houses -> Barracks -> Economy -> Gather
                if (currentPop < maxPop && enemyVillagers.length < 12) {
                    if (trainUnit('Villager')) return;
                }
                if (maxPop > 0 && maxPop - currentPop <= 2) {
                    if (buildBuilding('House')) return;
                }
                if (!enemyBuildings.some(b => b.type === 'Barracks') && AGES.indexOf(enemyState.currentAge) >= AGES.indexOf('Tool Age')) {
                    if (buildBuilding('Barracks')) return;
                }
                if (AGES.indexOf(enemyState.currentAge) < AGES.indexOf('Tool Age')) {
                    if(advanceAge()) return;
                }
                sendIdleVillagersToWork();
                break;
            
            case 'BUILDING_ARMY':
                // Priority: Army -> Houses -> Age Up -> Gather
                const unitToTrain = enemyState.resources.Food > enemyState.resources.Gold ? 'Swordsman' : 'Archer';
                if (currentPop < maxPop) {
                    if(trainUnit(unitToTrain) || trainUnit(unitToTrain === 'Swordsman' ? 'Archer' : 'Swordsman')) return;
                }
                if (maxPop > 0 && maxPop - currentPop <= 4) {
                    if(buildBuilding('House')) return;
                }
                if (AGES.indexOf(enemyState.currentAge) < AGES.indexOf('Bronze Age')) {
                    if(advanceAge()) return;
                }
                sendIdleVillagersToWork();
                break;

            case 'ATTACKING':
                 // Priority: Attack -> Reinforce -> Houses -> Gather
                attackPlayer();
                const reinforcementUnit = Math.random() > 0.5 ? 'Swordsman' : 'Archer';
                if(currentPop < maxPop) {
                     if(trainUnit(reinforcementUnit)) return;
                }
                if (maxPop > 0 && maxPop - currentPop <= 2) {
                     if(buildBuilding('House')) return;
                }
                sendIdleVillagersToWork();
                break;
        }

        // --- Helper functions for actions ---
        function trainUnit(unitType: UnitType): boolean {
            const stats = UNIT_STATS[unitType];
            const canAfford = Object.entries(stats.cost).every(([res, val]) => enemyState.resources[res as keyof typeof stats.cost] >= (val || 0));
            const trainingBuilding = enemyBuildings.find(b => BUILDING_STATS[b.type as BuildingType].trains?.includes(unitType) && !b.isTraining);
            
            if (canAfford && trainingBuilding && AGES.indexOf(enemyState.currentAge) >= AGES.indexOf(stats.requiredAge)) {
                dispatch({ type: 'TRAIN_UNIT', payload: { buildingId: trainingBuilding.id, unitType } });
                return true;
            }
            return false;
        }

        function buildBuilding(buildingType: BuildingType): boolean {
            const stats = BUILDING_STATS[buildingType];
            const canAfford = Object.entries(stats.cost).every(([res, val]) => enemyState.resources[res as keyof typeof stats.cost] >= (val || 0));
            const idleVillager = enemyVillagers.find(u => u.action === 'idle');
            const buildPos = findBuildPosition(gameState);

            if (canAfford && idleVillager && buildPos && AGES.indexOf(enemyState.currentAge) >= AGES.indexOf(stats.requiredAge)) {
                dispatch({ type: 'CREATE_BUILDING', payload: { owner: 'ENEMY', buildingType, x: buildPos.x, y: buildPos.y, builderId: idleVillager.id } });
                return true;
            }
            return false;
        }

        function advanceAge(): boolean {
             const currentAgeIndex = AGES.indexOf(enemyState.currentAge);
             if(currentAgeIndex >= AGES.length - 1) return false;

             const nextAge = AGES[currentAgeIndex + 1];
             const ageInfo = AGE_STATS[nextAge];
             const cost = ageInfo.cost;
             const canAfford = Object.entries(cost).every(([res, val]) => enemyState.resources[res as keyof typeof cost] >= (val || 0));

             const enemyBuildingTypes = new Set(enemyBuildings.filter(b=>b.buildProgress === 100).map(b => b.type));
             const hasPrerequisites = ageInfo.prerequisites.every(p => enemyBuildingTypes.has(p));

             const townHall = enemyBuildings.find(b => b.type === 'TownHall' && !b.isResearching);

             if (townHall && canAfford && hasPrerequisites) {
                 dispatch({ type: 'ADVANCE_AGE', payload: { owner: 'ENEMY' } });
                 return true;
             }
             return false;
        }

        function sendIdleVillagersToWork() {
            const idleVillagers = enemyVillagers.filter(u => u.action === 'idle');
            if (idleVillagers.length === 0) return;

            const { Wood, Food, Gold } = enemyState.resources;
            let neededResource: ResourceType = 'Food'; // Default
            if (Wood < Food * 1.5 && Wood < Gold * 2) neededResource = 'Wood';
            else if (Gold < Wood && Gold < Food) neededResource = 'Gold';
            
            const resourceNodes = gameState.resourceNodes.filter(r => r.type === neededResource && r.amount > 0);
            if(resourceNodes.length === 0) return;
            
            idleVillagers.forEach(villager => {
                const closestNode = resourceNodes.sort((a, b) => Math.hypot(a.x - villager.x, a.y - villager.y) - Math.hypot(b.x - villager.x, b.y - villager.y))[0];
                if(closestNode) {
                    dispatch({ type: 'SET_UNIT_ACTION', payload: { unitIds: [villager.id], action: 'gathering', target: closestNode.id } });
                }
            });
        }
        
        function attackPlayer() {
            const playerStuff = [...gameState.units.filter(u=>u.owner === 'PLAYER'), ...gameState.buildings.filter(b=>b.owner === 'PLAYER')];
            if(playerStuff.length === 0) return;

            const idleAttackers = enemyArmy.filter(u => u.action === 'idle');
            if(idleAttackers.length === 0) return;

            // Prioritize targets: Villagers > Military > Production Buildings > TownHall > Other
            const getTargetPriority = (target: Unit | Building) => {
                if(target.type === 'Villager') return 1;
                if('speed' in target) return 2; // Military unit
                if(target.type === 'Barracks') return 3;
                if(target.type === 'TownHall') return 4;
                return 5;
            };
            
            playerStuff.sort((a,b) => getTargetPriority(a) - getTargetPriority(b));
            const bestTarget = playerStuff[0];

            if(bestTarget) {
                 dispatch({ type: 'SET_UNIT_ACTION', payload: { unitIds: idleAttackers.map(u=>u.id), action: 'attacking', target: bestTarget.id } });
            }
        }

    }, [gameState, dispatch, isEnabled]);
    
    return { tick };
};