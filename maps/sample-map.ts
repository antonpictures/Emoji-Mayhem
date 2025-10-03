/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { MapData } from '../types-empirerts';

export const sampleMap: MapData = {
    meta: {
        name: 'Twin Peaks',
        width: 3000,
        height: 3000,
    },
    terrain: [
        { type: 'Mountain', x: 1500, y: 500, radius: 150 },
        { type: 'Mountain', x: 1500, y: 2500, radius: 150 },
        { type: 'Cactus', x: 800, y: 800, radius: 30 },
        { type: 'Cactus', x: 2200, y: 2200, radius: 30 },
    ],
    units: [
        // Player
        { owner: 'PLAYER', type: 'Villager', x: 400, y: 450 },
        { owner: 'PLAYER', type: 'Villager', x: 450, y: 450 },
        { owner: 'PLAYER', type: 'Villager', x: 450, y: 400 },
        // Enemy
        { owner: 'ENEMY', type: 'Villager', x: 2600, y: 2550 },
        { owner: 'ENEMY', type: 'Villager', x: 2550, y: 2550 },
        { owner: 'ENEMY', type: 'Villager', x: 2550, y: 2500 },
    ],
    buildings: [
        { owner: 'PLAYER', type: 'TownHall', x: 500, y: 500 },
        { owner: 'ENEMY', type: 'TownHall', x: 2500, y: 2500 },
    ],
    resources: [
        // Player's starting resources
        { type: 'Wood', x: 300, y: 300, amount: 250 },
        { type: 'Food', x: 600, y: 300, amount: 250, visualType: 'Deer' },
        { type: 'Gold', x: 700, y: 700, amount: 1000 },
        // Enemy's starting resources
        { type: 'Wood', x: 2700, y: 2700, amount: 250 },
        { type: 'Food', x: 2400, y: 2700, amount: 250, visualType: 'Deer' },
        { type: 'Gold', x: 2300, y: 2300, amount: 1000 },
        // Contested resources
        { type: 'Gold', x: 1500, y: 1500, amount: 2000 },
        { type: 'Food', x: 1200, y: 1800, amount: 500, visualType: 'Lion' },
        { type: 'Food', x: 1800, y: 1200, amount: 500, visualType: 'Lion' },
    ],
};