import React, { useState, useCallback } from 'react';
import { Level, User, Chapter } from '../types';
import TitleScreen from '../screens/TitleScreen';
import LevelSelectScreen from '../screens/LevelSelectScreen';
import GameScreen from '../screens/GameScreen';
import EditorScreen from '../screens/EditorScreen';
import { CHAPTERS } from './chapter-data';
import { soundManager } from './SoundManager';

interface GameProps {
  levels: Level[];
  communityLevels: Level[];
  onSaveLevel: (level: Level) => void;
  onDeleteLevel: (levelId: number) => void;
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onActiveLevelChange: (level: Level | null) => void;
}

type GameState = 'title' | 'level_select' | 'gameplay' | 'editor' | 'test_level';
type EditorMode = 'new' | 'edit';

const Game: React.FC<GameProps> = (props) => {
  const [gameState, setGameState] = useState<GameState>('title');
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>('new');
  const [levelBeforeTest, setLevelBeforeTest] = useState<Level | null>(null);

  const handleSelectChapter = useCallback((chapter: Chapter) => {
    setActiveChapter(chapter);
    setGameState('level_select');
  }, []);

  const handleLevelSelect = useCallback((level: Level) => {
    setActiveLevel(level);
    props.onActiveLevelChange(level);
    setGameState('gameplay');
  }, [props]);
  
  const handleBackToTitle = useCallback(() => {
    setActiveChapter(null);
    setGameState('title');
  }, []);

  const handleBackToLevelSelect = useCallback(() => {
    setActiveLevel(null);
    props.onActiveLevelChange(null);
    setGameState('level_select');
  }, [props]);

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
    setGameState('editor');
  }, []);

  const handleEditLevel = useCallback((level: Level) => {
    soundManager.playClick();
    setActiveLevel(level);
    setEditorMode('edit');
    setGameState('editor');
  }, []);

  const handleSaveAndExitEditor = useCallback((level: Level) => {
    props.onSaveLevel(level);
    setGameState('level_select');
    setActiveLevel(null);
  }, [props]);

  const handleExitEditor = useCallback(() => {
    if (confirm('Exit without saving?')) {
        setGameState('level_select');
        setActiveLevel(null);
    }
  }, []);
  
  const handlePlaytest = useCallback((level: Level) => {
    setLevelBeforeTest(level);
    setActiveLevel(level);
    props.onActiveLevelChange(level);
    setGameState('test_level');
  }, [props]);

  const handleReturnToEditor = useCallback(() => {
    setActiveLevel(levelBeforeTest);
    props.onActiveLevelChange(levelBeforeTest);
    setLevelBeforeTest(null);
    setGameState('editor');
  }, [levelBeforeTest, props]);

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
        return <TitleScreen onSelectChapter={handleSelectChapter} onLogin={props.onLogin} currentUser={props.currentUser} onLogout={props.onLogout} />;
    case 'level_select':
        return <LevelSelectScreen levels={props.levels} communityLevels={props.communityLevels} onLevelSelect={handleLevelSelect} onBackToTitle={handleBackToTitle} chapter={activeChapter} onStartEditor={handleStartEditor} onEditLevel={handleEditLevel} onDeleteLevel={props.onDeleteLevel} onSaveLevel={props.onSaveLevel} currentUser={props.currentUser} onLogout={props.onLogout} />;
    case 'gameplay':
        return activeLevel ? <GameScreen key={activeLevel.id} level={activeLevel} onBackToMenu={handleBackToLevelSelect} onNextLevel={handleNextLevel} onEditLevel={() => handleEditLevel(activeLevel)} canEdit={!!activeLevel.isCustom} isTestingEditorLevel={false} onReturnToEditor={() => {}} /> : null;
    case 'editor':
        return activeLevel ? <EditorScreen initialLevel={activeLevel} onSaveAndExit={handleSaveAndExitEditor} onExitWithoutSaving={handleExitEditor} onPlaytest={handlePlaytest} /> : null;
    case 'test_level':
        return activeLevel ? <GameScreen key={`test-${activeLevel.id}`} level={activeLevel} onBackToMenu={handleReturnToEditor} onNextLevel={() => {}} onEditLevel={() => {}} canEdit={false} isTestingEditorLevel={true} onReturnToEditor={handleReturnToEditor} /> : null;
    default:
        return null;
  }
};

export default Game;
