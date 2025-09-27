// Fix: Added level data definitions.
import { Level } from '../types';
import { WORLD_WIDTH, GROUND_Y } from '../constants';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "The Beginning",
    projectiles: 5,
    enemies: [
      { type: 'grunt', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 25 } },
    ],
  },
  {
    id: 2,
    name: "Tower of Grunts",
    projectiles: 6,
    enemies: [
      { type: 'grunt', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 25 } },
      { type: 'grunt', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 80 } },
    ],
  },
  {
    id: 3,
    name: "The Brute",
    projectiles: 4,
    enemies: [
      { type: 'brute', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - 40 } },
    ],
  },
    {
    id: 4,
    name: "Flying Menace",
    projectiles: 5,
    enemies: [
      { type: 'flyer', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 200 } },
      { type: 'grunt', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 25 } },
    ],
  },
  {
    id: 5,
    name: "Fortress",
    projectiles: 8,
    enemies: [
      { type: 'grunt', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 25 } },
      { type: 'grunt', position: { x: WORLD_WIDTH - 280, y: GROUND_Y - 25 } },
      { type: 'brute', position: { x: WORLD_WIDTH - 240, y: GROUND_Y - 90 } },
    ],
  },
  {
    id: 6,
    name: "Air and Ground",
    projectiles: 7,
    enemies: [
        { type: 'flyer', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 250 } },
        { type: 'brute', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - 40 } },
    ]
  },
  {
      id: 7,
      name: "The Swarm",
      projectiles: 10,
      enemies: [
        { type: 'flyer', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 200 } },
        { type: 'flyer', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 250 } },
        { type: 'flyer', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 200 } },
      ]
  },
  {
      id: 8,
      name: "The Wall",
      projectiles: 10,
      enemies: [
          { type: 'brute', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 40 } },
          { type: 'brute', position: { x: WORLD_WIDTH - 320, y: GROUND_Y - 40 } },
          { type: 'grunt', position: { x: WORLD_WIDTH - 260, y: GROUND_Y - 130 } },
      ]
  },
  {
      id: 9,
      name: "Precision Shot",
      projectiles: 3,
      enemies: [
        { type: 'grunt', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - 25 } },
      ]
  },
  {
      id: 10,
      name: "Final Stand",
      projectiles: 12,
      enemies: [
          { type: 'brute', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 40 } },
          { type: 'flyer', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 200 } },
          { type: 'grunt', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 25 } },
          { type: 'grunt', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 80 } },
          { type: 'brute', position: { x: WORLD_WIDTH - 550, y: GROUND_Y - 40 } },
      ]
  }
];
