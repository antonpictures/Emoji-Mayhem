// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level26: Level = {
    id: 26,
    name: 'A Year in a Day',
    projectiles: 20,
    enemies: [
        { type: 'hopper', emoji: '🐝', position: { x: 600, y: 625 } },
        { type: 'grunt', emoji: '🌸', position: { x: 750, y: 530 } },
        { type: 'tank', emoji: '🌞', position: { x: 1150, y: 600 } },
        { type: 'grunt', emoji: '🍎', position: { x: 1200, y: 500 } },
        { type: 'flyer', emoji: '🍂', position: { x: 1000, y: 150 } },
        { type: 'grunt', emoji: '🍁', position: { x: 1050, y: 300 } },
        { type: 'brute', emoji: '🥶', position: { x: 850, y: 285 } },
        { type: 'flyer', emoji: '❄️', position: { x: 700, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l26p1', position: { x: 550, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l26p2', position: { x: 1100, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l26p3', position: { x: 950, y: 320 }, width: 200, height: 20, health: 100 },
        { id: 'l26p4', position: { x: 800, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l26p5', position: { x: 800, y: 320 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l26s1', position: { x: 940, y: 450 }, emoji: '🌎', fontSize: 150 },
    ],
    wormholes: [
        { id: 'l26-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l26-wh-b' },
        { id: 'l26-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l26-wh-a' },
    ],
    blackHoles: [
        { id: 'l26-bh-1', position: { x: 500, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#87CEEB', '#FDB813', '#FF7F50']
    }
};
