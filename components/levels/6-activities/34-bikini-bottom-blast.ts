import { Level } from '../../types';

export const level34: Level = {
    id: 34,
    name: 'Bikini Bottom Blast',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '🧽', position: { x: 250, y: 325 } },
        { type: 'brute', emoji: '⭐', position: { x: 1000, y: 610 } },
        { type: 'hopper', emoji: '🐌', position: { x: 150, y: 625 } },
        { type: 'sparky', emoji: '🦠', position: { x: 800, y: 250 } },
        { type: 'grunt', emoji: '🧽', position: { x: 900, y: 425 } },
    ],
    platforms: [
        { id: 'l34p1', position: { x: 200, y: 350 }, width: 100, height: 20 },
        { id: 'l34p2', position: { x: 850, y: 450 }, width: 100, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l34b1', position: { x: 950, y: 500 }, health: 100, width: 150, height: 110 },
    ],
    emojiStructures: [
        { id: 'l34s1', position: { x: 250, y: 500 }, emoji: '🍍', fontSize: 350 },
        { id: 'l34s2', position: { x: 1050, y: 550 }, emoji: '🗿', fontSize: 250 },
    ],
    theme: {
        sky: ['#48cae4', '#ade8f4', '#90e0ef']
    }
};