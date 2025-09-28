import { Level } from '../../types';

export const level9: Level = {
    id: 9,
    name: 'Robot Uprising',
    projectiles: 10,
    enemies: [
        { type: 'tank', emoji: '🛡️', position: {x: 950, y: 500} },
        { type: 'grunt', emoji: '⚙️', position: {x: 900, y: 425} },
        { type: 'grunt', emoji: '🔧', position: {x: 1000, y: 425} },
        { type: 'flyer', emoji: '🛸', position: {x: 400, y: 200} },
        { type: 'sparky', emoji: '⚡', position: {x: 640, y: 300} },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l9b1', position: {x: 850, y: 400}, width: 200, height: 20, health: 100},
        { id: 'l9b2', position: {x: 850, y: 420}, width: 20, height: 150, health: 100},
        { id: 'l9b3', position: {x: 1030, y: 420}, width: 20, height: 150, health: 100},
        { id: 'l9p1', position: {x: 900, y: 550}, width: 100, height: 20, health: 100},
    ],
    emojiStructures: [
        {id: 'l9s1', position: { x: 200, y: 600 }, emoji: '🏭', fontSize: 150 },
    ],
    theme: {
        sky: ['#495057', '#6c757d', '#adb5bd']
    }
};