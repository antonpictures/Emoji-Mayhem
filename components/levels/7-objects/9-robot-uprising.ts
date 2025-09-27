import { Level } from '../../types';

export const level9: Level = {
    id: 9,
    name: 'Robot Uprising',
    projectiles: 10,
    enemies: [
        { type: 'tank', emoji: '🛡️', position: {x: 800, y: 600} },
        { type: 'grunt', emoji: '⚙️', position: {x: 750, y: 525} },
        { type: 'grunt', emoji: '🔧', position: {x: 850, y: 525} },
        { type: 'flyer', emoji: '🛸', position: {x: 400, y: 300} }
    ],
    theme: {
        sky: ['#495057', '#6c757d', '#adb5bd']
    }
};
