import { Level } from '../../types';

export const level30: Level = {
    id: 30,
    name: 'Cosmic Celebration',
    projectiles: 20,
    enemies: [
        // Astronauts
        { type: 'hopper', emoji: '👨‍🚀', position: { x: 200, y: 625 } },
        { type: 'hopper', emoji: '👩‍🚀', position: { x: 1080, y: 625 } },

        // Spacecraft
        { type: 'tank', emoji: '🚀', position: { x: 640, y: 600 } },
        { type: 'flyer', emoji: '🛰️', position: { x: 400, y: 150 } },
        { type: 'flyer', emoji: '🛸', position: { x: 900, y: 150 } },

        // Celestial bodies
        { type: 'sparky', emoji: '☄️', position: { x: 640, y: 300 } },
        { type: 'grunt', emoji: '⭐', position: { x: 300, y: 425 } },
        { type: 'grunt', emoji: '⭐', position: { x: 980, y: 425 } },
    ],
    platforms: [],
    breakableBlocks: [
        // Asteroids
        { id: 'l30b1', position: { x: 500, y: 400 }, health: 100, width: 50, height: 50 },
        { id: 'l30b2', position: { x: 730, y: 400 }, health: 100, width: 50, height: 50 },
        { id: 'l30p1', position: { x: 590, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l30p2', position: { x: 150, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l30p3', position: { x: 1030, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l30p4', position: { x: 250, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l30p5', position: { x: 930, y: 450 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l30s1', position: { x: 150, y: 200 }, emoji: '🪐', fontSize: 200 },
        { id: 'l30s2', position: { x: 1130, y: 200 }, emoji: '🌌', fontSize: 200 },
        { id: 'l30s3', position: { x: 640, y: 100 }, emoji: '🌕', fontSize: 100 },
    ],
    theme: {
        sky: ['#020122', '#0c0032', '#190061'] // Deep space purple/blue
    }
};