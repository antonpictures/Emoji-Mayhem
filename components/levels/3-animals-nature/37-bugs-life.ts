// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level37: Level = {
    id: 37,
    name: "A Bug's Life",
    projectiles: 20,
    enemies: [
        { type: 'hopper', emoji: '🦗', position: { x: 600, y: 625 } },
        { type: 'grunt', emoji: '🐜', position: { x: 750, y: 500 } },
        { type: 'flyer', emoji: '🐞', position: { x: 900, y: 200 } },
        { type: 'sparky', emoji: '🦟', position: { x: 940, y: 150 } },
        { type: 'brute', emoji: '🕷️', position: { x: 1150, y: 485 } },
        { type: 'tank', emoji: '🦂', position: { x: 1000, y: 600 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l37p1', position: { x: 550, y: 520 }, width: 250, height: 20, health: 100 },
        { id: 'l37p2', position: { x: 1000, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l37b1', position: { x: 900, y: 590 }, health: 100, width: 80, height: 60 },
    ],
    emojiStructures: [
        { id: 'l37s1', position: { x: 940, y: 450 }, emoji: '🍄', fontSize: 250, health: 150 },
        { id: 'l37s2', position: { x: 400, y: 600 }, emoji: '🌱', fontSize: 100 },
    ],
    wormholes: [
        { id: 'l37-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l37-wh-b' },
        { id: 'l37-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l37-wh-a' },
    ],
    blackHoles: [
        { id: 'l37-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#74c69d', '#95d5b2', '#b7e4c7']
    }
};
