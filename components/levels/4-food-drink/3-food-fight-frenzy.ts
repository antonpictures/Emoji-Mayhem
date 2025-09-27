import { Level } from '../../types';

export const level3: Level = {
    id: 3,
    name: "Food Fight Frenzy",
    projectiles: 18,
    enemies: [
        { type: 'grunt', position: { x: 200, y: 625 }, emoji: '🍕' },
        { type: 'grunt', position: { x: 250, y: 625 }, emoji: '🍔' },
        { type: 'grunt', position: { x: 1000, y: 625 }, emoji: '🍣' },
        { type: 'grunt', position: { x: 1050, y: 625 }, emoji: '🍝' },
        { type: 'grunt', position: { x: 300, y: 450 }, emoji: '🍺' },
        { type: 'brute', position: { x: 950, y: 450 }, emoji: '🍷' },
        { type: 'flyer', position: { x: 640, y: 150 }, emoji: '☕' },
        { type: 'grunt', position: { x: 400, y: 300 }, emoji: '🍭' },
        { type: 'brute', position: { x: 850, y: 300 }, emoji: '🍰' },
        { type: 'grunt', position: { x: 150, y: 250 }, emoji: '🍩' },
        { type: 'grunt', position: { x: 1100, y: 250 }, emoji: '🍏' },
        { type: 'grunt', position: { x: 250, y: 150 }, emoji: '🍌' },
        { type: 'grunt', position: { x: 1000, y: 150 }, emoji: '🍓' },
        { type: 'grunt', position: { x: 800, y: 500 }, emoji: '🍍' },
        { type: 'grunt', position: { x: 450, y: 500 }, emoji: '🥕' },
        { type: 'grunt', position: { x: 100, y: 550 }, emoji: '🥦' },
        { type: 'grunt', position: { x: 1150, y: 550 }, emoji: '🌽' },
    ],
    platforms: [
        { id: 'l3p1', position: { x: 150, y: 580 }, width: 200, height: 20 },
        { id: 'l3p2', position: { x: 950, y: 580 }, width: 200, height: 20 },
        { id: 'l3p3', position: { x: 250, y: 480 }, width: 100, height: 20 },
        { id: 'l3p4', position: { x: 900, y: 480 }, width: 100, height: 20 },
        { id: 'l3p5', position: { x: 350, y: 330 }, width: 150, height: 20 },
        { id: 'l3p6', position: { x: 800, y: 330 }, width: 150, height: 20 },
        { id: 'l3p7', position: { x: 100, y: 280 }, width: 100, height: 20 },
        { id: 'l3p8', position: { x: 1050, y: 280 }, width: 100, height: 20 },
    ],
    theme: {
        sky: ['#ffecd2', '#fcb69f', '#ffc3a0']
    }
};
