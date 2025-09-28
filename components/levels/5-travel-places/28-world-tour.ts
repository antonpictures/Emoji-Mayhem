import { Level } from '../../types';

export const level28: Level = {
    id: 28,
    name: 'World Tour',
    projectiles: 20,
    enemies: [
        // Cityscape (Left)
        { type: 'grunt', emoji: '🗽', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🗼', position: { x: 300, y: 525 } },
        { type: 'brute', emoji: '🏛️', position: { x: 250, y: 410 } },
        { type: 'grunt', emoji: '⛪', position: { x: 400, y: 625 } },

        // Nature (Right)
        { type: 'brute', emoji: '🌋', position: { x: 1050, y: 610 } },
        { type: 'tank', emoji: '🏔️', position: { x: 950, y: 500 } },
        { type: 'grunt', emoji: '🏝️', position: { x: 1100, y: 525 } },
        { type: 'grunt', emoji: '⛺', position: { x: 850, y: 625 } },

        // Air
        { type: 'flyer', emoji: '✈️', position: { x: 640, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l28b1', position: { x: 900, y: 480 }, health: 100, width: 100, height: 70 },
        { id: 'l28p1', position: { x: 250, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l28p2', position: { x: 200, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l28p3', position: { x: 900, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l28p4', position: { x: 1050, y: 450 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l28s1', position: { x: 640, y: 400 }, emoji: '🗺️', fontSize: 250 },
        { id: 'l28s2', position: { x: 150, y: 200 }, emoji: '🌎', fontSize: 100 },
        { id: 'l28s3', position: { x: 1150, y: 200 }, emoji: '🌏', fontSize: 100 },
    ],
    theme: {
        sky: ['#87CEEB', '#AED9E0', '#B8E2E8'] // Light, travel blue
    }
};