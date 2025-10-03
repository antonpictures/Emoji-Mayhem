/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Corrected import paths for types and constants.
import { GameState, Unit, Building, UnitType, BuildingType, Age, FormationType, ResourceNode } from './types-empirerts';
import { BUILDING_STATS, UNIT_STATS, AGES, AGE_STATS } from './constants-empirerts';

interface ControlsProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
    setPlacementMode: (type: BuildingType | null) => void;
}

// Helper to get emoji for buttons, where we only have the type string.
const getEmojiForType = (type: string) => {
    const emojiMap: Record<string, string> = {
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
    return emojiMap[type] || '❔';
}

const Controls: React.FC<ControlsProps> = ({ gameState, dispatch, setPlacementMode }) => {
    const selectedObjects = [
        ...gameState.units.filter(u => gameState.selectedObjectIds.includes(u.id)),
        ...gameState.buildings.filter(b => gameState.selectedObjectIds.includes(b.id)),
        ...gameState.resourceNodes.filter(r => gameState.selectedObjectIds.includes(r.id)),
    ];

    if (selectedObjects.length === 0) {
        return <div className="left-and-middle-panel"><div className="selection-panel"></div><div className="action-grid"></div></div>;
    }

    const firstSelected = selectedObjects[0];
    const portraitEmoji = getEmojiForType((firstSelected as ResourceNode).visualType || firstSelected.type);
    
    const playerState = gameState.players[firstSelected.owner as 'PLAYER' | 'ENEMY'];
    const selectedPlayerUnits = selectedObjects.filter(o => o.owner === 'PLAYER' && 'speed' in o) as Unit[];

    const handleTrainUnit = (unitType: UnitType) => {
        dispatch({ type: 'TRAIN_UNIT', payload: { buildingId: firstSelected.id, unitType } });
    };
    
    const handleBuild = (buildingType: BuildingType) => {
        setPlacementMode(buildingType);
    };

    const handleAdvanceAge = () => {
        dispatch({ type: 'ADVANCE_AGE', payload: { owner: 'PLAYER' } });
    }

    const handleSetFormation = (formation: FormationType) => {
        dispatch({ type: 'SET_FORMATION', payload: { owner: 'PLAYER', formation } });
    };
    
    const renderActionButtons = () => {
        const actions: React.ReactElement[] = [];
        const currentAgeIndex = AGES.indexOf(playerState.currentAge);
        
        // --- Building Actions ---
        if (firstSelected.type === 'Villager') {
            (Object.keys(BUILDING_STATS) as BuildingType[]).forEach(type => {
                const stats = BUILDING_STATS[type];
                const requiredAgeIndex = AGES.indexOf(stats.requiredAge);
                
                if (currentAgeIndex >= requiredAgeIndex) {
                    const cost = stats.cost;
                    const tooltip = `${type}\nCost: ${Object.entries(cost).map(([r,v])=>`${v} ${r[0]}`).join(' ')}`;
                    const canAfford = Object.entries(cost).every(([res, val]) => playerState.resources[res as keyof typeof cost] >= (val || 0));
                     actions.push(
                        <div key={`build-${type}`} title={tooltip} className="action-button-wrapper">
                            <button className="action-button" onClick={() => handleBuild(type)} disabled={!canAfford}>
                                {getEmojiForType(type)}
                            </button>
                        </div>
                    );
                }
            });
        }
        
        // --- Training Actions ---
        if ('buildProgress' in firstSelected && firstSelected.buildProgress === 100) {
            const buildingStats = BUILDING_STATS[firstSelected.type as BuildingType];
            buildingStats.trains?.forEach(unitType => {
                const requiredAgeIndex = AGES.indexOf(UNIT_STATS[unitType].requiredAge);
                 if (currentAgeIndex >= requiredAgeIndex) {
                    const cost = UNIT_STATS[unitType].cost;
                    
                    const canAfford = Object.entries(cost).every(([res, val]) => playerState.resources[res as keyof typeof cost] >= (val || 0));
                    
                    const currentPop = gameState.units.filter(u => u.owner === 'PLAYER').length;
                    const maxPop = gameState.buildings
                        .filter(b => b.owner === 'PLAYER' && b.buildProgress === 100)
                        .reduce((acc, b) => acc + (BUILDING_STATS[b.type as keyof typeof BUILDING_STATS]?.populationBonus || 0), 0);
                    
                    const isPopCapped = currentPop >= maxPop;
                    const isDisabled = !canAfford || isPopCapped || !!(firstSelected as Building).isTraining;

                    let tooltip = `Train ${unitType}\nCost: ${Object.entries(cost).map(([r,v])=>`${v} ${r[0]}`).join(' ')}`;
                    if (!canAfford) tooltip += `\n(Not enough resources)`;
                    if (isPopCapped) tooltip += `\n(Population limit reached)`;


                    actions.push(
                        <div key={`train-${unitType}`} title={tooltip} className="action-button-wrapper">
                            <button className="action-button" onClick={() => handleTrainUnit(unitType)} disabled={isDisabled}>
                                {getEmojiForType(unitType)}
                            </button>
                        </div>
                    );
                }
            });
        }
        
        // --- Age Up Action ---
        if (firstSelected.type === 'TownHall') {
            if (currentAgeIndex < AGES.length - 1) {
                const nextAge = AGES[currentAgeIndex + 1];
                const ageInfo = AGE_STATS[nextAge];
                const cost = ageInfo.cost;
                
                const canAfford = Object.entries(cost).every(([res, val]) => playerState.resources[res as keyof typeof cost] >= (val || 0));
                
                const playerBuildings = new Set(gameState.buildings.filter(b => b.owner === 'PLAYER' && b.buildProgress === 100).map(b => b.type));
                const missingPrerequisites = ageInfo.prerequisites.filter(p => !playerBuildings.has(p));
                
                const isDisabled = !canAfford || (firstSelected as Building).isResearching || missingPrerequisites.length > 0;

                let tooltip = `Advance to ${nextAge}\nCost: ${Object.entries(cost).map(([r,v])=>`${v} ${r[0]}`).join(' ')}`;
                if (!canAfford) tooltip += `\n(Not enough resources)`;
                if (missingPrerequisites.length > 0) {
                    tooltip += `\n(Requires: ${missingPrerequisites.join(', ')})`;
                }

                actions.push(
                    <div key="age-up" title={tooltip} className="action-button-wrapper">
                        <button className="action-button" onClick={handleAdvanceAge} disabled={isDisabled}>
                            {'🔨'}
                        </button>
                    </div>
                );
            }
        }

        return actions;
    }
    
    const renderFormationButtons = () => {
        const hasCombatUnits = selectedPlayerUnits.some(u => u.type === 'Swordsman' || u.type === 'Archer');
        if (selectedPlayerUnits.length < 2 || !hasCombatUnits) {
            return null;
        }
        
        const formations: { type: FormationType; icon: string; name: string }[] = [
            { type: 'loose', icon: '∴', name: 'Loose' },
            { type: 'line', icon: '─', name: 'Line' },
            { type: 'box', icon: '□', name: 'Box' },
            { type: 'wedge', icon: 'V', name: 'Wedge' },
        ];
        
        return (
            <div className="formation-controls">
                {formations.map(f => (
                    <button
                        key={f.type}
                        title={f.name}
                        className={`action-button formation-button ${gameState.players.PLAYER.activeFormation === f.type ? 'active' : ''}`}
                        onClick={() => handleSetFormation(f.type)}
                    >
                        {f.icon}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="left-and-middle-panel">
            <div className="selection-and-ad-container">
                <div className="selection-panel">
                    <div className="selection-portrait">
                        {portraitEmoji}
                    </div>
                    <div className="selection-info">
                        <h3>{firstSelected.type}</h3>
                        {'amount' in firstSelected ? (
                            <div className="selection-stats">
                                <span>{firstSelected.type} Remaining: {Math.floor(firstSelected.amount)}</span>
                            </div>
                        ) : (
                            <>
                                <progress className="hp-bar" value={firstSelected.hp} max={firstSelected.maxHp}></progress>
                                <div className="selection-stats">
                                    <span>HP: {firstSelected.hp.toFixed(0)} / {firstSelected.maxHp}</span>
                                    { selectedObjects.length > 1 && <span> (+{selectedObjects.length - 1} more)</span> }
                                </div>
                            </>
                        )}
                        
                        { 'isTraining' in firstSelected && (firstSelected as Building).isTraining && 
                            <div className="training-progress">
                                <span>Training {(firstSelected as Building).isTraining}...</span>
                                <progress value={(firstSelected as Building).trainingProgress || 0} max="100"></progress>
                            </div>
                        }
                        { 'isResearching' in firstSelected && (firstSelected as Building).isResearching && 
                            <div className="training-progress">
                                <span>Advancing Age...</span>
                                <progress value={(firstSelected as Building).researchProgress || 0} max="100"></progress>
                            </div>
                        }
                    </div>
                </div>
                 <div className="selection-ad-banner">
                    Sponsored by <a href="https://pump.fun/coin/6PHhkb9GNDTp6tsfr9EsZvJjyssxn8yi4HpPnqNvpump" target="_blank" rel="noopener noreferrer">$MPS on Solana</a>
                </div>
            </div>
            <div className="action-panel-container">
                <div className="action-grid">
                    {renderActionButtons()}
                </div>
                {renderFormationButtons()}
            </div>
        </div>
    );
};

export default Controls;