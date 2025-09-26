
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Vec2 } from '../types';
import { PLAYER_START_POS, SLINGSHOT_POWER_MULTIPLIER, MAX_SLINGSHOT_DRAG, PROJECTILE_RADIUS } from '../constants';

interface SlingshotControlsProps {
  onFire: (velocity: Vec2) => void;
  isVisible: boolean;
}

const SlingshotControls: React.FC<SlingshotControlsProps> = ({ onFire, isVisible }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Vec2 | null>(null);
  const [dragEnd, setDragEnd] = useState<Vec2 | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const getRelativeMousePos = useCallback((e: MouseEvent | React.MouseEvent): Vec2 => {
    const rect = controlsRef.current!.getBoundingClientRect();
    const scaleX = controlsRef.current!.offsetWidth / rect.width;
    const scaleY = controlsRef.current!.offsetHeight / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isVisible) return;
    e.preventDefault();
    setIsDragging(true);
    const pos = getRelativeMousePos(e);
    setDragStart(pos);
    setDragEnd(pos);
  };

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !dragStart || !dragEnd) return;
    
    const dx = dragStart.x - dragEnd.x;
    const dy = dragStart.y - dragEnd.y;
    
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
    const currentPos = getRelativeMousePos(e);
    
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
  }, [isDragging, dragStart, getRelativeMousePos]);

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
    
    const dx = dragStart.x - dragEnd.x;
    const dy = dragStart.y - dragEnd.y;

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
            <circle cx={projectilePosX} cy={projectilePosY} r={PROJECTILE_RADIUS} fill="yellow" />
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
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {isVisible && renderTrajectory()}
            {isVisible && renderRubberBand()}
        </svg>
    </div>
  );
};

export default SlingshotControls;
