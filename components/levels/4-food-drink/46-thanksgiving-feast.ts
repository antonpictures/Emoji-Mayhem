import { Level } from '../../types';

export const level46: Level = {
    id: 46,
    name: "Thanksgiving Feast",
    projectiles: 20,
    enemies: [
        { type: 'tank', emoji: '🦃', position: { x: 940, y: 485 } },
        { type: 'brute', emoji: '🥧', position: { x: 700, y: 610 } },
        { type: 'grunt', emoji: '🌽', position: { x: 900, y: 625 } },
        { type: 'hopper', emoji: '🥔', position: { x: 1150, y: 625 } },
        { type: 'brute', emoji: '🍖', position: { x: 1100, y: 500 } },
        { type: 'grunt', emoji: '🎩', position: { x: 650, y: 400 } }, 
        { type: 'grunt', emoji: '👪', position: { x: 1100, y: 300 } },
    ],
    breakableBlocks: [
        { id: 'l46p1', position: { x: 650, y: 520 }, width: 500, height: 20, health: 150 },
        { id: 'l46b1', position: { x: 700, y: 540 }, health: 100, width: 20, height: 110 },
        { id: 'l46b2', position: { x: 1080, y: 540 }, health: 100, width: 20, height: 110 },
        { id: 'l46p2', position: { x: 600, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l46p3', position: { x: 1050, y: 320 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l46s1', position: { x: 500, y: 200 }, emoji: '🍂', fontSize: 150, health: 50 },
        { id: 'l46s2', position: { x: 1200, y: 200 }, emoji: '🍁', fontSize: 150, health: 50 },
    ],
    wormholes: [
        { id: 'l46-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l46-wh-b' },
        { id: 'l46-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l46-wh-a' },
    ],
    blackHoles: [
        { id: 'l46-bh-1', position: { x: 640, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#f4a261', '#e76f51', '#d4a373']
    }
};
