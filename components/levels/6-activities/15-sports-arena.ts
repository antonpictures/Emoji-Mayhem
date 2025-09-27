import { Level } from '../../types';

export const level15: Level = {
    id: 15,
    name: 'Sports Arena',
    projectiles: 12,
    enemies: [
        { type: 'hopper', emoji: '🏀', position: {x: 300, y: 625} },
        { type: 'hopper', emoji: '⚽', position: {x: 500, y: 625} },
        { type: 'hopper', emoji: '🏈', position: {x: 800, y: 625} },
        { type: 'hopper', emoji: '⚾', position: {x: 1000, y: 625} }
    ],
    theme: {
        sky: ['#60d394', '#aaf683', '#eeef20']
    }
};
