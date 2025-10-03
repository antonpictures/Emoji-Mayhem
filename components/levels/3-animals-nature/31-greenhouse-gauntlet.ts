import { Level } from '../../types';

export const level31: Level = {
    id: 31,
    name: 'Greenhouse Gauntlet',
    projectiles: 20,
    enemies: [
        { type: 'grunt', emoji: '🌸', position: { x: 650, y: 530 } },
        { type: 'grunt', emoji: '🌹', position: { x: 850, y: 400 } },
        { type: 'hopper', emoji: '🌱', position: { x: 750, y: 625 } },
        { type: 'brute', emoji: '🥬', position: { x: 940, y: 285 } },
        { type: 'flyer', emoji: '🍁', position: { x: 800, y: 150 } },
        { type: 'tank', emoji: '🌵', position: { x: 1150, y: 600 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l31p1', position: { x: 600, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l31p2', position: { x: 800, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l31p3', position: { x: 1000, y: 550 }, width: 200, height: 20, health: 100 },
        { id: 'l31p4', position: { x: 1050, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l31p5', position: { x: 890, y: 320 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l31s3', position: { x: 940, y: 500 }, emoji: '🌲', fontSize: 250, health: 200 },
        { id: 'l31s4', position: { x: 450, y: 610 }, emoji: '🪴', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l31-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l31-wh-b' },
        { id: 'l31-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l31-wh-a' },
    ],
    blackHoles: [
        { id: 'l31-bh-1', position: { x: 640, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#588157', '#a3b18a', '#dad7cd']
    }
};
