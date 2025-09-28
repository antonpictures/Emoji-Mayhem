import { Level } from '../../types';

export const level41: Level = {
    id: 41,
    name: "Birthday Bash",
    projectiles: 20,
    enemies: [
        // The main cake in the center
        { type: 'tank', emoji: '🎂', position: { x: 640, y: 400 } },

        // Party guests on the ground
        { type: 'hopper', emoji: '🥳', position: { x: 300, y: 625 } },
        { type: 'hopper', emoji: '💃', position: { x: 900, y: 625 } },
        { type: 'hopper', emoji: '🕺', position: { x: 1000, y: 625 } },

        // The "birthday person" on a high platform
        { type: 'brute', emoji: '👑', position: { x: 250, y: 310 } },

        // Gifts and food
        { type: 'grunt', emoji: '🎁', position: { x: 850, y: 525 } },
        { type: 'grunt', emoji: '🎁', position: { x: 950, y: 525 } },
        { type: 'grunt', emoji: '🥂', position: { x: 400, y: 525 } },
        { type: 'grunt', emoji: '🍗', position: { x: 450, y: 525 } },

        // Flyers
        { type: 'flyer', emoji: '🎈', position: { x: 500, y: 150 } },
        { type: 'flyer', emoji: '🎈', position: { x: 800, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        // Part of the gift pile
        { id: 'l41b1', position: { x: 800, y: 480 }, health: 100, width: 200, height: 70 },
        { id: 'l41p1', position: { x: 590, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l41p2', position: { x: 200, y: 350 }, width: 100, height: 20, health: 100 },
        { id: 'l41p3', position: { x: 350, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l41p4', position: { x: 800, y: 550 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l41s1', position: { x: 150, y: 200 }, emoji: '🎉', fontSize: 200 },
        { id: 'l41s2', position: { x: 1130, y: 200 }, emoji: '🎊', fontSize: 200 },
        { id: 'l41s3', position: { x: 640, y: 100 }, emoji: '✨', fontSize: 100 },
    ],
    theme: {
      sky: ['#f8c5d8', '#f6a7c1', '#f389aa'] // Festive pink/purple
    }
};