import { Level } from '../../types';

export const level46: Level = {
    id: 46,
    name: "Thanksgiving Feast",
    projectiles: 20,
    enemies: [
        // Main dish
        { type: 'tank', emoji: '🦃', position: { x: 640, y: 400 } },

        // Side dishes on the "table"
        { type: 'brute', emoji: '🥧', position: { x: 400, y: 610 } },
        { type: 'grunt', emoji: '🌽', position: { x: 900, y: 625 } },
        { type: 'grunt', emoji: '🍗', position: { x: 980, y: 625 } },
        { type: 'hopper', emoji: '🥔', position: { x: 250, y: 625 } },
        { type: 'brute', emoji: '🍖', position: { x: 1100, y: 510 } },

        // People
        { type: 'grunt', emoji: '🎩', position: { x: 150, y: 425 } }, // Pilgrim
        { type: 'grunt', emoji: '👪', position: { x: 1100, y: 325 } },
    ],
    breakableBlocks: [
        // The "table"
        { id: 'l46p1', position: { x: 350, y: 550 }, width: 600, height: 20, health: 150 },
        
        // Supports for the table
        { id: 'l46b1', position: { x: 400, y: 570 }, health: 100, width: 20, height: 80 },
        { id: 'l46b2', position: { x: 880, y: 570 }, health: 100, width: 20, height: 80 },

        // Other platforms
        { id: 'l46p2', position: { x: 100, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l46p3', position: { x: 1050, y: 350 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l46s1', position: { x: 100, y: 200 }, emoji: '🍂', fontSize: 150 },
        { id: 'l46s2', position: { x: 1180, y: 200 }, emoji: '🍁', fontSize: 150 },
    ],
    theme: {
      sky: ['#f4a261', '#e76f51', '#d4a373'] // Autumnal colors
    }
};
