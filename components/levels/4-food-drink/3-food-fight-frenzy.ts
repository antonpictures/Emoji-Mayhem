import { Level } from '../../types';

export const level3: Level = {
    id: 3,
    name: "Food Fight Frenzy",
    projectiles: 15,
    enemies: [
        // Left structure
        { type: 'grunt', position: { x: 200, y: 625 }, emoji: '🍕' },
        { type: 'grunt', position: { x: 300, y: 625 }, emoji: '🍔' },
        { type: 'grunt', position: { x: 250, y: 550 }, emoji: '🍺' },
        
        // Right structure
        { type: 'brute', position: { x: 1000, y: 610 }, emoji: '🍰' },
        { type: 'grunt', position: { x: 1100, y: 625 }, emoji: '🍣' },
        { type: 'grunt', position: { x: 1050, y: 525 }, emoji: '🍷' },

        // Center Tower
        { type: 'grunt', position: { x: 640, y: 625 }, emoji: '🍩' },
        { type: 'grunt', position: { x: 640, y: 550 }, emoji: '🍭' },
        { type: 'brute', position: { x: 640, y: 450 }, emoji: '🎂' },

        // Flyers
        { type: 'flyer', position: { x: 500, y: 150 }, emoji: '☕' },
        { type: 'flyer', position: { x: 800, y: 150 }, emoji: '🍏' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l3b1', position: { x: 950, y: 500 }, health: 100, width: 200, height: 20 },
        { id: 'l3b2', position: { x: 150, y: 500 }, health: 100, width: 200, height: 20 },
        { id: 'l3p1', position: { x: 600, y: 500 }, width: 80, height: 20, health: 100 },
    ],
    theme: {
        sky: ['#ffecd2', '#fcb69f', '#ffc3a0']
    }
};