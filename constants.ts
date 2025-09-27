// Fix: Create constants file to centralize game configuration values.
import { Vec2 } from './types';

export const WORLD_WIDTH = 1280;
export const WORLD_HEIGHT = 720;
export const GROUND_Y = 650;

export const PLAYER_START_POS: Vec2 = { x: WORLD_WIDTH / 2, y: GROUND_Y - 50 };
export const PLAYER_RADIUS = 35;
export const PLAYER_MAX_HEALTH = 100;

export const PROJECTILE_RADIUS = 15;
export const SLINGSHOT_POWER_MULTIPLIER = 0.2;
export const MAX_SLINGSHOT_DRAG = 200;

export const GRAVITY: Vec2 = { x: 0, y: 0.3 };