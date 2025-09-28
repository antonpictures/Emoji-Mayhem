import { Level } from '../../types';

export const level43: Level = {
    id: 43,
    name: "Kitchen Calamity",
    projectiles: 18,
    enemies: [
        // Counter enemies
        { type: 'grunt', emoji: '🍔', position: { x: 250, y: 625 } },
        { type: 'grunt', emoji: '🌭', position: { x: 350, y: 625 } },
        { type: 'brute', emoji: '🍕', position: { x: 450, y: 510 } },

        // Shelf enemies
        { type: 'grunt', emoji: '🧂', position: { x: 800, y: 425 } },
        { type: 'grunt', emoji: '🧈', position: { x: 880, y: 425 } },
        { type: 'tank', emoji: '🥫', position: { x: 1100, y: 600 } },
        
        // High-up enemies
        { type: 'hopper', emoji: '🥚', position: { x: 1000, y: 325 } },
        { type: 'flyer', emoji: '🍿', position: { x: 640, y: 150 } },

        // Another food pile
        { type: 'brute', emoji: '🥞', position: { x: 1100, y: 410 } },
        { type: 'grunt', emoji: '🧇', position: { x: 1100, y: 525 } },
    ],
    breakableBlocks: [
        { id: 'l43p1', position: { x: 400, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l43p2', position: { x: 750, y: 450 }, width: 200, height: 20, health: 100 },
        { id: 'l43p3', position: { x: 950, y: 350 }, width: 100, height: 20, health: 100 },
        { id: 'l43p4', position: { x: 1050, y: 450 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l43s1', position: { x: 640, y: 550 }, emoji: '🍳', fontSize: 200 },
        { id: 'l43s2', position: { x: 150, y: 500 }, emoji: '🥣', fontSize: 200 },
    ],
    theme: {
      sky: ['#f2e8cf', '#d4a373', '#a16207'] // Kitchen, warm tones
    }
};