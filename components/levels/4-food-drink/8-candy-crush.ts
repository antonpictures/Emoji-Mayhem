// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level8: Level = {
    id: 8,
    name: 'Candy Crush',
    projectiles: 12,
    enemies: [
        { type: 'grunt', emoji: '🍭', position: { x: 700, y: 625 } },
        { type: 'grunt', emoji: '🍬', position: { x: 700, y: 475 } },
        { type: 'grunt', emoji: '🍩', position: { x: 700, y: 375 } },
        { type: 'brute', emoji: '🎂', position: { x: 1100, y: 610 } },
        { type: 'grunt', emoji: '🍪', position: { x: 1100, y: 475 } },
        { type: 'grunt', emoji: '🍫', position: { x: 1100, y: 375 } }
    ],
    breakableBlocks: [
      {id: 'l8b1', position: { x: 650, y: 500 }, width: 100, height: 20, health: 50},
      {id: 'l8b2', position: { x: 650, y: 400 }, width: 100, height: 20, health: 50},
      {id: 'l8b3', position: { x: 1050, y: 500 }, width: 100, height: 20, health: 50},
      {id: 'l8b4', position: { x: 1050, y: 400 }, width: 100, height: 20, health: 50},
    ],
    emojiStructures: [
        { id: 'l8s1', position: { x: 900, y: 580 }, emoji: '🧁', fontSize: 120 },
    ],
    wormholes: [
        { id: 'l8-wh-a', type: 'black', position: { x: 100, y: 500 }, radius: 30, pairId: 'l8-wh-b' },
        { id: 'l8-wh-b', type: 'white', position: { x: 1180, y: 200 }, radius: 30, pairId: 'l8-wh-a' },
    ],
    blackHoles: [
        { id: 'l8-bh-1', position: { x: 900, y: 150 }, radius: 25, gravityRadius: 200, gravityForce: 150 },
    ],
    theme: {
        sky: ['#ffafcc', '#bde0fe', '#a2d2ff']
    }
};
