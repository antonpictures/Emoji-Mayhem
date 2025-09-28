import { Level } from '../../types';

export const level45: Level = {
    id: 45,
    name: "Arts & Crafts Corner",
    projectiles: 18,
    enemies: [
        // Bottom row
        { type: 'grunt', emoji: '🧵', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🧶', position: { x: 300, y: 625 } },
        { type: 'hopper', emoji: '🎭', position: { x: 1000, y: 625 } },

        // Mid-level
        { type: 'brute', emoji: '🎨', position: { x: 400, y: 410 } },
        { type: 'brute', emoji: '🖼️', position: { x: 900, y: 410 } },
        
        // High-level
        { type: 'sparky', emoji: '🪡', position: { x: 640, y: 250 } },
        { type: 'flyer', emoji: '🪢', position: { x: 640, y: 150 } },
    ],
    breakableBlocks: [
        // Easels and shelves
        { id: 'l45p1', position: { x: 350, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l45p2', position: { x: 850, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l45p3', position: { x: 590, y: 300 }, width: 100, height: 20, health: 100 },
        { id: 'l45b1', position: { x: 390, y: 470 }, health: 100, width: 20, height: 180 },
        { id: 'l45b2', position: { x: 890, y: 470 }, health: 100, width: 20, height: 180 },
    ],
    theme: {
      sky: ['#f8f7f2', '#e9e3d5', '#d1c8b7'] // Canvas/paper tones
    }
};
