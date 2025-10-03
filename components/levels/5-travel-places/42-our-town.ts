import { Level } from '../../types';

export const level42: Level = {
    id: 42,
    name: "Our Town",
    projectiles: 20,
    enemies: [
        { type: 'grunt', emoji: '🏠', position: { x: 600, y: 625 } },
        { type: 'grunt', emoji: '🏡', position: { x: 900, y: 500 } },
        { type: 'brute', emoji: '🏢', position: { x: 940, y: 185 } },
        { type: 'brute', emoji: '🏫', position: { x: 1150, y: 405 } },
        { type: 'grunt', emoji: '🏥', position: { x: 1050, y: 625 } },
        { type: 'tank', emoji: '🏦', position: { x: 1200, y: 600 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l42b1', position: { x: 900, y: 220 }, health: 150, width: 80, height: 430 },
        { id: 'l42b2', position: { x: 1100, y: 440 }, health: 100, width: 20, height: 210 },
        { id: 'l42p2', position: { x: 700, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l42p3', position: { x: 1050, y: 420 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l42s1', position: { x: 750, y: 500 }, emoji: '🏘️', fontSize: 250, health: 300 },
    ],
    wormholes: [
        { id: 'l42-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l42-wh-b' },
        { id: 'l42-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l42-wh-a' },
    ],
    blackHoles: [
        { id: 'l42-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#87CEEB', '#B0E0E6', '#ADD8E6']
    }
};
