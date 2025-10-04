import React, { useState, useEffect } from 'react';
import { GameState, GameAction, BuildingType } from './types-empirerts';
import GameCanvas from './GameCanvas-empirerts';
import Controls from './Controls-empirerts';
import Scoreboard from './Scoreboard-empirerts';
import MessageDisplay from './MessageDisplay-empirerts';

interface UIProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
    onBackToTitle: () => void;
}

const UI: React.FC<UIProps> = ({ gameState, dispatch, onBackToTitle }) => {
    const [placementMode, setPlacementMode] = useState<BuildingType | null>(null);
    
    // Auto-cancel placement mode if selection changes to a non-villager
    useEffect(() => {
        if (placementMode) {
             const selectedUnits = gameState.units.filter(u => gameState.selectedObjectIds.includes(u.id));
             const hasVillager = selectedUnits.some(u => u.type === 'Villager');
             if (!hasVillager || selectedUnits.length === 0) {
                 setPlacementMode(null);
             }
        }
    }, [gameState.selectedObjectIds, placementMode]);

    return (
        <div className="game-container">
            <Scoreboard gameState={gameState} dispatch={dispatch} />
            <div className="main-view">
                <GameCanvas 
                    gameState={gameState} 
                    dispatch={dispatch} 
                    placementMode={placementMode}
                    setPlacementMode={setPlacementMode}
                />
            </div>
            <Controls 
                gameState={gameState} 
                dispatch={dispatch} 
                onBackToTitle={onBackToTitle} 
                placementMode={placementMode}
                setPlacementMode={setPlacementMode}
            />
             <MessageDisplay messages={gameState.screenMessages} />
        </div>
    );
};

export default UI;