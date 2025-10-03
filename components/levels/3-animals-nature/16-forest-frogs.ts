import { Level } from '../../types';

export const level16: Level = {
    id: 16,
    name: "Forest Frogs",
    projectiles: 15,
    enemies: [
      { type: 'hopper', position: { x: 600, y: 530 }, emoji: '🐸' },
      { type: 'hopper', position: { x: 1000, y: 530 }, emoji: '🐸' },
      { type: 'hopper', position: { x: 800, y: 400 }, emoji: '🐸' },
      { type: 'hopper', position: { x: 1150, y: 400 }, emoji: '🐸' },
      { type: 'grunt', position: { x: 940, y: 280 }, emoji: '🍄' },
      { type: 'flyer', position: { x: 940, y: 100 }, emoji: '🍃' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l16p1', position: { x: 550, y: 550 }, width: 200, height: 20, health: 100 },
        { id: 'l16p2', position: { x: 950, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l16p3', position: { x: 750, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l16p4', position: { x: 1100, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l16p5', position: { x: 890, y: 300 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
      { id: 'l16s1', position: { x: 450, y: 550 }, emoji: '🌳', fontSize: 200, health: 200 },
      { id: 'l16s2', position: { x: 1200, y: 550 }, emoji: '🌲', fontSize: 200, health: 200 },
    ],
    wormholes: [
        { id: 'l16-wh-a', type: 'black', position: { x: 100, y: 400 }, radius: 30, pairId: 'l16-wh-b' },
        { id: 'l16-wh-b', type: 'white', position: { x: 1180, y: 200 }, radius: 30, pairId: 'l16-wh-a' },
    ],
    blackHoles: [
        { id: 'l16-bh-1', position: { x: 640, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#2d6a4f', '#40916c', '#52b788']
    }
};
