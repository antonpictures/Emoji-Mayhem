import React, { useState } from 'react';
import { Level, Vec2, HoverableEntity } from '../types';
// Fix: Corrected import path for useGameSession hook.
import { useGameSession } from '../hooks/useGameSession';
import GameCanvas from '../components/common/GameCanvas';
import HUD from '../components/HUD';
// Fix: Corrected import path for ProjectileSelector component.
import ProjectileSelector from '../components/ProjectileSelector';
import LevelCompleteScreen from '../components/LevelCompleteScreen';
import GameOverScreen from '../components/GameOverScreen';
import StatsCard from '../components/StatsCard';
import { WORLD_WIDTH, WORLD_HEIGHT } from '../constants';
import LevelStartScreen from '../components/LevelStartScreen';
// Fix: Import the SlingshotControls component.
import SlingshotControls from '../components/SlingshotControls';

interface GameScreenProps {
  level: Level;
  isPlaytesting: boolean;
  onLevelComplete: () => void;
  onRestart: () => void;
  onBackToMenu: () => void;
  onEditLevel: (level: Level) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  level,
  isPlaytesting,
  onLevelComplete,
  onRestart,
  onBackToMenu,
  onEditLevel,
}) => {
  const {
    status,
    score,
    entities,
    availableProjectiles,
    selectedProjectileType,
    shake,
    parallaxOffset,
    handleFire,
    handleSelectProjectile,
    handleSlingshotDrag,
    handleDragStateChange,
    slingshotPosition,
    canPlaceProjectile,
    handlePlaceProjectile,
    startGame,
  } = useGameSession(level);

  const [hoveredEntity, setHoveredEntity] = useState<HoverableEntity | null>(
    null,
  );
  const [cardPosition, setCardPosition] = useState<Vec2 | null>(null);

  const handleEntityHover = (entity: HoverableEntity, e: React.MouseEvent) => {
    setHoveredEntity(entity);
    const rect = (e.target as SVGElement).getBoundingClientRect();
    const x = e.clientX;
    // Position card to the right, but flip to the left if it would go off-screen
    const cardX = x + 280 > window.innerWidth ? x - 280 : x;
    setCardPosition({ x: cardX, y: rect.top });
  };

  const handleEntityLeave = () => {
    setHoveredEntity(null);
    setCardPosition(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canPlaceProjectile && status === 'playing') {
      const rect = e.currentTarget.getBoundingClientRect();

      const clientX = e.clientX;
      const clientY = e.clientY;

      const svgAspectRatio = WORLD_WIDTH / WORLD_HEIGHT;
      const rectAspectRatio = rect.width / rect.height;

      let scale: number, offsetX: number, offsetY: number;

      if (svgAspectRatio > rectAspectRatio) {
        scale = rect.width / WORLD_WIDTH;
        offsetX = 0;
        offsetY = (rect.height - WORLD_HEIGHT * scale) / 2;
      } else {
        scale = rect.height / WORLD_HEIGHT;
        offsetX = (rect.width - WORLD_WIDTH * scale) / 2;
        offsetY = 0;
      }

      const svgX = (clientX - rect.left - offsetX) / scale;
      const svgY = (clientY - rect.top - offsetY) / scale;

      handlePlaceProjectile({ x: svgX, y: svgY });
    }
  };

  // Fix: Corrected type errors by implementing useGameSession hook, ensuring availableProjectiles is a Record<string, number>.
  const totalProjectilesLeft = Object.values(availableProjectiles).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: `${WORLD_WIDTH}px`,
          aspectRatio: `${WORLD_WIDTH} / ${WORLD_HEIGHT}`,
          cursor: canPlaceProjectile && status === 'playing' ? 'crosshair' : 'default',
        }}
        onClick={handleCanvasClick}
      >
        <GameCanvas
          levelTheme={level.theme}
          shake={shake}
          parallaxOffset={parallaxOffset}
          entities={entities}
          isEditing={false}
          onEntityHover={handleEntityHover}
          onEntityLeave={handleEntityLeave}
        />
        <HUD
          score={score}
          levelName={level.name}
          projectiles={totalProjectilesLeft}
          onBackToMenu={onBackToMenu}
          onEditLevel={() => onEditLevel(level)}
          canEdit={true}
        />
        {status === 'briefing' && (
          <LevelStartScreen level={level} onStart={startGame} />
        )}
        {status === 'playing' && canPlaceProjectile && totalProjectilesLeft > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <p className="text-white text-2xl font-bold bg-black/50 p-4 rounded-lg animate-pulse">
              Click anywhere to place your projectile!
            </p>
          </div>
        )}
        {status === 'playing' && (
          <>
            {slingshotPosition && (
              <SlingshotControls
                slingshotOrigin={slingshotPosition}
                onFire={handleFire}
                onDrag={handleSlingshotDrag}
                selectedProjectileType={selectedProjectileType}
                onDragStateChange={handleDragStateChange}
              />
            )}
            <ProjectileSelector
              availableProjectiles={availableProjectiles}
              selectedType={selectedProjectileType}
              onSelectType={handleSelectProjectile}
            />
          </>
        )}
        {status === 'won' && (
          <LevelCompleteScreen
            score={score}
            onNext={onLevelComplete}
            isTestingEditorLevel={isPlaytesting}
            onReturnToEditor={() => onEditLevel(level)}
          />
        )}
        {status === 'lost' && (
          <GameOverScreen
            onRestart={onRestart}
            onBackToMenu={onBackToMenu}
            isTestingEditorLevel={isPlaytesting}
            onReturnToEditor={() => onEditLevel(level)}
          />
        )}
        <StatsCard hoveredEntity={hoveredEntity} cardPosition={cardPosition} />
      </div>
    </div>
  );
};

export default GameScreen;