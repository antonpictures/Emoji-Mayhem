/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { FunctionDeclaration, Type } from "@google/genai";
// FIX: Corrected import path for GameState.
import { GameState } from "./types-empirerts";

const selectObjectDeclaration: FunctionDeclaration = {
    name: 'select_object',
    description: 'Select a friendly unit or building by type, or select all units. The game will select the first available object of that type.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            object_type: {
                type: Type.STRING,
                description: 'The type of object to select (e.g., "Villager", "TownHall", "all units").',
            },
        },
        required: ['object_type'],
    }
};

const commandUnitDeclaration: FunctionDeclaration = {
    name: 'command_unit',
    description: 'Command the currently selected unit(s) to perform an action. For attacking or gathering, the game will auto-select the nearest valid target.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            action: {
                type: Type.STRING,
                description: 'The action to perform (e.g., "attack", "gather").',
            },
        },
        required: ['action'],
    }
};

const trainUnitDeclaration: FunctionDeclaration = {
    name: 'train_unit',
    description: 'Command the currently selected building to train a new unit.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            unit_type: {
                type: Type.STRING,
                description: 'The type of unit to train (e.g., "Villager", "Swordsman").',
            },
        },
        required: ['unit_type'],
    }
};

const buildHouseDeclaration: FunctionDeclaration = {
    name: 'build_house',
    description: 'Command a selected Villager to build a house at a random nearby location.',
     parameters: { type: Type.OBJECT, properties: {} }
};

const advanceAgeDeclaration: FunctionDeclaration = {
    name: 'advance_age',
    description: 'Command the TownHall to begin researching the next Age.',
    parameters: { type: Type.OBJECT, properties: {} }
};


export const generateDeclarations = (gameState: GameState) => {
    const declarations = [
        selectObjectDeclaration,
        commandUnitDeclaration,
        trainUnitDeclaration,
        buildHouseDeclaration,
        advanceAgeDeclaration
    ];

    const { players, units, buildings } = gameState;
    const playerState = players.PLAYER;
    const playerUnits = units.filter(u => u.owner === 'PLAYER');
    const playerBuildings = buildings.filter(b => b.owner === 'PLAYER' && b.buildProgress === 100);

    let contextPrompt = `
        Current Age: ${playerState.currentAge}.
        Current Resources: Wood: ${playerState.resources.Wood}, Food: ${playerState.resources.Food}, Gold: ${playerState.resources.Gold}.
        Current Units: ${playerUnits.map(u => u.type).join(', ') || 'None'}.
        Current Buildings: ${playerBuildings.map(b => b.type).join(', ') || 'None'}.
        Available units to train: Villager, Swordsman, Archer (check age and building requirements).
        Available buildings to build: House, Barracks, Granary, StoragePit (check age requirements).
    `;

    const initialPrompt = "The game has started. I am the spirit of your empire. What is your first command?";

    return { declarations, contextPrompt, initialPrompt };
};

export const getSystemInstruction = (context: string) => `
You are an AI assistant and narrator for a Real-Time Strategy game. You can control the player's units and buildings.
Your goal is to guide the player to victory by destroying the enemy.
You will be given the current game state context. Use it to make decisions and respond to commands.
Only use the provided functions to act.
Be proactive. If the player is idle, suggest an action. Your voice should be epic and wise.
Current game state:
${context}
`;