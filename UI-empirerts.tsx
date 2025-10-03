/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Empire MPS

import React from 'react';
import GameCanvas from './GameCanvas-empirerts';
import Controls from './Controls-empirerts';
import Minimap from './Minimap-empirerts';
import Scoreboard from './Scoreboard-empirerts';
// FIX: Corrected import path for types.
import { GameState, BuildingType } from './types-empirerts';
import StartButton from './StartButton-empirerts';
import MessageDisplay from './MessageDisplay-empirerts';

interface UIProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
    placementMode: BuildingType | null;
    setPlacementMode: (type: BuildingType | null) => void;
    setView: (view: 'game' | 'designer') => void;
}

const UI: React.FC<UIProps> = ({ gameState, dispatch, placementMode, setPlacementMode, setView }) => {
    
    if (gameState.gameStatus === 'player-won' || gameState.gameStatus === 'enemy-won') {
        return (
            <div className="winner-overlay">
                <h1>{gameState.gameStatus === 'player-won' ? 'Victory!' : 'Defeat!'}</h1>
                <button className="start-button" onClick={() => dispatch({type: 'START_GAME'})}>Play Again</button>
            </div>
        );
    }

    return (
        <div className="game-container">
            <MessageDisplay messages={gameState.screenMessages} />
            <div className="top-bar">
                <Scoreboard gameState={gameState} dispatch={dispatch} />
            </div>
            <div className="main-view">
                 <GameCanvas 
                    gameState={gameState} 
                    dispatch={dispatch} 
                    placementMode={placementMode}
                    setPlacementMode={setPlacementMode}
                />
            </div>
            <div className="bottom-panel">
                <Controls gameState={gameState} dispatch={dispatch} setPlacementMode={setPlacementMode} />
                <div className="right-panel">
                    <div className="minimap-container">
                        <Minimap gameState={gameState} dispatch={dispatch} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UI;