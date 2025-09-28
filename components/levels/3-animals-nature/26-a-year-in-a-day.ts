import { Level } from '../../types';

export const level26: Level = {
    id: 26,
    name: 'A Year in a Day',
    projectiles: 20,
    enemies: [
        // Spring (Bottom-Left)
        { type: 'hopper', emoji: '🐝', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🌸', position: { x: 150, y: 525 } },
        { type: 'grunt', emoji: '🌷', position: { x: 300, y: 525 } },

        // Summer (Bottom-Right)
        { type: 'tank', emoji: '🌞', position: { x: 1050, y: 600 } },
        { type: 'grunt', emoji: '☀️', position: { x: 950, y: 525 } },
        { type: 'grunt', emoji: '🍎', position: { x: 1100, y: 525 } },
        
        // Autumn (Top-Right)
        { type: 'flyer', emoji: '🍂', position: { x: 1000, y: 150 } },
        { type: 'grunt', emoji: '🍁', position: { x: 1050, y: 325 } },
        { type: 'sparky', emoji: '🌦️', position: { x: 850, y: 250 } },

        // Winter (Top-Left)
        { type: 'brute', emoji: '🥶', position: { x: 250, y: 310 } },
        { type: 'grunt', emoji: '🎄', position: { x: 150, y: 425 } },
        { type: 'flyer', emoji: '❄️', position: { x: 200, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l26p1', position: { x: 100, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l26p2', position: { x: 900, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l26p3', position: { x: 950, y: 350 }, width: 200, height: 20, health: 100 },
        { id: 'l26p4', position: { x: 100, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l26p5', position: { x: 200, y: 350 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l26s1', position: { x: 640, y: 400 }, emoji: '🌎', fontSize: 150 },
        { id: 'l26s2', position: { x: 450, y: 550 }, emoji: '🌈', fontSize: 150 },
    ],
    theme: {
        sky: ['#87CEEB', '#FDB813', '#FF7F50'] // Skyblue to Orange/Red
    }
};