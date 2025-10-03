/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Corrected import path for UnitType.
import { UnitType } from "./types-empirerts";

// This file defines the structure for composite units created in the Emoji Unit Designer.
// These units are composed of multiple emoji layers.

export interface CompositeUnitLayer {
    // Either a single emoji string for all variants...
    emoji?: string;
    // ...or different emojis for male/female variants.
    variants?: { male: string; female: string };
    // Relative size of the emoji layer. 1 is default.
    size: number;
    // X offset from the unit's center.
    x: number;
    // Y offset from the unit's center.
    y: number;
}

export interface CompositeUnitDefinition {
    // The icon used in the UI for this unit.
    icon: string;
    // The layers that make up the unit's appearance.
    layers: CompositeUnitLayer[];
}

// A library of pre-defined composite units.
// Users can add their own creations from the designer here.
export const COMPOSITE_UNIT_LIBRARY: Partial<Record<UnitType, CompositeUnitDefinition>> = {
    // Example presets from the designer can be pasted here.
    // e.g.
    // Knight: {
    //   icon: '🛡️',
    //   layers: [
    //     { variants: { male: '🧑', female: '👩' }, size: 2.33, x: 0, y: 0 },
    //     { emoji: '🛡️', size: 1.5, x: -1.67, y: 0 },
    //     { emoji: '⚔️', size: 1.67, x: 1.67, y: -0.33 },
    //   ],
    // },
};