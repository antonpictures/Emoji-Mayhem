// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level38: Level = {
    id: 38,
    name: "Santa's Workshop Chaos",
    projectiles: 15,
    enemies: [
        { type: 'tank', emoji: '🎅', position: { x: 1050, y: 300 } },
        { type: 'brute', emoji: '🤶', position: { x: 1150, y: 610 } },
        { type: 'grunt', emoji: '🧝', position: { x: 750, y: 625 } },
        { type: 'grunt', emoji: '🧝‍♀️', position: { x: 950, y: 500 } },
        { type: 'hopper', emoji: '🦌', position: { x: 550, y: 625 } },
        { type: 'grunt', emoji: '🎁', position: { x: 900, y: 400 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l38b3', position: { x: 850, y: 420 }, health: 100, width: 200, height: 20 },
        { id: 'l38b4', position: { x: 840, y: 440 }, health: 100, width: 20, height: 210 },
        { id: 'l38p1', position: { x: 1000, y: 320 }, width: 150, height: 20, health: 100 },
        { id: 'l38p2', position: { x: 900, y: 520 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l38s1', position: { x: 940, y: 500 }, emoji: '🎄', fontSize: 400, health: 250 },
        { id: 'l38s2', position: { x: 1200, y: 150 }, emoji: '🌟', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l38-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l38-wh-b' },
        { id: 'l38-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l38-wh-a' },
    ],
    blackHoles: [
        { id: 'l38-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#000030', '#000045', '#101055']
    }
};
