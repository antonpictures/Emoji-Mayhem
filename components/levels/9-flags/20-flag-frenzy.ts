import { Level } from '../../types';

export const level20: Level = {
    id: 20,
    name: 'Flag Frenzy',
    projectiles: 12,
    enemies: [
      { type: 'grunt', emoji: '🇺🇸', position: { x: 250, y: 525 } },
      { type: 'grunt', emoji: '🇨🇦', position: { x: 1050, y: 525 } },
      { type: 'hopper', emoji: '🇧🇷', position: { x: 640, y: 625 } },
      { type: 'brute', emoji: '🇬🇧', position: { x: 640, y: 310 } },
      { type: 'flyer', emoji: '🇯🇵', position: { x: 400, y: 150 } },
      { type: 'flyer', emoji: '🇩🇪', position: { x: 900, y: 150 } },
    ],
    platforms: [
      { id: 'l20p1', position: { x: 200, y: 550 }, width: 150, height: 20 },
      { id: 'l20p2', position: { x: 1000, y: 550 }, width: 150, height: 20 },
      { id: 'l20p3', position: { x: 500, y: 450 }, width: 300, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l20b1', position: { x: 500, y: 350 }, health: 100, width: 300, height: 20 },
    ],
    emojiStructures: [
        { id: 'l20s1', position: { x: 150, y: 600 }, emoji: '🏁', fontSize: 100 },
        { id: 'l20s2', position: { x: 1150, y: 600 }, emoji: '🎌', fontSize: 100 },
    ],
    theme: {
      sky: ['#e0f7fa', '#b2ebf2', '#80deea']
    }
};