// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

const pineappleHealth = 20;
const pineappleEmojis = [];
const pineappleBaseX = 600;
const pineappleBaseY = 580;
const pineappleSize = 40;
// Pineapple body
for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
        pineappleEmojis.push({
            id: `l34s-p-body-${row}-${col}`,
            position: { x: pineappleBaseX + col * pineappleSize, y: pineappleBaseY - row * pineappleSize },
            emoji: '🟨',
            fontSize: pineappleSize,
            health: pineappleHealth
        });
    }
}
// Pineapple leaves
pineappleEmojis.push({ id: `l34s-p-leaf1`, position: { x: pineappleBaseX + 2 * pineappleSize, y: pineappleBaseY - 5 * pineappleSize }, emoji: '🟩', fontSize: pineappleSize * 2, health: pineappleHealth });
pineappleEmojis.push({ id: `l34s-p-leaf2`, position: { x: pineappleBaseX + 1 * pineappleSize, y: pineappleBaseY - 5.5 * pineappleSize }, emoji: '🟩', fontSize: pineappleSize * 1.5, health: pineappleHealth });
pineappleEmojis.push({ id: `l34s-p-leaf3`, position: { x: pineappleBaseX + 3 * pineappleSize, y: pineappleBaseY - 5.5 * pineappleSize }, emoji: '🟩', fontSize: pineappleSize * 1.5, health: pineappleHealth });


const moaiHealth = 40;
const moaiEmojis = [];
const moaiBaseX = 1100;
const moaiBaseY = 600;
const moaiSize = 35;
// Moai body
for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
        moaiEmojis.push({
            id: `l34s-m-body-${row}-${col}`,
            position: { x: moaiBaseX + col * moaiSize, y: moaiBaseY - row * moaiSize },
            emoji: '🟦',
            fontSize: moaiSize,
            health: moaiHealth
        });
    }
}
// Moai details
moaiEmojis.push({ id: `l34s-m-door`, position: { x: moaiBaseX + 1.5 * moaiSize, y: moaiBaseY - 0.5 * moaiSize }, emoji: '🟫', fontSize: moaiSize * 2, health: moaiHealth });
moaiEmojis.push({ id: `l34s-m-nose`, position: { x: moaiBaseX + 1.5 * moaiSize, y: moaiBaseY - 3.5 * moaiSize }, emoji: '🟦', fontSize: moaiSize * 2, health: moaiHealth });
moaiEmojis.push({ id: `l34s-m-eye1`, position: { x: moaiBaseX + 0.5 * moaiSize, y: moaiBaseY - 5 * moaiSize }, emoji: '⬜', fontSize: moaiSize, health: moaiHealth });
moaiEmojis.push({ id: `l34s-m-eye2`, position: { x: moaiBaseX + 2.5 * moaiSize, y: moaiBaseY - 5 * moaiSize }, emoji: '⬜', fontSize: moaiSize, health: moaiHealth });

export const level34: Level = {
    id: 34,
    name: 'Bikini Bottom Blast',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '🧽', position: { x: 700, y: 300 } },
        { type: 'brute', emoji: '⭐', position: { x: 1150, y: 610 } },
        { type: 'hopper', emoji: '🐌', position: { x: 650, y: 625 } },
        { type: 'sparky', emoji: '🦠', position: { x: 800, y: 250 } },
        { type: 'grunt', emoji: '🍔', position: { x: 900, y: 400 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l34b1', position: { x: 850, y: 500 }, health: 100, width: 150, height: 110 },
        { id: 'l34p1', position: { x: 650, y: 320 }, width: 100, height: 20, health: 100 },
        { id: 'l34p2', position: { x: 850, y: 420 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        ...pineappleEmojis,
        ...moaiEmojis,
        { id: 'l34s3', position: { x: 450, y: 610 }, emoji: '🌊', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l34-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l34-wh-b' },
        { id: 'l34-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l34-wh-a' },
    ],
    blackHoles: [
        { id: 'l34-bh-1', position: { x: 940, y: 150 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#48cae4', '#ade8f4', '#90e0ef']
    }
};