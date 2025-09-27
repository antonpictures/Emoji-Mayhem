import { Level } from '../../types';

export const level31: Level = {
    id: 31,
    name: 'Greenhouse Gauntlet',
    projectiles: 20,
    enemies: [
        // Left side
        { type: 'grunt', emoji: '🌸', position: { x: 200, y: 525 } },
        { type: 'grunt', emoji: '🌹', position: { x: 300, y: 425 } },
        { type: 'hopper', emoji: '🌱', position: { x: 150, y: 625 } },

        // Center
        { type: 'brute', emoji: '🥬', position: { x: 640, y: 310 } },
        { type: 'flyer', emoji: '🍁', position: { x: 500, y: 150 } },
        { type: 'flyer', emoji: '🍂', position: { x: 780, y: 150 } },

        // Right side
        { type: 'tank', emoji: '🌵', position: { x: 1050, y: 600 } },
        { type: 'grunt', emoji: '🌻', position: { x: 950, y: 525 } },
        { type: 'grunt', emoji: '🌷', position: { x: 1000, y: 425 } },
    ],
    platforms: [
        // Left platforms
        { id: 'l31p1', position: { x: 150, y: 550 }, width: 150, height: 20 },
        { id: 'l31p2', position: { x: 250, y: 450 }, width: 100, height: 20 },

        // Right platforms
        { id: 'l31p3', position: { x: 900, y: 550 }, width: 150, height: 20 },
        { id: 'l31p4', position: { x: 950, y: 450 }, width: 100, height: 20 },

        // Center platform
        { id: 'l31p5', position: { x: 590, y: 350 }, width: 100, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l31b1', position: { x: 900, y: 620 }, health: 100, width: 80, height: 30 },
    ],
    emojiStructures: [
        { id: 'l31s1', position: { x: 150, y: 300 }, emoji: '🌳', fontSize: 200 },
        { id: 'l31s2', position: { x: 1130, y: 300 }, emoji: '🌴', fontSize: 200 },
        { id: 'l31s3', position: { x: 640, y: 500 }, emoji: '🌲', fontSize: 250 },
    ],
    theme: {
        sky: ['#588157', '#a3b18a', '#dad7cd'] // Earthy green tones
    }
};