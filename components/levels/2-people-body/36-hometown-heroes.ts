import { Level } from '../../types';

export const level36: Level = {
    id: 36,
    name: 'Hometown Heroes',
    projectiles: 18,
    enemies: [
        { type: 'grunt', emoji: '👮', position: { x: 250, y: 525 } },
        { type: 'brute', emoji: '🧑‍🚒', position: { x: 1000, y: 610 } },
        { type: 'grunt', emoji: '🧑‍⚕️', position: { x: 300, y: 325 } },
        { type: 'hopper', emoji: '🧑‍🍳', position: { x: 800, y: 425 } },
        { type: 'sparky', emoji: '🧑‍🔧', position: { x: 640, y: 250 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l36b1', position: { x: 950, y: 500 }, health: 100, width: 150, height: 110 },
        { id: 'l36p1', position: { x: 200, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l36p2', position: { x: 250, y: 350 }, width: 150, height: 20, health: 100 },
        { id: 'l36p3', position: { x: 750, y: 450 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l36s1', position: { x: 400, y: 500 }, emoji: '🏥', fontSize: 250 },
        { id: 'l36s2', position: { x: 800, y: 600 }, emoji: '🏭', fontSize: 150 },
    ],
    theme: {
        sky: ['#6c757d', '#adb5bd', '#dee2e6']
    }
};