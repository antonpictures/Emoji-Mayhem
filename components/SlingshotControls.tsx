import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Vec2 } from '../types';
import { PLAYER_START_POS, SLINGSHOT_POWER_MULTIPLIER, MAX_SLINGSHOT_DRAG, PROJECTILE_RADIUS, WORLD_WIDTH, WORLD_HEIGHT } from '../constants';

interface SlingshotControlsProps {
  onFire: (velocity: Vec2) => void;
  isVisible: boolean;
}

const SlingshotControls: React.FC<SlingshotControlsProps> = ({ onFire, isVisible }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Vec2 | null>(null);
  const [dragEnd, setDragEnd] = useState<Vec2 | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const getSVGMousePos = useCallback((e: MouseEvent | React.MouseEvent): Vec2 => {
    const rect = controlsRef.current!.getBoundingClientRect();
    const svgAspectRatio = WORLD_WIDTH / WORLD_HEIGHT;
    const rectAspectRatio = rect.width / rect.height;
    
    let scale: number;
    let offsetX: number;
    let offsetY: number;
    
    if (svgAspectRatio > rectAspectRatio) {
      // SVG is wider, constrained by width, letterboxed top/bottom
      scale = rect.width / WORLD_WIDTH;
      offsetX = 0;
      offsetY = (rect.height - (WORLD_HEIGHT * scale)) / 2;
    } else {
      // SVG is taller or same ratio, constrained by height, letterboxed left/right
      scale = rect.height / WORLD_HEIGHT;
      offsetX = (rect.width - (WORLD_WIDTH * scale)) / 2;
      offsetY = 0;
    }
    
    const svgX = (e.clientX - rect.left - offsetX) / scale;
    const svgY = (e.clientY - rect.top - offsetY) / scale;
    return { x: svgX, y: svgY };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isVisible) return;
    e.preventDefault();
    setIsDragging(true);
    const pos = getSVGMousePos(e);
    setDragStart(pos);
    setDragEnd(pos);
  };

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !dragStart || !dragEnd) return;
    
    // Fire based on projectile position, not absolute drag
    const projectilePosX = PLAYER_START_POS.x - (dragStart.x - dragEnd.x);
    const projectilePosY = PLAYER_START_POS.y - (dragStart.y - dragEnd.y);

    const dx = PLAYER_START_POS.x - projectilePosX;
    const dy = PLAYER_START_POS.y - projectilePosY;
    
    const dist = Math.hypot(dx, dy);
    if (dist > 10) { // Minimum drag to fire
        onFire({
            x: dx * SLINGSHOT_POWER_MULTIPLIER,
            y: dy * SLINGSHOT_POWER_MULTIPLIER,
        });
    }

    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  }, [isDragging, dragStart, dragEnd, onFire]);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragStart) return;
    const currentPos = getSVGMousePos(e);
    
    const dx = currentPos.x - dragStart.x;
    const dy = currentPos.y - dragStart.y;
    let dist = Math.hypot(dx, dy);
    
    if (dist > MAX_SLINGSHOT_DRAG) {
        const angle = Math.atan2(dy, dx);
        setDragEnd({
            x: dragStart.x + Math.cos(angle) * MAX_SLINGSHOT_DRAG,
            y: dragStart.y + Math.sin(angle) * MAX_SLINGSHOT_DRAG
        });
    } else {
        setDragEnd(currentPos);
    }
  }, [isDragging, dragStart, getSVGMousePos]);

  useEffect(() => {
    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const renderTrajectory = () => {
    if (!isDragging || !dragStart || !dragEnd) return null;
    
    const projectilePosX = PLAYER_START_POS.x - (dragStart.x - dragEnd.x);
    const projectilePosY = PLAYER_START_POS.y - (dragStart.y - dragEnd.y);
    const dx = PLAYER_START_POS.x - projectilePosX;
    const dy = PLAYER_START_POS.y - projectilePosY;

    return (
        <line 
            x1={PLAYER_START_POS.x}
            y1={PLAYER_START_POS.y}
            x2={PLAYER_START_POS.x + dx}
            y2={PLAYER_START_POS.y + dy}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="3"
            strokeDasharray="5, 5"
        />
    );
  }
  
  const renderRubberBand = () => {
      if (!isDragging || !dragStart || !dragEnd) return null;
      const projectilePosX = PLAYER_START_POS.x - (dragStart.x - dragEnd.x);
      const projectilePosY = PLAYER_START_POS.y - (dragStart.y - dragEnd.y);
      
      return (
          <>
            <line x1={PLAYER_START_POS.x - 20} y1={PLAYER_START_POS.y-10} x2={projectilePosX} y2={projectilePosY} stroke="rgba(200, 150, 0, 0.8)" strokeWidth="4" />
            <line x1={PLAYER_START_POS.x + 20} y1={PLAYER_START_POS.y-10} x2={projectilePosX} y2={projectilePosY} stroke="rgba(200, 150, 0, 0.8)" strokeWidth="4" />
            <foreignObject x={projectilePosX - PROJECTILE_RADIUS} y={projectilePosY - PROJECTILE_RADIUS} width={PROJECTILE_RADIUS * 2} height={PROJECTILE_RADIUS * 2}>
                <div
                    className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold"
                    style={{ fontSize: `${PROJECTILE_RADIUS * 0.6}px` }}
                >
                    $MPS
                </div>
            </foreignObject>
          </>
      )
  }

  return (
    <div 
        ref={controlsRef}
        className="absolute inset-0 z-10"
        onMouseDown={handleMouseDown}
        style={{ touchAction: 'none' }}
    >
        <svg viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} className="absolute inset-0 w-full h-full pointer-events-none">
            {isVisible && renderTrajectory()}
            {isVisible && renderRubberBand()}
        </svg>
    </div>
  );
};

export default SlingshotControls;