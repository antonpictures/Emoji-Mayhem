/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { MapData } from '../types-empirerts';

export const sampleMap: MapData = {
    meta: {
        name: 'Twin Rivers',
        width: 3000,
        height: 3000,
    },
    terrain: [
        // Mountains
        { type: 'Mountain', x: 1500, y: 750, radius: 150 },
        { type: 'Mountain', x: 1500, y: 2250, radius: 150 },
    ],
    units: [
        // Player
        { type: 'Villager', owner: 'PLAYER', x: 450, y: 450 },
        { type: 'Villager', owner: 'PLAYER', x: 550, y: 450 },
        { type: 'Villager', owner: 'PLAYER', x: 450, y: 550 },
        // Enemy
        { type: 'Villager', owner: 'ENEMY', x: 2550, y: 2550 },
        { type: 'Villager', owner: 'ENEMY', x: 2450, y: 2550 },
        { type: 'Villager', owner: 'ENEMY', x: 2550, y: 2450 },
    ],
    buildings: [
        { type: 'TownHall', owner: 'PLAYER', x: 500, y: 500 },
        { type: 'TownHall', owner: 'ENEMY', x: 2500, y: 2500 },
    ],
    resources: [
        // Player's starting resources
        { type: 'Wood', amount: 500, x: 300, y: 300 },
        { type: 'Food', amount: 500, x: 700, y: 300, visualType: 'Deer' },
        { type: 'Gold', amount: 500, x: 300, y: 700 },
        // Enemy's starting resources
        { type: 'Wood', amount: 500, x: 2700, y: 2700 },
        { type: 'Food', amount: 500, x: 2300, y: 2700, visualType: 'Deer' },
        { type: 'Gold', amount: 500, x: 2700, y: 2300 },
        // Central resources
        { type: 'Gold', amount: 1000, x: 1500, y: 1500 },
        { type: 'Food', amount: 800, x: 1200, y: 1800, visualType: 'Elephant' },
        { type: 'Food', amount: 800, x: 1800, y: 1200, visualType: 'Elephant' },
    ],
};
