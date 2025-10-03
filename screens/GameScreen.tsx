import React, { useState, useCallback, useEffect } from 'react';
import { Level, Vec2, PokemonType, HoverableEntity } from '../types';
import { useGameSession } from '../hooks/useGameSession';
import { WORLD_WIDTH, WORLD_HEIGHT } from '../constants';
import HUD from '../components/HUD';
import SlingshotControls from '../components/SlingshotControls';
// Fix: Corrected import path for PLAYER_PROJECTILE_TYPES.
import ProjectileSelector from '../components/ProjectileSelector';
import { PLAYER_PROJECTILE_TYPES } from '../components/projectile-data';
import LevelCompleteScreen from '../components/LevelCompleteScreen';
import GameOverScreen from '../components/GameOverScreen';
import GameCanvas from '../components/common/GameCanvas';
import StatsCard from '../components/StatsCard';
import { soundManager } from '../components/SoundManager';
import { generateAiLevel } from '../services/AIService';

interface GameScreenProps {
  level: Level;
  onBackToMenu: () => void;
  onNextLevel: () => void;
  onEditLevel: () => void;
  canEdit: boolean;
  isTestingEditorLevel: boolean;
  onReturnToEditor: () => void;
}

type GamePhase = 'playing' | 'paused' | 'complete' | 'over';

const GameScreen: React.FC<GameScreenProps> = ({ level, onBackToMenu, onNextLevel, onEditLevel, canEdit, isTestingEditorLevel, onReturnToEditor }) => {
  const [phase, setPhase] = useState<GamePhase>('playing');
  const [selectedProjectile, setSelectedProjectile] = useState<PokemonType>(PokemonType.Normal);
  const [slingshotDragOffset, setSlingshotDragOffset] = useState<Vec2>({ x: 0, y: 0 });
  const [isSlingshotDragging, setIsSlingshotDragging] = useState(false);
  const [hoveredEntity, setHoveredEntity] = useState<HoverableEntity | null>(null);
  const [cardPosition, setCardPosition] = useState<Vec2 | null>(null);
  const [isAiFixing, setIsAiFixing] = useState(false);

  const {
    entities,
    ammo,
    projectilesLeft,
    mpsEarned,
    gameStatus,
    shake,
    parallaxOffset,
    fireProjectile,
    restartLevel,
    loadNewLevel,
  } = useGameSession(level, phase === 'playing');

  useEffect(() => {
    soundManager.initialize();
  }, []);

  useEffect(() => {
    if (gameStatus === 'won') {
      soundManager.playLevelComplete();
      setPhase('complete');
    } else if (gameStatus === 'lost') {
      soundManager.playGameOver();
      setPhase('over');
    }
  }, [gameStatus]);

  // Auto-select next available projectile
  useEffect(() => {
    if (phase !== 'playing') return;
  
    const currentAmmo = ammo[selectedProjectile] || 0;
  
    if (projectilesLeft > 0 && currentAmmo === 0) {
      const currentIndex = PLAYER_PROJECTILE_TYPES.indexOf(selectedProjectile);
      
      for (let i = 1; i <= PLAYER_PROJECTILE_TYPES.length; i++) {
        const nextIndex = (currentIndex + i) % PLAYER_PROJECTILE_TYPES.length;
        const nextType = PLAYER_PROJECTILE_TYPES[nextIndex];
        if ((ammo[nextType] || 0) > 0) {
          setSelectedProjectile(nextType);
          return; 
        }
      }
    }
  }, [ammo, selectedProjectile, projectilesLeft, phase]);
  
  const handleFire = useCallback((velocity: Vec2) => {
    const firedProjectileType = selectedProjectile;
    if ((ammo[firedProjectileType] || 0) > 0) {
      fireProjectile(velocity, firedProjectileType);
    }
  }, [fireProjectile, selectedProjectile, ammo]);
  
  const handleRestart = useCallback(() => {
    restartLevel();
    setPhase('playing');
  }, [restartLevel]);
  
  const handleEntityHover = (entity: HoverableEntity, e: React.MouseEvent) => {
    setHoveredEntity(entity);
    const rect = (e.currentTarget as SVGGElement).getBoundingClientRect();
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        const gameRect = gameContainer.getBoundingClientRect();
        setCardPosition({ x: rect.right - gameRect.left + 10, y: rect.top - gameRect.top });
    }
  };

  const handleEntityLeave = () => {
    setHoveredEntity(null);
  };

  const handleAiFixLevel = useCallback(async () => {
    setIsAiFixing(true);
    try {
        const prompt = "Rearrange all the items on the screen to make sense and make it playable. The player shoots from the left. Ensure the level is fun and provides a reasonable challenge.";
        const newLevelData = await generateAiLevel(prompt, level);
        loadNewLevel(newLevelData);
    } catch (error) {
        console.error("AI level fix failed:", error);
        alert("Sorry, the AI couldn't fix the level right now. Please try again.");
    } finally {
        setIsAiFixing(false);
    }
  }, [level, loadNewLevel]);


  const slingshotOrigin = { x: 150, y: WORLD_HEIGHT - 150 };

  const projectileAtSlingshot = {
    position: {
        x: slingshotOrigin.x + slingshotDragOffset.x,
        y: slingshotOrigin.y + slingshotDragOffset.y,
    },
    radius: 15,
    projectileType: selectedProjectile,
    id: 'slingshot-proj',
    velocity: {x: 0, y: 0},
    bounces: 0
  };
  
  const displayEntities = {
      ...entities,
      projectiles: (isSlingshotDragging || (ammo[selectedProjectile] || 0) === 0) ? entities.projectiles : [...entities.projectiles, projectileAtSlingshot]
  };

  return (
    <div id="game-container" className="relative bg-gray-800 w-full h-full max-w-[100vw] max-h-[56.25vw] sm:max-h-[100vh] sm:max-w-[177.77vh] aspect-[16/9]">
      {phase === 'complete' && <LevelCompleteScreen mpsEarned={mpsEarned} onNext={onNextLevel} isTestingEditorLevel={isTestingEditorLevel} onReturnToEditor={onReturnToEditor} />}
      {phase === 'over' && <GameOverScreen onRestart={handleRestart} onBackToMenu={onBackToMenu} isTestingEditorLevel={isTestingEditorLevel} onReturnToEditor={onReturnToEditor} />}
      {isAiFixing && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 font-sans">
            <div className="text-5xl mb-4">🤖</div>
            <div className="text-white text-xl font-bold animate-pulse">AI is redesigning the level...</div>
        </div>
      )}
      
      <HUD mps={mpsEarned} levelName={level.name} projectiles={projectilesLeft} onBackToMenu={onBackToMenu} onEditLevel={onEditLevel} canEdit={canEdit} onAiFixLevel={handleAiFixLevel} isAiFixing={isAiFixing} />
      
      <GameCanvas
        levelTheme={level.theme}
        shake={shake}
        parallaxOffset={parallaxOffset}
        entities={displayEntities}
        isEditing={false}
        onEntityHover={handleEntityHover}
        onEntityLeave={handleEntityLeave}
      />
      
      <StatsCard hoveredEntity={hoveredEntity} cardPosition={cardPosition} />

      {phase === 'playing' && (
        <>
          <ProjectileSelector onSelect={setSelectedProjectile} selectedType={selectedProjectile} ammo={ammo} />
          <SlingshotControls 
            slingshotOrigin={slingshotOrigin} 
            onFire={handleFire} 
            onDrag={setSlingshotDragOffset}
            selectedProjectileType={selectedProjectile}
            onDragStateChange={setIsSlingshotDragging}
          />
        </>
      )}
    </div>
  );
};

export default GameScreen;