/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Corrected import path for GameState.
import { GameState } from './types-empirerts';

interface ImpactMessageProps {
    message: GameState['impactMessage'];
    dispatch: React.Dispatch<any>;
}

// Note: This component is currently unused as victory/defeat is handled
// by a full-screen overlay in UI.tsx. This file is provided to fix the
// module resolution error.
const ImpactMessage: React.FC<ImpactMessageProps> = ({ message, dispatch }) => {
    React.useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch({ type: 'SET_IMPACT_MESSAGE', payload: null });
            }, 4000); // 4 seconds
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    // This could be styled differently for a less intrusive "impact" message
    return (
        <div className="winner-overlay" style={{fontSize: '2em', padding: '20px'}}>
            <h2>{message.text}</h2>
        </div>
    );
};

export default ImpactMessage;