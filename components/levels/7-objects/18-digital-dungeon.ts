import { Level } from '../../types';

export const level18: Level = {
    id: 18,
    name: 'Digital Dungeon',
    projectiles: 15,
    enemies: [
      { type: 'grunt', emoji: '💾', position: { x: 200, y: 525 } },
      { type: 'grunt', emoji: '💿', position: { x: 280, y: 525 } },
      { type: 'hopper', emoji: '🖱️', position: { x: 400, y: 625 } },
      { type: 'brute', emoji: '⌨️', position: { x: 500, y: 410 } },
      { type: 'tank', emoji: '🔋', position: { x: 800, y: 600 } },
      { type: 'sparky', emoji: '🔌', position: { x: 1000, y: 300 } },
      { type: 'brute', emoji: '🖨️', position: { x: 1100, y: 500 } },
      { type: 'grunt', emoji: '💽', position: { x: 900, y: 425 } },
    ],
    platforms: [
      { id: 'l18p1', position: { x: 150, y: 550 }, width: 200, height: 20 },
      { id: 'l18p2', position: { x: 450, y: 450 }, width: 200, height: 20 },
      { id: 'l18p3', position: { x: 1050, y: 550 }, width: 150, height: 20 },
      { id: 'l18p4', position: { x: 850, y: 450 }, width: 150, height: 20 },
    ],
    emojiStructures: [
        { id: 'l18s1', position: { x: 300, y: 300 }, emoji: '💻', fontSize: 200 },
        { id: 'l18s2', position: { x: 1000, y: 550 }, emoji: '🖥️', fontSize: 200 },
    ],
    theme: {
      sky: ['#0d1b2a', '#1b263b', '#415a77']
    }
};