/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Corrected import paths for types and constants.
import { GameState } from './types-empirerts';
import { WORLD_WIDTH, WORLD_HEIGHT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from './constants-empirerts';

interface MinimapProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
}

const MINIMAP_WIDTH = 180;
const MINIMAP_HEIGHT = (MINIMAP_WIDTH / WORLD_WIDTH) * WORLD_HEIGHT;

const Minimap: React.FC<MinimapProps> = ({ gameState, dispatch }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const isDraggingRef = React.useRef(false);

    const scaleX = MINIMAP_WIDTH / WORLD_WIDTH;
    const scaleY = MINIMAP_HEIGHT / WORLD_HEIGHT;

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear and draw background
        ctx.fillStyle = 'rgba(0, 50, 0, 0.8)';
        ctx.fillRect(0, 0, MINIMAP_WIDTH, MINIMAP_HEIGHT);

        // Draw terrain
        gameState.terrain.forEach(t => {
            if (t.type === 'Mountain') ctx.fillStyle = '#6b6b6b';
            else if (t.type === 'Sand') ctx.fillStyle = '#e6d8a0'; // More yellowish sand
            else if (t.type === 'Cactus') {
                ctx.fillStyle = '#228B22'; // ForestGreen for cactus
                ctx.fillRect(t.x * scaleX, t.y * scaleY, 1, 1);
                return; // Don't draw an arc for small cacti
            } else return;

            ctx.beginPath();
            ctx.arc(t.x * scaleX, t.y * scaleY, t.radius * scaleX, 0, 2 * Math.PI);
            ctx.fill();
        });


        // Draw resource nodes
        gameState.resourceNodes.forEach(node => {
            if (node.type === 'Gold') ctx.fillStyle = 'yellow';
            else if (node.type === 'Wood') ctx.fillStyle = 'green';
            else if (node.type === 'Food') ctx.fillStyle = 'red';
            ctx.fillRect(node.x * scaleX, node.y * scaleY, 2, 2);
        });

        // Draw buildings
        gameState.buildings.forEach(building => {
            ctx.fillStyle = building.owner === 'PLAYER' ? 'green' : 'orange';
            ctx.fillRect(building.x * scaleX - 2, building.y * scaleY - 2, 4, 4);
        });

        // Draw units
        gameState.units.forEach(unit => {
            ctx.fillStyle = unit.owner === 'PLAYER' ? '#00bfff' : 'red'; // blue vs red
            ctx.beginPath();
            ctx.arc(unit.x * scaleX, unit.y * scaleY, 1.5, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw camera viewport
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            gameState.camera.x * scaleX,
            gameState.camera.y * scaleY,
            VIEWPORT_WIDTH * scaleX,
            VIEWPORT_HEIGHT * scaleY
        );
    }, [gameState, scaleX, scaleY]);

    const moveCamera = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const targetX = (x / MINIMAP_WIDTH) * WORLD_WIDTH - VIEWPORT_WIDTH / 2;
        const targetY = (y / MINIMAP_HEIGHT) * WORLD_HEIGHT - VIEWPORT_HEIGHT / 2;

        const clampedX = Math.max(0, Math.min(targetX, WORLD_WIDTH - VIEWPORT_WIDTH));
        const clampedY = Math.max(0, Math.min(targetY, WORLD_HEIGHT - VIEWPORT_HEIGHT));

        dispatch({ type: 'UPDATE_CAMERA', payload: { x: clampedX, y: clampedY } });
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        isDraggingRef.current = true;
        moveCamera(event);
    };
    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };
    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDraggingRef.current) {
            moveCamera(event);
        }
    };
    
    const handleMouseLeave = () => {
        isDraggingRef.current = false;
    };

    return (
        <canvas
            ref={canvasRef}
            width={MINIMAP_WIDTH}
            height={MINIMAP_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ border: '1px solid #555', cursor: 'pointer' }}
        />
    );
};

export default Minimap;