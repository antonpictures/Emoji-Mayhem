import { Level } from '../../types';

export const level33: Level = {
    id: 33,
    name: 'Cartoon Capers',
    projectiles: 16,
    enemies: [
        { type: 'hopper', emoji: '🥴', position: { x: 200, y: 625 } },
        { type: 'hopper', emoji: '🥴', position: { x: 300, y: 625 } },
        { type: 'brute', emoji: '👴', position: { x: 1000, y: 510 } },
        { type: 'grunt', emoji: '👦', position: { x: 950, y: 525 } },
        { type: 'tank', emoji: '🤖', position: { x: 1050, y: 300 } },
        { type: 'flyer', emoji: '🧙', position: { x: 640, y: 150 } },
    ],
    platforms: [
        { id: 'l33p1', position: { x: 150, y: 550 }, width: 200, height: 20 },
        { id: 'l33p2', position: { x: 900, y: 550 }, width: 150, height: 20 },
        { id: 'l33p3', position: { x: 1000, y: 350 }, width: 150, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l33b1', position: { x: 500, y: 620 }, health: 100, width: 300, height: 30 },
    ],
    emojiStructures: [
        { id: 'l33s1', position: { x: 640, y: 400 }, emoji: '📺', fontSize: 300 },
    ],
    theme: {
        sky: ['#87CEEB', '#FFC0CB', '#90EE90']
    }
};
