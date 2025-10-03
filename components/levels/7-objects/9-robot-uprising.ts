// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level9: Level = {
    id: 9,
    name: 'Robot Uprising',
    projectiles: 12,
    enemies: [
        { type: 'tank', emoji: '🤖', position: {x: 750, y: 600} },
        { type: 'grunt', emoji: '⚙️', position: {x: 940, y: 400 } },
        { type: 'flyer', emoji: '🛸', position: {x: 900, y: 200} },
        { type: 'sparky', emoji: '⚡', position: {x: 1140, y: 330} },
    ],
    breakableBlocks: [
        { id: 'l9b1', position: {x: 900, y: 420}, width: 100, height: 20, health: 100},
        { id: 'l9b2', position: {x: 890, y: 440}, width: 20, height: 210, health: 100},
        { id: 'l9b3', position: {x: 990, y: 440}, width: 20, height: 210, health: 100},
        { id: 'l9p1', position: {x: 1090, y: 350}, width: 100, height: 20, health: 100},
    ],
    emojiStructures: [
        {id: 'l9s1', position: { x: 700, y: 550 }, emoji: '🏭', fontSize: 250, health: 250 },
    ],
    wormholes: [
        { id: 'l9-wh-a', type: 'black', position: { x: 600, y: 100 }, radius: 30, pairId: 'l9-wh-b' },
        { id: 'l9-wh-b', type: 'white', position: { x: 1200, y: 600 }, radius: 30, pairId: 'l9-wh-a' },
    ],
    blackHoles: [
        { id: 'l9-bh-1', position: { x: 300, y: 400 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#495057', '#6c757d', '#adb5bd']
    }
};
