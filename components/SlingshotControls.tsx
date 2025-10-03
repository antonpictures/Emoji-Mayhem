import React, { useState, useRef, useEffect, useCallback } from 'react';
// Fix: Corrected import path for types.
import { PokemonType, Vec2 } from '../types';
import { SLINGSHOT_POWER_MULTIPLIER, MAX_SLINGSHOT_DRAG, PROJECTILE_RADIUS, WORLD_WIDTH, WORLD_HEIGHT } from '../constants';
// Fix: Corrected import path for TYPE_EMOJI_MAP.
import { TYPE_EMOJI_MAP } from './projectile-data';

interface SlingshotControlsProps {
  slingshotOrigin: Vec2;
  onFire: (velocity: Vec2) => void;
  onDrag: (offset: Vec2) => void;
  selectedProjectileType: PokemonType;
  onDragStateChange: (isDragging: boolean) => void;
}

const SlingshotControls: React.FC<SlingshotControlsProps> = ({ slingshotOrigin, onFire, onDrag, selectedProjectileType, onDragStateChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Vec2 | null>(null);
  const [dragEnd, setDragEnd] = useState<Vec2 | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const getEventCoords = (e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent): Vec2 | null => {
      if ('touches' in e) {
          const touchEvent = e as { touches: TouchList };
          if (touchEvent.touches.length > 0) return { x: touchEvent.touches[0].clientX, y: touchEvent.touches[0].clientY };
      } else if ('changedTouches' in e) { 
          const touchEvent = e as { changedTouches: TouchList };
          if (touchEvent.changedTouches.length > 0) return { x: touchEvent.changedTouches[0].clientX, y: touchEvent.changedTouches[0].clientY };
      } else if ('clientX' in e) {
          const mouseEvent = e as { clientX: number, clientY: number };
          return { x: mouseEvent.clientX, y: mouseEvent.clientY };
      }
      return null;
  };

  const getSVGPosFromEvent = useCallback((e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent): Vec2 => {
    const rect = controlsRef.current!.getBoundingClientRect();
    const eventCoords = getEventCoords(e);
    if (!eventCoords) return { x: 0, y: 0 };

    const svgAspectRatio = WORLD_WIDTH / WORLD_HEIGHT;
    const rectAspectRatio = rect.width / rect.height;
    
    let scale: number, offsetX: number, offsetY: number;
    
    if (svgAspectRatio > rectAspectRatio) {
      scale = rect.width / WORLD_WIDTH;
      offsetX = 0;
      offsetY = (rect.height - (WORLD_HEIGHT * scale)) / 2;
    } else {
      scale = rect.height / WORLD_HEIGHT;
      offsetX = (rect.width - (WORLD_WIDTH * scale)) / 2;
      offsetY = 0;
    }
    
    const svgX = (eventCoords.x - rect.left - offsetX) / scale;
    const svgY = (eventCoords.y - rect.top - offsetY) / scale;
    return { x: svgX, y: svgY };
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrag({ x: 0, y: 0 });
    setIsDragging(true);
    onDragStateChange(true);
    setDragStart(slingshotOrigin);
    setDragEnd(slingshotOrigin);
  };

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !dragStart || !dragEnd) return;
    
    const dx = dragStart.x - dragEnd.x;
    const dy = dragStart.y - dragEnd.y;
    
    if (Math.hypot(dx, dy) > 10) { // Minimum drag to fire
        onFire({ x: dx * SLINGSHOT_POWER_MULTIPLIER, y: dy * SLINGSHOT_POWER_MULTIPLIER });
    }

    onDrag({ x: 0, y: 0 });
    setIsDragging(false);
    onDragStateChange(false);
    setDragStart(null);
    setDragEnd(null);
  }, [isDragging, dragStart, dragEnd, onFire, onDrag, onDragStateChange]);
  
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
    const currentPos = getSVGPosFromEvent(e);
    
    const dx = currentPos.x - dragStart.x;
    const dy = currentPos.y - dragStart.y;
    let dist = Math.hypot(dx, dy);
    let finalDragEnd = currentPos;
    
    if (dist > MAX_SLINGSHOT_DRAG) {
        const angle = Math.atan2(dy, dx);
        finalDragEnd = {
            x: dragStart.x + Math.cos(angle) * MAX_SLINGSHOT_DRAG,
            y: dragStart.y + Math.sin(angle) * MAX_SLINGSHOT_DRAG
        };
    }
    setDragEnd(finalDragEnd);
    onDrag({ x: -(finalDragEnd.x - dragStart.x), y: -(finalDragEnd.y - dragStart.y) });

  }, [isDragging, dragStart, getSVGPosFromEvent, onDrag]);

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => handleDragMove(e);
    const endHandler = () => handleDragEnd();
    if (isDragging) {
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', endHandler);
    }
    return () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', endHandler);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  useEffect(() => {
    const moveHandler = (e: TouchEvent) => handleDragMove(e);
    const endHandler = () => handleDragEnd();
    if (isDragging) {
      window.addEventListener('touchmove', moveHandler, { passive: false });
      window.addEventListener('touchend', endHandler);
      window.addEventListener('touchcancel', endHandler);
    }
    return () => {
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
      window.removeEventListener('touchcancel', endHandler);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);


  const renderTrajectory = () => {
    if (!isDragging || !dragStart || !dragEnd) return null;
    const launchVectorX = dragStart.x - dragEnd.x;
    const launchVectorY = dragStart.y - dragEnd.y;
    return (<line x1={dragStart.x} y1={dragStart.y} x2={dragStart.x + launchVectorX} y2={dragStart.y + launchVectorY} stroke="rgba(255, 255, 255, 0.5)" strokeWidth="3" strokeDasharray="5, 5" />);
  }
  
  const renderDraggingSlingshot = () => {
      if (!isDragging || !dragStart || !dragEnd) return null;
      
      const projectilePosX = dragEnd.x;
      const projectilePosY = dragEnd.y;

      const powerDist = Math.hypot(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      const powerLevel = Math.round((powerDist / MAX_SLINGSHOT_DRAG) * 100);
      
      return (
          <>
            <line x1={slingshotOrigin.x} y1={slingshotOrigin.y} x2={projectilePosX} y2={projectilePosY} stroke="rgba(255, 255, 255, 0.3)" strokeWidth="8" strokeLinecap="round" />
            <text x={projectilePosX} y={projectilePosY} fontSize={PROJECTILE_RADIUS * 2.5} textAnchor="middle" dominantBaseline="central" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                {TYPE_EMOJI_MAP[selectedProjectileType]}
            </text>
            <text x={projectilePosX} y={projectilePosY - 35} fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '1px 1px 2px black' }}>
                {`POWER: ${powerLevel}`}
            </text>
          </>
      )
  }

  const renderPlacedProjectile = () => {
    if (isDragging) return null;
    return (
        <g 
            onMouseDown={handleDragStart} 
            onTouchStart={handleDragStart} 
            style={{cursor: isDragging ? 'grabbing' : 'grab'}}
            className="pointer-events-auto"
        >
             <circle cx={slingshotOrigin.x} cy={slingshotOrigin.y} r={PROJECTILE_RADIUS * 1.5} fill="rgba(255,255,255,0.1)" />
             <text x={slingshotOrigin.x} y={slingshotOrigin.y} fontSize={PROJECTILE_RADIUS * 2.5} textAnchor="middle" dominantBaseline="central" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                {TYPE_EMOJI_MAP[selectedProjectileType]}
             </text>
        </g>
    );
  };

  return (
    <div ref={controlsRef} className="absolute inset-0 z-10 pointer-events-none">
        <svg viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} className="absolute inset-0 w-full h-full">
            {isDragging && renderTrajectory()}
            {isDragging && renderDraggingSlingshot()}
            {!isDragging && renderPlacedProjectile()}
        </svg>
    </div>
  );
};

export default SlingshotControls;