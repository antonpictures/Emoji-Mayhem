import { Level } from '../../types';

export const level8: Level = {
    id: 8,
    name: 'Candy Crush',
    projectiles: 12,
    enemies: [
        { type: 'grunt', emoji: '🍭', position: {x: 300, y: 625} },
        { type: 'grunt', emoji: '🍬', position: {x: 300, y: 525} },
        { type: 'grunt', emoji: '🍩', position: {x: 300, y: 425} },
        { type: 'brute', emoji: '🎂', position: {x: 980, y: 610} },
        { type: 'grunt', emoji: '🍪', position: {x: 980, y: 525} },
        { type: 'grunt', emoji: '🍫', position: {x: 980, y: 425} }
    ],
    breakableBlocks: [
      {id: 'l8b1', position: {x: 250, y: 570}, width: 100, height: 20, health: 50},
      {id: 'l8b2', position: {x: 250, y: 470}, width: 100, height: 20, health: 50},
      {id: 'l8b3', position: {x: 930, y: 570}, width: 100, height: 20, health: 50},
      {id: 'l8b4', position: {x: 930, y: 470}, width: 100, height: 20, health: 50},
    ],
    theme: {
        sky: ['#ffafcc', '#bde0fe', '#a2d2ff']
    }
};