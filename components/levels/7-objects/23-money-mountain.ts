// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level23: Level = {
    id: 23,
    name: 'Money Mountain',
    projectiles: 16,
    enemies: [
        { type: 'hopper', emoji: '🪙', position: { x: 700, y: 500 } },
        { type: 'brute', emoji: '💰', position: { x: 940, y: 610 } },
        { type: 'flyer', emoji: '💸', position: { x: 940, y: 150 } },
        { type: 'grunt', emoji: '💵', position: { x: 1100, y: 625 } },
        { type: 'tank', emoji: '💳', position: { x: 1140, y: 485 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l23b1', position: { x: 900, y: 540 }, health: 150, width: 20, height: 110 },
        { id: 'l23b2', position: { x: 1180, y: 540 }, health: 150, width: 20, height: 110 },
        { id: 'l23p1', position: { x: 650, y: 520 }, width: 100, height: 20, health: 100 },
        { id: 'l23p3', position: { x: 900, y: 520 }, width: 300, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l23s1', position: { x: 900, y: 300 }, emoji: '💹', fontSize: 250, health: 100 },
    ],
    wormholes: [
        { id: 'l23-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l23-wh-b' },
        { id: 'l23-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l23-wh-a' },
    ],
    blackHoles: [
        { id: 'l23-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#386641', '#6a994e', '#a7c957']
    }
};
