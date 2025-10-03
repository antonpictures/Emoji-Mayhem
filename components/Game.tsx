import React, { useState, useCallback, useEffect } from 'react';
import { Level, User, Chapter } from '../types';

import TitleScreen from '../screens/TitleScreen';
import LevelSelectScreen from '../screens/LevelSelectScreen';
import GameScreen from '../screens/GameScreen';
import EditorScreen from '../screens/EditorScreen';

type GameState = 'title-screen' | 'level-select' | 'playing' | 'level-editor';

const createNewLevel = (): Level => ({
  id: Date.now(),
  name: 'New Custom Level',
  projectiles: 20,
  enemies: [],
  platforms: [],
  breakableBlocks: [],
  emojiStructures: [],
  isCustom: true,
  theme: { sky: ['#87CEEB', '#B0E0E6', '#ADD8E6'] },
});

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

const Game: React.FC<GameProps> = ({
  levels,
  communityLevels,
  onSaveLevel,
  onDeleteLevel,
  currentUser,
  onLogin,
  onLogout,
  onActiveLevelChange,
}) => {
  const [gameState, setGameState] = useState<GameState>('title-screen');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [levelForEditor, setLevelForEditor] = useState<Level | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [isPlaytesting, setIsPlaytesting] = useState(false);

  useEffect(() => {
    onActiveLevelChange(
      gameState === 'playing' || gameState === 'level-editor'
        ? activeLevel
        : null,
    );
  }, [gameState, activeLevel, onActiveLevelChange]);

  const handleStartPlay = useCallback((level: Level) => {
    setActiveLevel(level);
    setIsPlaytesting(false);
    setGameState('playing');
    setGameKey((prev) => prev + 1);
  }, []);

  const handleSelectChapter = useCallback((chapter: Chapter) => {
    setSelectedChapter(chapter);
    setGameState('level-select');
  }, []);

  const handleStartPlaytest = useCallback((level: Level) => {
    setActiveLevel(level);
    setIsPlaytesting(true);
    setGameState('playing');
    setGameKey((prev) => prev + 1);
  }, []);

  const handleSelectLevelForEditor = useCallback((level: Level) => {
    if (level.isCustom || isPlaytesting) {
      // If it's already a custom level or a playtest of one, edit it directly.
      setLevelForEditor(level);
      setActiveLevel(level);
      setGameState('level-editor');
    } else {
      // It's a campaign level, so create a copy to edit.
      const newCustomLevel: Level = {
        ...JSON.parse(JSON.stringify(level)), // Deep copy to avoid mutation
        id: Date.now(), // Assign a new, unique ID
        name: `${level.name} (Copy)`,
        isCustom: true,
        // Clear community properties if they exist
        creator: undefined,
        plays: undefined,
        likes: undefined,
        isCommunity: undefined,
      };
      setLevelForEditor(newCustomLevel);
      setActiveLevel(newCustomLevel);
      setGameState('level-editor');
    }
  }, [isPlaytesting]);

  const handleStartNewEditor = useCallback(() => {
    const newLevel = createNewLevel();
    setLevelForEditor(newLevel);
    setActiveLevel(newLevel);
    setGameState('level-editor');
  }, []);

  const handleReturnToMenu = useCallback(() => {
    setActiveLevel(null);
    setLevelForEditor(null);
    setGameState('level-select');
  }, []);

  const handleBackToTitle = useCallback(() => {
    setActiveLevel(null);
    setLevelForEditor(null);
    setSelectedChapter(null);
    setGameState('title-screen');
  }, []);

  const handleSaveAndExitEditor = useCallback(
    (editedLevel: Level) => {
      onSaveLevel(editedLevel);
      handleReturnToMenu();
    },
    [onSaveLevel, handleReturnToMenu],
  );

  const getNextLevel = useCallback((): Level | null => {
    if (!activeLevel) return null;
    const sortedCampaignLevels = levels
      .filter((l) => !l.isCustom)
      .sort((a, b) => a.id - b.id);
    const currentIndex = sortedCampaignLevels.findIndex(
      (l) => l.id === activeLevel.id,
    );
    if (currentIndex !== -1 && currentIndex + 1 < sortedCampaignLevels.length) {
      return sortedCampaignLevels[currentIndex + 1];
    }
    return null;
  }, [activeLevel, levels]);

  const handleLevelComplete = useCallback(() => {
    if (isPlaytesting) {
      // When playtesting, return to the editor with the level we were editing.
      if (activeLevel) {
        handleSelectLevelForEditor(activeLevel);
      } else {
        handleReturnToMenu(); // Fallback
      }
    } else {
      const nextLevel = getNextLevel();
      if (nextLevel) {
        handleStartPlay(nextLevel);
      } else {
        handleReturnToMenu();
      }
    }
  }, [
    isPlaytesting,
    activeLevel,
    getNextLevel,
    handleReturnToMenu,
    handleStartPlay,
    handleSelectLevelForEditor,
  ]);

  const renderContent = () => {
    switch (gameState) {
      case 'title-screen':
        return (
          <TitleScreen
            onSelectChapter={handleSelectChapter}
            onLogin={onLogin}
            currentUser={currentUser}
            onLogout={onLogout}
          />
        );
      case 'level-select':
        return (
          <LevelSelectScreen
            levels={levels}
            communityLevels={communityLevels}
            onLevelSelect={handleStartPlay}
            onBackToTitle={handleBackToTitle}
            onStartEditor={handleStartNewEditor}
            onEditLevel={handleSelectLevelForEditor}
            onDeleteLevel={onDeleteLevel}
            currentUser={currentUser}
            onLogout={onLogout}
            chapter={selectedChapter}
          />
        );
      case 'playing':
        if (!activeLevel) {
          handleReturnToMenu();
          return null;
        }
        return (
          <GameScreen
            key={gameKey}
            level={activeLevel}
            isPlaytesting={isPlaytesting}
            onLevelComplete={handleLevelComplete}
            onRestart={() =>
              isPlaytesting
                ? handleStartPlaytest(activeLevel)
                : handleStartPlay(activeLevel)
            }
            onBackToMenu={handleReturnToMenu}
            onEditLevel={handleSelectLevelForEditor}
          />
        );
      case 'level-editor':
        if (!levelForEditor) {
          handleReturnToMenu();
          return null;
        }
        return (
          <EditorScreen
            initialLevel={levelForEditor}
            onSaveAndExit={handleSaveAndExitEditor}
            onExitWithoutSaving={handleReturnToMenu}
            onPlaytest={handleStartPlaytest}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full bg-black/20 flex items-center justify-center overflow-hidden select-none">
      {renderContent()}
    </div>
  );
};

export default Game;