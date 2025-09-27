import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Vec2, Projectile, Enemy, Level, Particle } from '../types';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  GROUND_Y,
  PLAYER_START_POS,
  PROJECTILE_RADIUS,
  GRAVITY,
} from '../constants';
import { LEVELS } from './level-data';

import SlingshotControls from './SlingshotControls';
import HUD from './HUD';
import LevelSelectScreen from './LevelSelectScreen';
import LevelCompleteScreen from './LevelCompleteScreen';
import GameOverScreen from './GameOverScreen';

type GameState = 'level-select' | 'playing' | 'level-complete' | 'game-over';

const ENEMY_CONFIG = {
    grunt: { radius: 25, health: 50, color: 'rgb(239, 68, 68)', points: 100 },
    brute: { radius: 40, health: 150, color: 'rgb(192, 38, 211)', points: 300 },
    flyer: { radius: 20, health: 30, color: 'rgb(59, 130, 246)', points: 150 },
};

interface GameProps {
  onQuit: () => void;
}

const Game: React.FC<GameProps> = ({ onQuit }) => {
  const [gameState, setGameState] = useState<GameState>('level-select');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [remainingProjectiles, setRemainingProjectiles] = useState(0);
  const [score, setScore] = useState(0);

  const gameLoopRef = useRef<number | null>(null);

  const createParticleBurst = (position: Vec2, count: number, color: string): Particle[] => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 5 + 2;
        newParticles.push({
            id: `p-${Date.now()}-${i}-${Math.random()}`,
            position: { ...position },
            velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            radius: Math.random() * 3 + 1,
            color,
            lifespan: 30 + Math.random() * 30 // frames
        });
    }
    return newParticles;
  };
  
  const loadLevel = useCallback((level: Level) => {
    setCurrentLevel(level);
    setRemainingProjectiles(level.projectiles);
    const newEnemies = level.enemies.map((e, i) => {
        const config = ENEMY_CONFIG[e.type];
        return {
            ...config,
            id: `e-${level.id}-${i}`,
            position: { ...e.position },
            velocity: { x: 0, y: 0 },
            type: e.type,
        }
    });
    setEnemies(newEnemies);
    setProjectiles([]);
    setParticles([]);
    setGameState('playing');
  }, []);

  const handleFire = useCallback((velocity: Vec2) => {
    if (remainingProjectiles <= 0) return;
    setRemainingProjectiles(prev => prev - 1);
    const newProjectile: Projectile = {
      id: `proj-${Date.now()}`,
      position: { ...PLAYER_START_POS },
      velocity,
      radius: PROJECTILE_RADIUS,
    };
    setProjectiles(prev => [...prev, newProjectile]);
  }, [remainingProjectiles]);

  const gameTick = useCallback(() => {
    let scoreToAdd = 0;
    const newParticles: Particle[] = [];
  
    // 1. Update physics for existing entities
    const updatedProjectiles = projectiles.map(p => {
      const newVel = { x: p.velocity.x, y: p.velocity.y + GRAVITY.y };
      const newPos = { x: p.position.x + newVel.x, y: p.position.y + newVel.y };
      return { ...p, position: newPos, velocity: newVel };
    });
  
    const updatedEnemies = enemies.map(enemy => {
      if (enemy.type === 'flyer') {
        const newVelY = Math.sin(Date.now() / 500) * 0.3;
        const newPos = { ...enemy.position, y: enemy.position.y + newVelY };
        return { ...enemy, position: newPos, velocity: { x: 0, y: newVelY } };
      } else {
        const newVel = { x: enemy.velocity.x, y: enemy.velocity.y + GRAVITY.y };
        let newPos = { x: enemy.position.x + newVel.x, y: enemy.position.y + newVel.y };
        if (newPos.y > GROUND_Y - enemy.radius) {
          newPos.y = GROUND_Y - enemy.radius;
          newVel.y = 0;
        }
        return { ...enemy, position: newPos, velocity: newVel };
      }
    });
  
    // 2. Collision detection and resolution
    let remainingProjectilesAfterCollision = [];
    let survivingEnemies = [...updatedEnemies];
  
    for (const projectile of updatedProjectiles) {
      let hasCollided = false;
      const nextSurvivingEnemies: Enemy[] = [];
  
      for (const enemy of survivingEnemies) {
        const dx = projectile.position.x - enemy.position.x;
        const dy = projectile.position.y - enemy.position.y;
        const distance = Math.hypot(dx, dy);
  
        if (distance < projectile.radius + enemy.radius) {
          hasCollided = true;
          newParticles.push(...createParticleBurst(projectile.position, 20, '#ffc700'));
          const damage = Math.hypot(projectile.velocity.x, projectile.velocity.y) * 5;
          const remainingHealth = enemy.health - damage;
  
          if (remainingHealth <= 0) {
            scoreToAdd += enemy.points;
            newParticles.push(...createParticleBurst(enemy.position, 30, enemy.color));
            // Enemy is destroyed, do not add to nextSurvivingEnemies
          } else {
            nextSurvivingEnemies.push({ ...enemy, health: remainingHealth });
          }
        } else {
          nextSurvivingEnemies.push(enemy);
        }
      }
      
      survivingEnemies = nextSurvivingEnemies;
      if (!hasCollided) {
        remainingProjectilesAfterCollision.push(projectile);
      }
    }
  
    // Filter out-of-bounds projectiles
    const finalProjectiles = remainingProjectilesAfterCollision.filter(p =>
      p.position.y < GROUND_Y + p.radius * 2 &&
      p.position.x > -p.radius &&
      p.position.x < WORLD_WIDTH + p.radius
    );
  
    // 3. Update particles
    const updatedParticles = particles.map(p => ({
      ...p,
      position: { x: p.position.x + p.velocity.x, y: p.position.y + p.velocity.y },
      lifespan: p.lifespan - 1,
      radius: p.radius * 0.98
    })).filter(p => p.lifespan > 0);
  
    // 4. Set all state updates
    setProjectiles(finalProjectiles);
    setEnemies(survivingEnemies);
    setParticles([...updatedParticles, ...newParticles]);
    if (scoreToAdd > 0) {
      setScore(s => s + scoreToAdd);
    }
  
    // 5. Check for win/loss conditions
    if (survivingEnemies.length === 0) {
      setScore(s => s + finalProjectiles.length * 50); // bonus points
      setGameState('level-complete');
    } else if (finalProjectiles.length === 0 && remainingProjectiles === 0) {
      setGameState('game-over');
    } else {
      gameLoopRef.current = requestAnimationFrame(gameTick);
    }
  }, [projectiles, enemies, particles, remainingProjectiles]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameTick);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameTick]);

  const handleRestart = () => {
      setScore(0);
      setGameState('level-select');
  };

  const handleNextLevel = () => {
      if (!currentLevel) return;
      const nextLevelId = currentLevel.id + 1;
      const nextLevel = LEVELS.find(l => l.id === nextLevelId);
      if (nextLevel) {
          loadLevel(nextLevel);
      } else {
          // No more levels, go back to select screen
          setGameState('level-select');
      }
  };
  
  const renderEnemy = (enemy: Enemy) => {
      const config = ENEMY_CONFIG[enemy.type];
      return (
          <g key={enemy.id} transform={`translate(${enemy.position.x}, ${enemy.position.y})`}>
              <circle cx="0" cy="0" r={enemy.radius} fill={config.color} />
              {/* Simple face */}
              <circle cx={-enemy.radius * 0.3} cy={-enemy.radius * 0.2} r="2" fill="white" />
              <circle cx={enemy.radius * 0.3} cy={-enemy.radius * 0.2} r="2" fill="white" />
              <line x1={-enemy.radius * 0.4} y1={enemy.radius * 0.3} x2={enemy.radius * 0.4} y2={enemy.radius * 0.3} stroke="white" strokeWidth="2" />
          </g>
      );
  };

  return (
    <div className="relative w-full h-full bg-blue-900 overflow-hidden">
      <svg
        viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(2, 6, 23)', stopOpacity:1}} />
                <stop offset="80%" style={{stopColor: 'rgb(17, 24, 39)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'rgb(30, 41, 59)', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#skyGradient)" />


        {/* Ground */}
        <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height={WORLD_HEIGHT - GROUND_Y} fill="#228b22" />
        
        {/* Slingshot stand */}
        <path d={`M ${PLAYER_START_POS.x - 20} ${GROUND_Y} L ${PLAYER_START_POS.x - 20} ${PLAYER_START_POS.y-10}`} stroke="saddlebrown" strokeWidth="10" />
        <path d={`M ${PLAYER_START_POS.x + 20} ${GROUND_Y} L ${PLAYER_START_POS.x + 20} ${PLAYER_START_POS.y-10}`} stroke="saddlebrown" strokeWidth="10" />
        
        {/* Game Objects */}
        {enemies.map(renderEnemy)}
        {projectiles.map(p => (
            <foreignObject key={p.id} x={p.position.x - p.radius} y={p.position.y - p.radius} width={p.radius * 2} height={p.radius * 2}>
                <div className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold" style={{ fontSize: `${p.radius * 0.6}px` }}>$MPS</div>
            </foreignObject>
        ))}
        {particles.map(p => (
            <circle key={p.id} cx={p.position.x} cy={p.position.y} r={p.radius} fill={p.color} opacity={p.lifespan / 60} />
        ))}

      </svg>
      <SlingshotControls onFire={handleFire} isVisible={gameState === 'playing' && remainingProjectiles > 0} />
      <HUD
        score={score}
        levelName={currentLevel?.name || '---'}
        projectiles={remainingProjectiles}
      />
      
      {gameState === 'level-select' && <LevelSelectScreen onLevelSelect={loadLevel} onQuit={onQuit} />}
      {gameState === 'level-complete' && <LevelCompleteScreen score={score} onNext={handleNextLevel} />}
      {gameState === 'game-over' && <GameOverScreen onRestart={handleRestart} onQuit={onQuit} />}
    </div>
  );
};

export default Game;