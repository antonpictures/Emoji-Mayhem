// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

const rainbowHealth = 20;
const rainbowEmojis = [];
const center = { x: 900, y: 600 };
const size = 25;
const colors = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪'];

for (let i = 0; i < colors.length; i++) {
    const radius = 250 - i * size;
    for (let angle = 200; angle < 340; angle += 10) {
        const rad = angle * (Math.PI / 180);
        rainbowEmojis.push({
            id: `l40-r-${i}-${angle}`,
            position: {
                x: center.x + Math.cos(rad) * radius,
                y: center.y + Math.sin(rad) * radius
            },
            emoji: colors[i],
            fontSize: size,
            health: rainbowHealth
        });
    }
}

export const level40: Level = {
    id: 40,
    name: "Leprechaun's Gold Rush",
    projectiles: 18,
    enemies: [
        { type: 'tank', emoji: '💰', position: { x: 1150, y: 600 } },
        { type: 'hopper', emoji: '🧝‍♂️', position: { x: 950, y: 500 } },
        { type: 'hopper', emoji: '🧝‍♂️', position: { x: 1150, y: 500 } },
        { type: 'brute', emoji: '🍺', position: { x: 700, y: 610 } },
        { type: 'grunt', emoji: '☘️', position: { x: 850, y: 400 } },
        { type: 'flyer', emoji: '🌟', position: { x: 940, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l40p1', position: { x: 650, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l40p2', position: { x: 800, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l40p4', position: { x: 900, y: 520 }, width: 300, height: 20, health: 100 },
    ],
    emojiStructures: [
        ...rainbowEmojis,
    ],
    wormholes: [
        { id: 'l40-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l40-wh-b' },
        { id: 'l40-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l40-wh-a' },
    ],
    blackHoles: [
        { id: 'l40-bh-1', position: { x: 640, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#6a994e', '#a7c957', '#f2e8cf']
    }
};