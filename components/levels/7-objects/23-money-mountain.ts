import { Level } from '../../types';

export const level23: Level = {
    id: 23,
    name: 'Money Mountain',
    projectiles: 16,
    enemies: [
        // Left side coins
        { type: 'hopper', emoji: '🪙', position: { x: 200, y: 525 } },
        { type: 'hopper', emoji: '🪙', position: { x: 300, y: 425 } },

        // Center
        { type: 'brute', emoji: '💰', position: { x: 640, y: 610 } },
        { type: 'flyer', emoji: '💸', position: { x: 640, y: 150 } },

        // Right side vault
        { type: 'grunt', emoji: '💵', position: { x: 1000, y: 625 } },
        { type: 'grunt', emoji: '💶', position: { x: 1080, y: 625 } },
        { type: 'tank', emoji: '💳', position: { x: 1040, y: 500 } },
        { type: 'grunt', emoji: '🧾', position: { x: 1040, y: 425 } },
    ],
    platforms: [
        // Left stacks
        { id: 'l23p1', position: { x: 150, y: 550 }, width: 100, height: 20 },
        { id: 'l23p2', position: { x: 250, y: 450 }, width: 100, height: 20 },

        // Right vault structure
        { id: 'l23p3', position: { x: 950, y: 550 }, width: 200, height: 20 }, // ceiling for notes
        { id: 'l23p4', position: { x: 950, y: 450 }, width: 200, height: 20 }, // ceiling for receipt
    ],
    breakableBlocks: [
        // Vault door
        { id: 'l23b1', position: { x: 950, y: 570 }, health: 150, width: 20, height: 80 },
        { id: 'l23b2', position: { x: 1130, y: 570 }, health: 150, width: 20, height: 80 },
    ],
    emojiStructures: [
        { id: 'l23s1', position: { x: 800, y: 300 }, emoji: '💹', fontSize: 250 },
    ],
    theme: {
        sky: ['#386641', '#6a994e', '#a7c957'] // Money green tones
    }
};