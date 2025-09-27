import { Level } from '../../types';

export const level24: Level = {
    id: 24,
    name: 'Science Lab',
    projectiles: 16,
    enemies: [
        // Left bench
        { type: 'grunt', emoji: '🧪', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🧫', position: { x: 280, y: 625 } },
        { type: 'brute', emoji: '🔬', position: { x: 350, y: 500 } },

        // Center
        { type: 'sparky', emoji: '🧬', position: { x: 640, y: 250 } },

        // Right bench
        { type: 'brute', emoji: '🔭', position: { x: 950, y: 500 } },
        { type: 'flyer', emoji: '📡', position: { x: 1050, y: 150 } },
    ],
    platforms: [
        // Left lab bench
        { id: 'l24p1', position: { x: 150, y: 550 }, width: 250, height: 20 },
        // Right lab bench
        { id: 'l24p2', position: { x: 900, y: 550 }, width: 250, height: 20 },
        // High shelf
        { id: 'l24p3', position: { x: 540, y: 350 }, width: 200, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l24b1', position: { x: 590, y: 620 }, health: 100, width: 100, height: 30 },
    ],
    emojiStructures: [
        { id: 'l24s1', position: { x: 640, y: 550 }, emoji: '⚗️', fontSize: 250 },
    ],
    theme: {
        sky: ['#003f5c', '#2f4b7c', '#665191']
    }
};