/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Empire MPS

import React from 'react';
import { useGameState } from './useGameState-empirerts';
import { useGameLoop } from './useGameLoop-empirerts';
import { useGameEngine } from './useGameEngine-empirerts';
import { useEnemyAI } from './useEnemyAI-empirerts';
import UI from './UI-empirerts';
// FIX: Corrected import path for BuildingType.
import { BuildingType } from './types-empirerts';

const RTSGame = () => {
    const { gameState, dispatch } = useGameState();
    const [placementMode, setPlacementMode] = React.useState<BuildingType | null>(null);

    const { tick: engineTick } = useGameEngine({ gameState, dispatch });
    const { tick: enemyAITick } = useEnemyAI({ gameState, dispatch, isEnabled: true });

    useGameLoop(() => {
        engineTick();
        enemyAITick();
    });

    return (
        <div className="game-container">
            <UI
                gameState={gameState}
                dispatch={dispatch}
                placementMode={placementMode}
                setPlacementMode={setPlacementMode}
                setView={() => {}} // setView is no longer used
            />
        </div>
    );
};

export default RTSGame;