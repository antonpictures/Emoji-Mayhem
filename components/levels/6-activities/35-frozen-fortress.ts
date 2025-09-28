import { Level } from '../../types';

export const level35: Level = {
    id: 35,
    name: 'Frozen Fortress',
    projectiles: 18,
    enemies: [
        { type: 'brute', emoji: '👩🏻‍🦳', position: { x: 1000, y: 210 } }, // Elsa
        { type: 'grunt', emoji: '⛄', position: { x: 250, y: 625 } }, // Olaf
        { type: 'hopper', emoji: '🦌', position: { x: 1100, y: 625 } }, // Sven
        { type: 'tank', emoji: '🧊', position: { x: 950, y: 400 } },
        { type: 'grunt', emoji: '⛄', position: { x: 800, y: 525 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l35b1', position: { x: 850, y: 570 }, health: 150, width: 20, height: 80 },
        { id: 'l35b2', position: { x: 1100, y: 570 }, health: 150, width: 20, height: 80 },
        { id: 'l35b3', position: { x: 900, y: 350 }, health: 100, width: 200, height: 20 },
        { id: 'l35p1', position: { x: 900, y: 250 }, width: 200, height: 20, health: 100 }, // Elsa's platform
        { id: 'l35p2', position: { x: 900, y: 450 }, width: 100, height: 20, health: 100 }, // Ice block's platform
        { id: 'l35p3', position: { x: 750, y: 550 }, width: 100, height: 20, health: 100 }, // Olaf's platform
    ],
    emojiStructures: [
        { id: 'l35s1', position: { x: 1000, y: 500 }, emoji: '🏰', fontSize: 500 },
        { id: 'l35s2', position: { x: 200, y: 200 }, emoji: '❄️', fontSize: 100 },
        { id: 'l35s3', position: { x: 500, y: 150 }, emoji: '❄️', fontSize: 150 },
        { id: 'l35s4', position: { x: 1150, y: 300 }, emoji: '❄️', fontSize: 80 },
    ],
    theme: {
        sky: ['#caf0f8', '#ade8f4', '#90e0ef']
    }
};