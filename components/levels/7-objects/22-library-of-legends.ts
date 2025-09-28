import { Level } from '../../types';

export const level22: Level = {
    id: 22,
    name: 'Library of Legends',
    projectiles: 16,
    enemies: [
        // Left Shelves
        { type: 'grunt', emoji: '📕', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '📗', position: { x: 250, y: 625 } },
        { type: 'grunt', emoji: '📘', position: { x: 300, y: 625 } },
        { type: 'brute', emoji: '📖', position: { x: 250, y: 510 } },
        { type: 'grunt', emoji: '📓', position: { x: 200, y: 425 } },
        { type: 'grunt', emoji: '🔖', position: { x: 300, y: 425 } },

        // Right Shelves
        { type: 'grunt', emoji: '📙', position: { x: 1000, y: 625 } },
        { type: 'brute', emoji: '📔', position: { x: 1050, y: 510 } },
        { type: 'grunt', emoji: '📜', position: { x: 950, y: 425 } },
        { type: 'grunt', emoji: '📰', position: { x: 1100, y: 425 } },

        // Top shelf
        { type: 'flyer', emoji: '📄', position: { x: 640, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l22p1', position: { x: 150, y: 550 }, width: 200, height: 20, health: 100 },
        { id: 'l22p2', position: { x: 150, y: 450 }, width: 200, height: 20, health: 100 },
        { id: 'l22p3', position: { x: 950, y: 550 }, width: 200, height: 20, health: 100 },
        { id: 'l22p4', position: { x: 950, y: 450 }, width: 200, height: 20, health: 100 },
        { id: 'l22p5', position: { x: 540, y: 350 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l22s1', position: { x: 640, y: 550 }, emoji: '📚', fontSize: 250 },
    ],
    theme: {
        sky: ['#8c5a3b', '#6b4226', '#4a2c16'] // Wood/paper tones
    }
};