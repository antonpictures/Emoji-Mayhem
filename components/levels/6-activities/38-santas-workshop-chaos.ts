import { Level } from '../../types';

export const level38: Level = {
    id: 38,
    name: "Santa's Workshop Chaos",
    projectiles: 15,
    enemies: [
        { type: 'tank', emoji: '🎅', position: { x: 1050, y: 300 } },
        { type: 'brute', emoji: '🤶', position: { x: 1100, y: 610 } },
        { type: 'grunt', emoji: '🧝', position: { x: 850, y: 625 } },
        { type: 'grunt', emoji: '🧝‍♀️', position: { x: 950, y: 525 } },
        { type: 'hopper', emoji: '🦌', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🎁', position: { x: 400, y: 625 } },
        { type: 'grunt', emoji: '🎁', position: { x: 450, y: 625 } },
    ],
    platforms: [],
    breakableBlocks: [
        // Using '🧊' for ice blocks
        { id: 'l38b1', position: { x: 900, y: 570 }, health: 150, width: 20, height: 80 },
        { id: 'l38b2', position: { x: 1180, y: 570 }, health: 150, width: 20, height: 80 },
        { id: 'l38b3', position: { x: 900, y: 450 }, health: 100, width: 200, height: 20 },
        { id: 'l38b4', position: { x: 900, y: 370 }, health: 100, width: 20, height: 80 },
        { id: 'l38p1', position: { x: 1000, y: 350 }, width: 150, height: 20, health: 100 },
        { id: 'l38p2', position: { x: 900, y: 550 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l38s1', position: { x: 640, y: 500 }, emoji: '🎄', fontSize: 400 },
        { id: 'l38s2', position: { x: 200, y: 200 }, emoji: '🔔', fontSize: 100 },
        { id: 'l38s3', position: { x: 400, y: 150 }, emoji: '🌟', fontSize: 100 },
        { id: 'l38s4', position: { x: 100, y: 600 }, emoji: '🧦', fontSize: 100 },
    ],
    theme: {
      sky: ['#000030', '#000045', '#101055'] // Christmas Eve night sky
    }
};