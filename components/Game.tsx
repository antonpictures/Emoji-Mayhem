// Fix: Restored full file content to resolve parsing errors.
import React, { useState, useEffect, useRef, useCallback } from 'react';

import LevelSelectScreen from './LevelSelectScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import GameOverScreen from './GameOverScreen';
import HUD from './HUD';
import SlingshotControls from './SlingshotControls';

import { GameState, Level, Entity, Enemy, Projectile, Vec2, Particle } from '../types';
import {
  LEVELS,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  GROUND_Y,
  PLAYER_START_POS,
  PLAYER_RADIUS,
  PLAYER_MAX_HEALTH,
  PROJECTILE_RADIUS,
  GRAVITY,
} from '../constants';

interface GameProps {
  onQuit: () => void;
}

const Game: React.FC<GameProps> = ({ onQuit }) => {
  const [gameState, setGameState] = useState<GameState>('level-select');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [shots, setShots] = useState(0);
  const [score, setScore] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(PLAYER_MAX_HEALTH);

  const [entities, setEntities] = useState<Entity[]>([]);
  const [projectile, setProjectile] = useState<Projectile | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const gameLoopRef = useRef<number | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const createParticles = useCallback((position: Vec2, emoji: string, count: number = 10) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        position: { ...position },
        velocity: {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8 - 3
        },
        life: 50,
        maxLife: 50,
        emoji,
        size: Math.random() * 15 + 5
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const spawnEnemies = useCallback((level: Level) => {
    const newEnemies: Enemy[] = level.enemies.map((enemyConfig, index) => ({
      ...enemyConfig,
      id: `enemy-${Date.now()}-${index}`,
      type: 'enemy',
      position: { x: WORLD_WIDTH - 200 - (index * 150) * Math.random(), y: GROUND_Y - enemyConfig.radius - (Math.random() * 250) },
      velocity: { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 },
    }));
    setEntities(newEnemies);
  }, []);

  const resetLevel = useCallback((level: Level) => {
    setPlayerHealth(PLAYER_MAX_HEALTH);
    setShots(0);
    setProjectile(null);
    setParticles([]);
    setEntities([]);
    spawnEnemies(level);
  }, [spawnEnemies]);

  const selectLevel = (level: Level) => {
    setCurrentLevel(level);
    setGameState('playing');
    setScore(0);
    resetLevel(level);
  };

  const handleRestart = () => {
    setScore(0);
    if(currentLevel) {
      resetLevel(currentLevel);
      setGameState('playing');
    } else {
      setGameState('level-select');
    }
  };

  const handleNextLevel = () => {
    const nextLevelId = currentLevel!.id + 1;
    const nextLevel = LEVELS.find(l => l.id === nextLevelId);
    if (nextLevel) {
      setCurrentLevel(nextLevel);
      resetLevel(nextLevel);
      setGameState('playing');
    } else {
      alert("You've cleared all levels! Congratulations!");
      setScore(0);
      setGameState('level-select');
    }
  };
  
  const fireProjectile = (velocity: Vec2) => {
    if (projectile) return;

    setProjectile({
      id: `proj-${Date.now()}`,
      type: 'projectile',
      position: { ...PLAYER_START_POS, y: PLAYER_START_POS.y - PLAYER_RADIUS },
      velocity,
      radius: PROJECTILE_RADIUS,
    });
    setShots(s => s + 1);
  };

  useEffect(() => {
    const loop = () => {
      if (gameState !== 'playing') {
        if(gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        return;
      }

      let newProjectile = projectile ? {...projectile} : null;
      let scoreToAdd = 0;
      
      let updatedEntities = entities.map(e => {
        if (e.type !== 'enemy') return e;
        const enemy = e as Enemy;
        let newPos = { x: enemy.position.x + enemy.velocity.x, y: enemy.position.y + enemy.velocity.y };
        let newVel = { ...enemy.velocity };

        if (newPos.x <= enemy.radius || newPos.x >= WORLD_WIDTH - enemy.radius) {
          newVel.x *= -1;
        }
        if (newPos.y <= enemy.radius || newPos.y >= GROUND_Y - enemy.radius) {
          newVel.y *= -1;
        }

        return { ...enemy, position: newPos, velocity: newVel };
      });

      if (newProjectile) {
        newProjectile.velocity.y += GRAVITY.y;
        newProjectile.position.x += newProjectile.velocity.x;
        newProjectile.position.y += newProjectile.velocity.y;

        const enemies = updatedEntities.filter(e => e.type === 'enemy') as Enemy[];
        let hit = false;
        for (const enemy of enemies) {
          const dist = Math.hypot(newProjectile.position.x - enemy.position.x, newProjectile.position.y - enemy.position.y);
          if (dist < newProjectile.radius + enemy.radius) {
            updatedEntities = updatedEntities.filter(e => e.id !== enemy.id);
            scoreToAdd += enemy.score || 100;
            createParticles(enemy.position, enemy.emoji, 15);
            hit = true;
            break;
          }
        }
        if (hit) newProjectile = null;

        if (newProjectile && (newProjectile.position.y > WORLD_HEIGHT || newProjectile.position.x > WORLD_WIDTH || newProjectile.position.x < 0)) {
          newProjectile = null;
        }
      }
      
      const updatedParticles = particles.map(p => ({
        ...p,
        position: {
          x: p.position.x + p.velocity.x,
          y: p.position.y + p.velocity.y
        },
        velocity: {
          x: p.velocity.x * 0.98,
          y: p.velocity.y + 0.2
        },
        life: p.life - 1
      })).filter(p => p.life > 0);

      setProjectile(newProjectile);
      setEntities(updatedEntities);
      setParticles(updatedParticles);

      if (scoreToAdd > 0) {
          setScore(s => s + scoreToAdd);
      }

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, projectile, entities, particles, createParticles]);

  useEffect(() => {
    if (gameState === 'playing' && currentLevel && entities.filter(e => e.type === 'enemy').length === 0) {
      setGameState('level-complete');
    }
  }, [entities, currentLevel, gameState]);

  const renderGameWorld = () => {
    if (!currentLevel) return null;

    const allGameEntities = projectile ? [...entities, projectile] : entities;

    return (
      <div
          ref={gameContainerRef}
          className={`relative w-full h-full overflow-hidden cursor-crosshair ${currentLevel.backgroundColor}`}
          style={{ width: `${WORLD_WIDTH}px`, height: `${WORLD_HEIGHT}px` }}
      >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full" style={{ height: `${WORLD_HEIGHT - GROUND_Y}px`, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
          
          <div 
              className="absolute rounded-full bg-yellow-500/80 border-2 border-yellow-300 shadow-xl"
              style={{
                  left: PLAYER_START_POS.x - PLAYER_RADIUS,
                  top: PLAYER_START_POS.y - PLAYER_RADIUS,
                  width: PLAYER_RADIUS * 2,
                  height: PLAYER_RADIUS * 2,
              }}
          />

          {allGameEntities.map(entity => {
            if (entity.type === 'enemy') {
              const enemy = entity as Enemy;
              return (
                  <div 
                      key={enemy.id} 
                      className="absolute flex items-center justify-center" 
                      style={{ 
                          width: enemy.radius * 2,
                          height: enemy.radius * 2,
                          left: enemy.position.x,
                          top: enemy.position.y,
                          transform: `translate(-50%, -50%)`,
                      }}
                  >
                      <span style={{fontSize: `${enemy.radius * 1.5}px`, lineHeight: 1, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))'}}>
                          {enemy.emoji}
                      </span>
                  </div>
              );
            }
            if (entity.type === 'projectile') {
              const proj = entity as Projectile;
              return (
                  <div key={proj.id} 
                      className="absolute rounded-full bg-yellow-400 shadow-lg"
                      style={{
                          transform: `translate(${proj.position.x}px, ${proj.position.y}px) translate(-50%, -50%)`,
                          width: proj.radius * 2,
                          height: proj.radius * 2,
                      }}
                  />
              );
            }
            return null;
          })}

          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: particle.position.x,
                top: particle.position.y,
                fontSize: `${particle.size}px`,
                opacity: particle.life / particle.maxLife,
                transform: `translate(-50%, -50%)`
              }}
            >
              {particle.emoji}
            </div>
          ))}

          <SlingshotControls onFire={fireProjectile} isVisible={!projectile} />
          <HUD 
              shots={shots}
              score={score}
              levelName={currentLevel.name}
              playerHealth={playerHealth}
              onQuit={onQuit}
          />
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {gameState === 'level-select' && <LevelSelectScreen levels={LEVELS} onSelect={selectLevel} />}
      {gameState === 'playing' && renderGameWorld()}
      {gameState === 'level-complete' && <LevelCompleteScreen score={score} onNext={handleNextLevel} />}
      {gameState === 'game-over' && <GameOverScreen onRestart={handleRestart} onQuit={onQuit} />}
    </div>
  );
};

export default Game;