import { Level } from '../../types';

export const level16: Level = {
    id: 16,
    name: "Forest Frogs",
    projectiles: 15,
    enemies: [
      { type: 'hopper', position: { x: 200, y: 625 }, emoji: '🐸' },
      { type: 'hopper', position: { x: 1000, y: 625 }, emoji: '🐸' },
      { type: 'hopper', position: { x: 400, y: 425 }, emoji: '🐸' },
      { type: 'hopper', position: { x: 800, y: 425 }, emoji: '🐸' },
      { type: 'grunt', position: { x: 640, y: 300 }, emoji: '🍄' },
      { type: 'grunt', position: { x: 100, y: 325 }, emoji: '🌱' },
      { type: 'grunt', position: { x: 1180, y: 325 }, emoji: '🌿' },
      { type: 'grunt', position: { x: 500, y: 225 }, emoji: '🍁' },
      { type: 'grunt', position: { x: 780, y: 225 }, emoji: '🍂' },
      { type: 'flyer', position: { x: 640, y: 100 }, emoji: '🍃' },
    ],
    platforms: [
      { id: 'l16p1', position: { x: 150, y: 550 }, width: 150, height: 20 },
      { id: 'l16p2', position: { x: 950, y: 550 }, width: 150, height: 20 },
      { id: 'l16p3', position: { x: 350, y: 450 }, width: 100, height: 20 },
      { id: 'l16p4', position: { x: 750, y: 450 }, width: 100, height: 20 },
      { id: 'l16p5', position: { x: 590, y: 330 }, width: 100, height: 20 },
      { id: 'l16p6', position: { x: 50, y: 350 }, width: 100, height: 20 },
      { id: 'l16p7', position: { x: 1130, y: 350 }, width: 100, height: 20 },
    ],
    emojiStructures: [
      { id: 'l16s1', position: { x: 100, y: 550 }, emoji: '🌳', fontSize: 200 },
      { id: 'l16s2', position: { x: 1180, y: 550 }, emoji: '🌲', fontSize: 200 },
    ],
    theme: {
      sky: ['#2d6a4f', '#40916c', '#52b788']
    }
};
