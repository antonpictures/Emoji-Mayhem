/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Corrected import path for TICK_RATE.
import { TICK_RATE } from './constants-empirerts';

export const useGameLoop = (callback: () => void) => {
    const callbackRef = React.useRef(callback);
    callbackRef.current = callback;

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            callbackRef.current();
        }, TICK_RATE);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
};