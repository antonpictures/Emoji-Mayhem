import React, { useState, useCallback } from 'react';
import { Level, User } from '../types';
import TitleScreen from '../screens/TitleScreen';
import LevelSelectScreen from '../screens/LevelSelectScreen';
import GameScreen from '../screens/GameScreen';
import EditorScreen from '../screens/EditorScreen';
import { soundManager } from './SoundManager';
import VideoPokerScreen from '../screens/VideoPokerScreen';

interface GameProps {
  levels: Level[];
  onSaveLevel: (level: Level) => void;
  onDeleteLevel: (levelId: number) => void;
  onIncrementPlayCount: (levelId: number) => void;
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onActiveLevelChange: (level: Level | null) => void;
  onGameStateChange: (state: GameState) => void;
}

type GameState = 'title' | 'level_select' | 'gameplay' | 'editor' | 'test_level' | 'video_poker';
type EditorMode = 'new' | 'edit';

const Game: React.FC<GameProps> = (props) => {
  const [gameState, setGameState] = useState<GameState>('title');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>('new');
  const [levelBeforeTest, setLevelBeforeTest] = useState<Level | null>(null);

  const setGameStateAndNotify = useCallback((state: GameState) => {
    setGameState(state);
    props.onGameStateChange(state);
  }, [props]);

  const handleStartAdventure = useCallback(() => {
    setGameStateAndNotify('level_select');
  }, [setGameStateAndNotify]);

  const handleLevelSelect = useCallback((level: Level) => {
    props.onIncrementPlayCount(level.id);
    setActiveLevel(level);
    props.onActiveLevelChange(level);
    setGameStateAndNotify('gameplay');
  }, [props, setGameStateAndNotify]);
  
  const handleBackToTitle = useCallback(() => {
    setGameStateAndNotify('title');
  }, [setGameStateAndNotify]);

  const handleBackToLevelSelect = useCallback(() => {
    setActiveLevel(null);
    props.onActiveLevelChange(null);
    setGameStateAndNotify('level_select');
  }, [props, setGameStateAndNotify]);

  const handleStartEditor = useCallback(() => {
    soundManager.playClick();
    const newLevel: Level = {
      id: Date.now(),
      name: 'My New Level',
      projectiles: 10,
      enemies: [],
      isCustom: true,
      theme: { sky: ['#87CEEB', '#B0E0E6', '#ADD8E6'] },
    };
    setActiveLevel(newLevel);
    setEditorMode('new');
    setGameStateAndNotify('editor');
  }, [setGameStateAndNotify]);

  const handleEditLevel = useCallback((level: Level) => {
    soundManager.playClick();
    setActiveLevel(level);
    setEditorMode('edit');
    setGameStateAndNotify('editor');
  }, [setGameStateAndNotify]);
  
  const handleStartVideoPoker = useCallback(() => {
    soundManager.playClick();
    setGameStateAndNotify('video_poker');
  }, [setGameStateAndNotify]);

  const handleSaveAndExitEditor = useCallback((level: Level) => {
    props.onSaveLevel(level);
    setGameStateAndNotify('level_select');
    setActiveLevel(null);
  }, [props, setGameStateAndNotify]);

  const handleExitEditor = useCallback(() => {
    if (confirm('Exit without saving?')) {
        setGameStateAndNotify('level_select');
        setActiveLevel(null);
    }
  }, [setGameStateAndNotify]);
  
  const handlePlaytest = useCallback((level: Level) => {
    setLevelBeforeTest(level);
    setActiveLevel(level);
    props.onActiveLevelChange(level);
    setGameStateAndNotify('test_level');
  }, [props, setGameStateAndNotify]);

  const handleReturnToEditor = useCallback(() => {
    setActiveLevel(levelBeforeTest);
    props.onActiveLevelChange(levelBeforeTest);
    setLevelBeforeTest(null);
    setGameStateAndNotify('editor');
  }, [levelBeforeTest, props, setGameStateAndNotify]);

  const findNextLevel = (currentLevelId: number): Level | null => {
    const sortedLevels = props.levels.filter(l => !l.isCustom && !l.isCommunity).sort((a,b) => a.id - b.id);
    const currentIndex = sortedLevels.findIndex(l => l.id === currentLevelId);
    if (currentIndex > -1 && currentIndex < sortedLevels.length - 1) {
        return sortedLevels[currentIndex + 1];
    }
    return null;
  };

  const handleNextLevel = useCallback(() => {
    if (activeLevel) {
        const nextLevel = findNextLevel(activeLevel.id);
        if (nextLevel) {
            handleLevelSelect(nextLevel);
        } else {
            handleBackToLevelSelect();
        }
    }
  }, [activeLevel, props.levels, handleLevelSelect, handleBackToLevelSelect]);


  switch (gameState) {
    case 'title':
        return <TitleScreen onStartAdventure={handleStartAdventure} onStartVideoPoker={handleStartVideoPoker} onLogin={props.onLogin} currentUser={props.currentUser} onLogout={props.onLogout} />;
    case 'level_select':
        return <LevelSelectScreen levels={props.levels} onLevelSelect={handleLevelSelect} onBackToTitle={handleBackToTitle} onStartEditor={handleStartEditor} onEditLevel={handleEditLevel} onDeleteLevel={props.onDeleteLevel} onSaveLevel={props.onSaveLevel} currentUser={props.currentUser} onLogout={props.onLogout} />;
    case 'gameplay':
        return activeLevel ? <GameScreen key={activeLevel.id} level={activeLevel} onBackToMenu={handleBackToLevelSelect} onNextLevel={handleNextLevel} onEditLevel={() => handleEditLevel(activeLevel)} canEdit={!!activeLevel.isCustom} isTestingEditorLevel={false} onReturnToEditor={() => {}} /> : null;
    case 'editor':
        return activeLevel ? <EditorScreen initialLevel={activeLevel} onSaveAndExit={handleSaveAndExitEditor} onExitWithoutSaving={handleExitEditor} onPlaytest={handlePlaytest} /> : null;
    case 'test_level':
        return activeLevel ? <GameScreen key={`test-${activeLevel.id}`} level={activeLevel} onBackToMenu={handleReturnToEditor} onNextLevel={() => {}} onEditLevel={() => {}} canEdit={false} isTestingEditorLevel={true} onReturnToEditor={handleReturnToEditor} /> : null;
    case 'video_poker':
        return <VideoPokerScreen onBackToTitle={handleBackToTitle} />;
    default:
        return null;
  }
};

export default Game;