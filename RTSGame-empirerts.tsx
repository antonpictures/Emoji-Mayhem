/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useGameState } from './useGameState-empirerts';
import { useGameLoop } from './useGameLoop-empirerts';
import { useGameEngine } from './useGameEngine-empirerts';
import { useEnemyAI } from './useEnemyAI-empirerts';
import UI from './UI-empirerts';
import { GameStatus } from './types-empirerts';

interface RTSGameProps {
    onBackToTitle: () => void;
}

const RTSGame: React.FC<RTSGameProps> = ({ onBackToTitle }) => {
    const { gameState, dispatch } = useGameState();
    const gameEngine = useGameEngine({ gameState, dispatch });
    const enemyAI = useEnemyAI({ gameState, dispatch, isEnabled: true });

    useGameLoop(() => {
        gameEngine.tick();
        enemyAI.tick();
    });

    const handleRestart = () => {
        dispatch({ type: 'START_GAME' });
    };

    const renderOverlay = (title: string, buttonText: string) => (
         <div className="winner-overlay">
            <h1>{title}</h1>
            <div>
                <button onClick={handleRestart} style={{ marginRight: '10px' }}>{buttonText}</button>
                <button onClick={onBackToTitle}>Main Menu</button>
            </div>
        </div>
    );

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {gameState.gameStatus === 'player-won' && renderOverlay('VICTORY!', 'Play Again')}
            {gameState.gameStatus === 'enemy-won' && renderOverlay('DEFEAT', 'Try Again')}
            <UI gameState={gameState} dispatch={dispatch} onBackToTitle={onBackToTitle} />
        </div>
    );
};

export default RTSGame;