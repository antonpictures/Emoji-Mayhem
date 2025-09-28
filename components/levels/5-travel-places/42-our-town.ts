import { Level } from '../../types';

export const level42: Level = {
    id: 42,
    name: "Our Town",
    projectiles: 20,
    enemies: [
        // Left Residential
        { type: 'grunt', emoji: '🏠', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🏡', position: { x: 300, y: 525 } },

        // Center Skyscraper
        { type: 'brute', emoji: '🏢', position: { x: 640, y: 210 } },
        
        // Right Civic Center
        { type: 'brute', emoji: '🏫', position: { x: 1000, y: 410 } },
        { type: 'grunt', emoji: '🏥', position: { x: 950, y: 625 } },
        { type: 'tank', emoji: '🏦', position: { x: 1150, y: 600 } },
    ],
    platforms: [],
    breakableBlocks: [
        // Skyscraper Structure
        { id: 'l42b1', position: { x: 600, y: 250 }, health: 150, width: 80, height: 400 },
        
        // School protection
        { id: 'l42b2', position: { x: 950, y: 470 }, health: 100, width: 20, height: 180 },
        { id: 'l42b3', position: { x: 1050, y: 470 }, health: 100, width: 20, height: 180 },
        { id: 'l42p1', position: { x: 250, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l42p2', position: { x: 150, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l42p3', position: { x: 950, y: 450 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l42s1', position: { x: 450, y: 500 }, emoji: '🏘️', fontSize: 250 },
        { id: 'l42s2', position: { x: 800, y: 300 }, emoji: '🗼', fontSize: 200 },
        { id: 'l42s3', position: { x: 50, y: 600 }, emoji: '⛪', fontSize: 100 },
        { id: 'l42s4', position: { x: 1230, y: 600 }, emoji: '⛩️', fontSize: 100 },
        { id: 'l42s5', position: { x: 100, y: 150 }, emoji: '🗽', fontSize: 150 },
    ],
    theme: {
      sky: ['#87CEEB', '#B0E0E6', '#ADD8E6'] // Pleasant daytime sky
    }
};