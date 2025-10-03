/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Corrected import paths for types and constants.
import { GameState } from './types-empirerts';
import { BUILDING_STATS } from './constants-empirerts';

interface ScoreboardProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ gameState, dispatch }) => {
    const playerState = gameState.players.PLAYER;
    const enemyState = gameState.players.ENEMY;
    
    const playerPop = gameState.units.filter(u => u.owner === 'PLAYER').length;
    const playerMaxPop = gameState.buildings
        // FIX: Replaced 'and' with the correct logical operator '&&'.
        .filter(b => b.owner === 'PLAYER' && b.buildProgress === 100)
        .reduce((acc, b) => acc + (BUILDING_STATS[b.type as keyof typeof BUILDING_STATS]?.populationBonus || 0), 0);
        
    const enemyPop = gameState.units.filter(u => u.owner === 'ENEMY').length;
    const enemyMaxPop = gameState.buildings
        // FIX: Replaced 'and' with the correct logical operator '&&'.
        .filter(b => b.owner === 'ENEMY' && b.buildProgress === 100)
        .reduce((acc, b) => acc + (BUILDING_STATS[b.type as keyof typeof BUILDING_STATS]?.populationBonus || 0), 0);

    return (
        <div className="scoreboard-container">
            <div className="resources-display player-resources">
                <span>🏛️ {playerState.currentAge}</span>
                <span>🌲 {Math.floor(playerState.resources.Wood)}</span>
                <span>🍓 {Math.floor(playerState.resources.Food)}</span>
                <span>⛏️ {Math.floor(playerState.resources.Gold)}</span>
                <span 
                    style={{cursor: 'pointer'}} 
                    onClick={() => dispatch({ type: 'SELECT_IDLE_VILLAGER' })}
                    title="Find next idle villager"
                >
                    🧑‍🤝‍🧑 {playerPop}/{playerMaxPop}
                </span>
            </div>
             <div className="resources-display enemy-resources">
                <span>🧑‍🤝‍🧑 {enemyPop}/{enemyMaxPop}</span>
                <span>🌲 {Math.floor(enemyState.resources.Wood)}</span>
                <span>⛏️ {Math.floor(enemyState.resources.Gold)}</span>
                <span>🍓 {Math.floor(enemyState.resources.Food)}</span>
                <span>🏛️ {enemyState.currentAge}</span>
            </div>
        </div>
    );
};

export default Scoreboard;