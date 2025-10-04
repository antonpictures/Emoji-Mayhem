import React from 'react';
import { GameState, GameAction, Unit, Building, BuildingType, UnitType, ResourceNode } from './types-empirerts';
import { BUILDING_STATS, UNIT_STATS, AGES, EMOJI_MAP } from './constants-empirerts';
import Minimap from './Minimap-empirerts';

interface ControlsProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
    onBackToTitle: () => void;
    placementMode: BuildingType | null;
    setPlacementMode: React.Dispatch<React.SetStateAction<BuildingType | null>>;
}

const Controls: React.FC<ControlsProps> = ({ gameState, dispatch, onBackToTitle, placementMode, setPlacementMode }) => {
    const allObjects = [...gameState.units, ...gameState.buildings, ...gameState.resourceNodes];
    const selectedObject = allObjects.find(obj => obj.id === gameState.selectedObjectIds[0]);

    const handleTrainUnit = (unitType: UnitType) => {
        if (selectedObject && 'buildProgress' in selectedObject) {
            dispatch({ type: 'TRAIN_UNIT', payload: { buildingId: selectedObject.id, unitType } });
        }
    };

    const handleBuild = (buildingType: BuildingType) => {
        setPlacementMode(current => current === buildingType ? null : buildingType);
    };
    
    const handleAdvanceAge = () => {
        dispatch({ type: 'ADVANCE_AGE', payload: { owner: 'PLAYER' } });
    };

    const renderSelectionPanel = () => {
        if (!selectedObject) {
            return <div className="selection-placeholder">Select a unit or building to see details.</div>;
        }

        return (
            <>
                <div className="selection-portrait">{EMOJI_MAP[selectedObject.type]}</div>
                <div className="selection-info">
                    <h3>{selectedObject.type} {selectedObject.owner !== 'PLAYER' && `(${selectedObject.owner})`}</h3>
                    {'hp' in selectedObject && 'maxHp' in selectedObject && (
                        <>
                            <progress className="hp-bar" value={selectedObject.hp} max={selectedObject.maxHp}></progress>
                            <p>HP: {Math.ceil(selectedObject.hp)} / {selectedObject.maxHp}</p>
                        </>
                    )}
                    {'speed' in selectedObject && 'attack' in selectedObject && (
                        <p>Attack: {selectedObject.attack} | Speed: {selectedObject.speed}</p>
                    )}
                    {'carrying' in selectedObject && (selectedObject as Unit).carrying && (
                        <p>Carrying: {Math.floor((selectedObject as Unit).carryingAmount || 0)} {(selectedObject as Unit).carrying}</p>
                    )}
                    {'amount' in selectedObject && <p>Remaining: {Math.floor((selectedObject as ResourceNode).amount)}</p>}
                    
                    {'isTraining' in selectedObject && (selectedObject as Building).isTraining && (
                        <div className="training-progress">
                            <p>Training: {(selectedObject as Building).isTraining}</p>
                            <progress value={(selectedObject as Building).trainingProgress} max={UNIT_STATS[(selectedObject as Building).isTraining as UnitType].trainTime}></progress>
                        </div>
                    )}
                </div>
            </>
        );
    };

    const renderActionButtons = () => {
        const actions: React.ReactElement[] = [];
        if (!selectedObject || selectedObject.owner !== 'PLAYER') {
            return Array(12).fill(null).map((_, i) => <div key={`placeholder-${i}`} className="action-button-placeholder" />);
        }

        const playerState = gameState.players.PLAYER;
        const currentAgeIndex = AGES.indexOf(playerState.currentAge);

        // --- Building Actions (for Villager) ---
        if (selectedObject.type === 'Villager') {
            (Object.keys(BUILDING_STATS) as BuildingType[]).forEach(type => {
                const stats = BUILDING_STATS[type];
                const cost = stats.cost;
                const canAfford = Object.entries(cost).every(([res, val]) => playerState.resources[res as keyof typeof cost] >= (val || 0));
                
                actions.push(
                    <button key={`build-${type}`} className={`action-button ${placementMode === type ? 'active' : ''}`} onClick={() => handleBuild(type)} disabled={!canAfford} title={`${type} - Cost: ${Object.entries(cost).map(([r,v])=>`${v} ${r[0]}`).join(' ')}`}>
                        {EMOJI_MAP[type]}
                    </button>
                );
            });
        }

        // --- Training Actions (for Buildings) ---
        if ('buildProgress' in selectedObject && selectedObject.buildProgress === 100) {
            const buildingStats = BUILDING_STATS[selectedObject.type as BuildingType];
            buildingStats.trains?.forEach(unitType => {
                const unitStats = UNIT_STATS[unitType];
                const cost = unitStats.cost;
                const canAfford = Object.entries(cost).every(([res, val]) => playerState.resources[res as keyof typeof cost] >= (val || 0));
                
                const currentPop = gameState.units.filter(u => u.owner === 'PLAYER').length;
                const maxPop = gameState.buildings.filter(b => b.owner === 'PLAYER' && b.buildProgress === 100).reduce((acc, b) => acc + (BUILDING_STATS[b.type as keyof typeof BUILDING_STATS]?.populationBonus || 0), 0);
                const isPopCapped = currentPop >= maxPop;
                
                actions.push(
                    <button key={`train-${unitType}`} className="action-button" onClick={() => handleTrainUnit(unitType)} disabled={!canAfford || isPopCapped || !!(selectedObject as Building).isTraining} title={`${unitType} - Cost: ${Object.entries(cost).map(([r,v])=>`${v} ${r[0]}`).join(' ')}`}>
                        {EMOJI_MAP[unitType]}
                    </button>
                );
            });
        }
        
        // --- Age Up (for TownHall) ---
        if (selectedObject.type === 'TownHall' && currentAgeIndex < AGES.length - 1) {
             actions.push(
                <button key="age-up" className="action-button" onClick={handleAdvanceAge} title="Advance to next Age">
                    {'🔼'}
                </button>
            );
        }

        // Fill remaining grid slots
        while (actions.length < 12) {
            actions.push(<div key={`placeholder-${actions.length}`} className="action-button-placeholder" />);
        }
        return actions;
    };

    const latestAlert = gameState.screenMessages.length > 0 ? gameState.screenMessages[gameState.screenMessages.length - 1].text : "All quiet...";

    return (
        <div className="controls-panel">
            <div className="selection-panel">
                {renderSelectionPanel()}
            </div>
            <div className="action-grid-container">
                {renderActionButtons()}
            </div>
            <div className="minimap-panel">
                <Minimap gameState={gameState} dispatch={dispatch} />
                <div className="alerts-panel" title={latestAlert}>
                    {latestAlert}
                </div>
                <button onClick={onBackToTitle} className="main-menu-button">MAIN MENU</button>
            </div>
        </div>
    );
};

export default Controls;
