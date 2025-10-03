// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level28: Level = {
    id: 28,
    name: 'World Tour',
    projectiles: 20,
    enemies: [
        { type: 'grunt', emoji: '🗽', position: { x: 600, y: 625 } },
        { type: 'grunt', emoji: '🗼', position: { x: 900, y: 500 } },
        { type: 'brute', emoji: '🏛️', position: { x: 850, y: 385 } },
        { type: 'brute', emoji: '🌋', position: { x: 1200, y: 610 } },
        { type: 'tank', emoji: '🏔️', position: { x: 1050, y: 465 } },
        { type: 'flyer', emoji: '✈️', position: { x: 940, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l28p1', position: { x: 850, y: 520 }, width: 100, height: 20, health: 100 },
        { id: 'l28p2', position: { x: 700, y: 420 }, width: 200, height: 20, health: 100 },
        { id: 'l28p3', position: { x: 1000, y: 500 }, width: 250, height: 20, health: 100 },
        { id: 'l28p4', position: { x: 1050, y: 400 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l28s1', position: { x: 940, y: 400 }, emoji: '🗺️', fontSize: 250, health: 200 },
    ],
    wormholes: [
        { id: 'l28-wh-a', type: 'black', position: { x: 100, y: 300 }, radius: 30, pairId: 'l28-wh-b' },
        { id: 'l28-wh-b', type: 'white', position: { x: 1180, y: 300 }, radius: 30, pairId: 'l28-wh-a' },
    ],
    blackHoles: [
        { id: 'l28-bh-1', position: { x: 640, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#87CEEB', '#AED9E0', '#B8E2E8']
    }
};
