import { Level } from '../../types';

export const level37: Level = {
    id: 37,
    name: "A Bug's Life",
    projectiles: 20,
    enemies: [
        { type: 'hopper', emoji: '🦗', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🐜', position: { x: 150, y: 525 } },
        { type: 'grunt', emoji: '🐛', position: { x: 300, y: 525 } },
        { type: 'flyer', emoji: '🐞', position: { x: 400, y: 200 } },
        { type: 'sparky', emoji: '🦟', position: { x: 640, y: 150 } },
        { type: 'brute', emoji: '🕷️', position: { x: 1050, y: 510 } },
        { type: 'tank', emoji: '🦂', position: { x: 950, y: 600 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l37b1', position: { x: 600, y: 620 }, health: 100, width: 80, height: 30 },
        { id: 'l37p1', position: { x: 100, y: 550 }, width: 250, height: 20, health: 100 },
        { id: 'l37p2', position: { x: 900, y: 550 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l37s1', position: { x: 640, y: 450 }, emoji: '🍄', fontSize: 250 },
        { id: 'l37s2', position: { x: 100, y: 400 }, emoji: '🌿', fontSize: 200 },
        { id: 'l37s3', position: { x: 1180, y: 400 }, emoji: '🍃', fontSize: 200 },
    ],
    theme: {
        sky: ['#74c69d', '#95d5b2', '#b7e4c7']
    }
};