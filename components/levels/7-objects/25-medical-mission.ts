import { Level } from '../../types';

export const level25: Level = {
    id: 25,
    name: 'Medical Mission',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '💊', position: { x: 700, y: 625 } },
        { type: 'brute', emoji: '🩺', position: { x: 850, y: 385 } },
        { type: 'flyer', emoji: '🩸', position: { x: 940, y: 150 } },
        { type: 'sparky', emoji: '💉', position: { x: 950, y: 250 } },
        { type: 'tank', emoji: '🩻', position: { x: 1100, y: 485 } },
        { type: 'grunt', emoji: '💊', position: { x: 1150, y: 625 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l25p1', position: { x: 650, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l25p2', position: { x: 800, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l25p3', position: { x: 1050, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l25p4', position: { x: 900, y: 270 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l25s1', position: { x: 940, y: 550 }, emoji: '🏥', fontSize: 250, health: 400 },
    ],
    wormholes: [
        { id: 'l25-wh-a', type: 'black', position: { x: 500, y: 100 }, radius: 30, pairId: 'l25-wh-b' },
        { id: 'l25-wh-b', type: 'white', position: { x: 1200, y: 100 }, radius: 30, pairId: 'l25-wh-a' },
    ],
    blackHoles: [
        { id: 'l25-bh-1', position: { x: 940, y: 350 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#e7f5ff', '#d0ebff', '#b9e0ff']
    }
};
