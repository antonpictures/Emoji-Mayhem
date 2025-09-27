import { Level } from '../../types';

export const level25: Level = {
    id: 25,
    name: 'Medical Mission',
    projectiles: 16,
    enemies: [
        // Left side "beds"
        { type: 'grunt', emoji: '💊', position: { x: 200, y: 625 } },
        { type: 'hopper', emoji: '🩹', position: { x: 300, y: 525 } },
        { type: 'brute', emoji: '🩺', position: { x: 350, y: 410 } },

        // Center
        { type: 'flyer', emoji: '🩸', position: { x: 640, y: 150 } },

        // Right side "beds"
        { type: 'sparky', emoji: '💉', position: { x: 950, y: 250 } },
        { type: 'tank', emoji: '🩻', position: { x: 1000, y: 500 } },
        { type: 'grunt', emoji: '💊', position: { x: 1050, y: 625 } },
    ],
    platforms: [
        // Left side
        { id: 'l25p1', position: { x: 150, y: 550 }, width: 250, height: 20 },
        { id: 'l25p2', position: { x: 300, y: 450 }, width: 150, height: 20 },
        
        // Right side
        { id: 'l25p3', position: { x: 950, y: 550 }, width: 200, height: 20 },
        { id: 'l25p4', position: { x: 900, y: 300 }, width: 150, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l25b1', position: { x: 600, y: 620 }, health: 100, width: 80, height: 30 },
    ],
    emojiStructures: [
        { id: 'l25s1', position: { x: 640, y: 550 }, emoji: '🏥', fontSize: 250 },
    ],
    theme: {
        sky: ['#e7f5ff', '#d0ebff', '#b9e0ff'] // Clean, medical blue/white
    }
};