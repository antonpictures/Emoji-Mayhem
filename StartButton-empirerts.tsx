/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface StartButtonProps {
    dispatch: React.Dispatch<any>;
}

const StartButton: React.FC<StartButtonProps> = ({ dispatch }) => {
    return (
        <button className="start-button" onClick={() => dispatch({ type: 'START_GAME' })}>
            Start Game
        </button>
    );
};

export default StartButton;