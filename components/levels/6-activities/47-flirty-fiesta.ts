import { Level } from '../../types';

export const level47: Level = {
    id: 47,
    name: "Flirty Fiesta",
    projectiles: 20,
    enemies: [
        // Centerpiece
        { type: 'brute', emoji: '😈', position: { x: 640, y: 310 } },
        { type: 'tank', emoji: '🥵', position: { x: 640, y: 600 } },

        // Left side
        { type: 'grunt', emoji: '💋', position: { x: 250, y: 525 } },
        { type: 'grunt', emoji: '🌶️', position: { x: 200, y: 625 } },
        { type: 'brute', emoji: '🍑', position: { x: 350, y: 410 } },

        // Right side
        { type: 'grunt', emoji: '🍆', position: { x: 1000, y: 625 } },
        { type: 'grunt', emoji: '🍌', position: { x: 1080, y: 625 } },
        { type: 'brute', emoji: '🍾', position: { x: 950, y: 510 } },

        // Flyers
        { type: 'flyer', emoji: '🎈', position: { x: 400, y: 150 } },
        { type: 'flyer', emoji: '🎉', position: { x: 900, y: 150 } },
        { type: 'sparky', emoji: '🔥', position: { x: 640, y: 100 } },
    ],
    breakableBlocks: [
        { id: 'l47p1', position: { x: 200, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l47p2', position: { x: 300, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l47p3', position: { x: 900, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l47p4', position: { x: 590, y: 350 }, width: 100, height: 20, health: 100 },
        { id: 'l47b1', position: { x: 590, y: 500 }, health: 150, width: 100, height: 100 }, // Central block
    ],
    emojiStructures: [
        { id: 'l47s1', position: { x: 150, y: 300 }, emoji: '🍷', fontSize: 150 },
        { id: 'l47s2', position: { x: 1130, y: 300 }, emoji: '🎭', fontSize: 150 },
        { id: 'l47s3', position: { x: 640, y: 500 }, emoji: '💦', fontSize: 200 },
    ],
    theme: {
      sky: ['#4a0e2a', '#8d1c4f', '#ff007f'] // Hot pink / magenta / dark purple
    }
};