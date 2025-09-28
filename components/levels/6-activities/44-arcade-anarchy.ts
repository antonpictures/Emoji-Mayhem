import { Level } from '../../types';

export const level44: Level = {
    id: 44,
    name: "Arcade Anarchy",
    projectiles: 20,
    enemies: [
        // Left side: Prize Corner
        { type: 'brute', emoji: '🧸', position: { x: 250, y: 610 } },
        { type: 'bomber', emoji: '🪅', position: { x: 350, y: 525 } },
        { type: 'grunt', emoji: '🪆', position: { x: 200, y: 425 } },

        // Center: Arcade Cabinet
        { type: 'tank', emoji: '🎮', position: { x: 640, y: 300 } },
        { type: 'grunt', emoji: '🕹️', position: { x: 640, y: 525 } },
        
        // Right side: Card/Dice Game
        { type: 'brute', emoji: '🎰', position: { x: 1000, y: 410 } },
        { type: 'hopper', emoji: '🎲', position: { x: 950, y: 625 } },
        { type: 'hopper', emoji: '🎲', position: { x: 1050, y: 625 } },
        { type: 'grunt', emoji: '🃏', position: { x: 1100, y: 525 } },

        // Flyers and targets
        { type: 'flyer', emoji: '🪁', position: { x: 400, y: 150 } },
        { type: 'sparky', emoji: '🪄', position: { x: 800, y: 200 } },
        { type: 'grunt', emoji: '🎯', position: { x: 100, y: 250 } },
    ],
    breakableBlocks: [
        // Prize Corner counter
        { id: 'l44p1', position: { x: 150, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l44p2', position: { x: 150, y: 450 }, width: 100, height: 20, health: 100 },

        // Arcade Cabinet structure
        { id: 'l44b1', position: { x: 590, y: 350 }, health: 150, width: 20, height: 200 },
        { id: 'l44b2', position: { x: 690, y: 350 }, health: 150, width: 20, height: 200 },
        { id: 'l44p3', position: { x: 590, y: 350 }, width: 120, height: 20, health: 100 },

        // Card table
        { id: 'l44p4', position: { x: 900, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l44p5', position: { x: 950, y: 450 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l44s1', position: { x: 640, y: 100 }, emoji: '🪩', fontSize: 150 },
        { id: 'l44s2', position: { x: 900, y: 300 }, emoji: '♠️', fontSize: 80 },
        { id: 'l44s3', position: { x: 1100, y: 300 }, emoji: '♥️', fontSize: 80 },
    ],
    theme: {
      sky: ['#1d0f2b', '#4c1d59', '#ff00a0'] // Arcade neon theme
    }
};