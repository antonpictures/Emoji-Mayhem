import { Level } from '../../types';

export const level40: Level = {
    id: 40,
    name: "Leprechaun's Gold Rush",
    projectiles: 18,
    enemies: [
        // Main treasure
        { type: 'tank', emoji: '💰', position: { x: 1050, y: 600 } },
        
        // Guards
        { type: 'hopper', emoji: '🧝‍♂️', position: { x: 950, y: 525 } },
        { type: 'hopper', emoji: '🧝‍♂️', position: { x: 1150, y: 525 } },
        
        // Obstacles
        { type: 'brute', emoji: '🍺', position: { x: 800, y: 610 } },
        { type: 'brute', emoji: '🎩', position: { x: 400, y: 510 } },
        { type: 'grunt', emoji: '☘️', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🍀', position: { x: 550, y: 425 } },
        { type: 'grunt', emoji: '🇮🇪', position: { x: 300, y: 325 } },

        // Lucky star flyer
        { type: 'flyer', emoji: '🌟', position: { x: 640, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        // "Hills"
        { id: 'l40b1', position: { x: 750, y: 570 }, health: 100, width: 150, height: 80 },
        { id: 'l40p1', position: { x: 350, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l40p2', position: { x: 500, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l40p3', position: { x: 250, y: 350 }, width: 100, height: 20, health: 100 },
        { id: 'l40p4', position: { x: 900, y: 550 }, width: 300, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l40s1', position: { x: 640, y: 400 }, emoji: '🌈', fontSize: 400 },
    ],
    theme: {
      sky: ['#6a994e', '#a7c957', '#f2e8cf'] // Green and gold theme
    }
};