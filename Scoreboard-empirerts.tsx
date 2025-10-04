import React from 'react';
import { GameState, GameAction } from './types-empirerts';
import { BUILDING_STATS } from './constants-empirerts';

interface ScoreboardProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ gameState, dispatch }) => {
    const player = gameState.players.PLAYER;
    const currentPop = gameState.units.filter(u => u.owner === 'PLAYER').length;
    const maxPop = gameState.buildings
        .filter(b => b.owner === 'PLAYER' && b.buildProgress === 100)
        .reduce((acc, b) => acc + (BUILDING_STATS[b.type]?.populationBonus || 0), 0);

    return (
        <div className="scoreboard">
            <div className="resources-display">
                <span>🌳 {Math.floor(player.resources.Wood)}</span>
                <span>🍓 {Math.floor(player.resources.Food)}</span>
                <span>⛏️ {Math.floor(player.resources.Gold)}</span>
            </div>
            <div className="info-display">
                <button className="idle-villager-button" onClick={() => dispatch({ type: 'SELECT_IDLE_VILLAGER' })} title="Select next idle villager">
                    IDLE 🧑‍🌾
                </button>
                <span>Units: {currentPop} / {maxPop}</span>
                <span>Age: {player.currentAge}</span>
            </div>
        </div>
    );
};

export default Scoreboard;
