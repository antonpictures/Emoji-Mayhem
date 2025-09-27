import { Level } from '../../types';

export const level29: Level = {
    id: 29,
    name: 'Easter Egg Hunt',
    projectiles: 20,
    enemies: [
        // Hopping bunnies
        { type: 'hopper', emoji: '🐇', position: { x: 200, y: 625 } },
        { type: 'hopper', emoji: '🐰', position: { x: 1080, y: 625 } },

        // Eggs hidden around
        { type: 'grunt', emoji: '🥚', position: { x: 150, y: 525 } },
        { type: 'grunt', emoji: '🥚', position: { x: 300, y: 425 } },
        { type: 'grunt', emoji: '🥚', position: { x: 450, y: 625 } },
        { type: 'grunt', emoji: '🥚', position: { x: 950, y: 525 } },
        { type: 'grunt', emoji: '🥚', position: { x: 1150, y: 425 } },
        { type: 'grunt', emoji: '🥚', position: { x: 800, y: 625 } },
        
        // A tougher "golden egg"
        { type: 'brute', emoji: '🌟', position: { x: 640, y: 310 } },
    ],
    platforms: [
        // Grassy knolls
        { id: 'l29p1', position: { x: 100, y: 550 }, width: 150, height: 20 },
        { id: 'l29p2', position: { x: 250, y: 450 }, width: 150, height: 20 },
        { id: 'l29p3', position: { x: 900, y: 550 }, width: 150, height: 20 },
        { id: 'l29p4', position: { x: 1050, y: 450 }, width: 150, height: 20 },
        { id: 'l29p5', position: { x: 590, y: 350 }, width: 100, height: 20 },
    ],
    breakableBlocks: [
        // "Bushes" hiding eggs
        { id: 'l29b1', position: { x: 420, y: 595 }, health: 100, width: 80, height: 55 },
        { id: 'l29b2', position: { x: 770, y: 595 }, health: 100, width: 80, height: 55 },
    ],
    emojiStructures: [
        { id: 'l29s1', position: { x: 640, y: 500 }, emoji: '⛪', fontSize: 250 },
        { id: 'l29s2', position: { x: 100, y: 300 }, emoji: '✨', fontSize: 100 },
        { id: 'l29s3', position: { x: 1180, y: 300 }, emoji: '✨', fontSize: 100 },
    ],
    theme: {
        sky: ['#abf7b1', '#b7e4c7', '#d8f3dc'] // Spring green/blue
    }
};