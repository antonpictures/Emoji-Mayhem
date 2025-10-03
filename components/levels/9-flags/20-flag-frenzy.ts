// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level20: Level = {
    id: 20,
    name: 'Flag Frenzy',
    projectiles: 12,
    enemies: [
      { type: 'grunt', emoji: '🇺🇸', position: { x: 750, y: 500 } },
      { type: 'grunt', emoji: '🇨🇦', position: { x: 1100, y: 500 } },
      { type: 'hopper', emoji: '🇧🇷', position: { x: 940, y: 625 } },
      { type: 'brute', emoji: '🇬🇧', position: { x: 940, y: 285 } },
      { type: 'flyer', emoji: '🇯🇵', position: { x: 700, y: 150 } },
      { type: 'flyer', emoji: '🇩🇪', position: { x: 1180, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l20b1', position: { x: 700, y: 320 }, health: 100, width: 500, height: 20 },
        { id: 'l20p1', position: { x: 700, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l20p2', position: { x: 1050, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l20p3', position: { x: 800, y: 420 }, width: 300, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l20s1', position: { x: 550, y: 600 }, emoji: '🏁', fontSize: 100 },
        { id: 'l20s2', position: { x: 1200, y: 600 }, emoji: '🎌', fontSize: 100 },
    ],
    wormholes: [
        { id: 'l20-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l20-wh-b' },
        { id: 'l20-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l20-wh-a' },
    ],
    blackHoles: [
        { id: 'l20-bh-1', position: { x: 640, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#e0f7fa', '#b2ebf2', '#80deea']
    }
};
