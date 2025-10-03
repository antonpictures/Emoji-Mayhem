import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import { useLevels } from './hooks/useLevels';
import { useAuth } from './hooks/useAuth';
// Fix: Corrected import path for Level type.
import { Level } from './types';

const App: React.FC = () => {
  const { levels, handleSaveLevel, handleDeleteLevel, incrementPlayCount } =
    useLevels();
  const { currentUser, login, logout } = useAuth();
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [currentGameState, setCurrentGameState] = useState<string>('title');

  const defaultSky: [string, string, string] = [
    '#2d3748',
    '#4a5568',
    '#718096',
  ];
  const sky = activeLevel?.theme?.sky || defaultSky;
  const [start, mid, end] = sky;
  const backgroundStyle =
    currentGameState === 'video_poker'
      ? { backgroundColor: '#000000' }
      : {
          background: `linear-gradient(to bottom, ${end}, ${mid}, ${start})`,
        };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center font-sans overflow-hidden transition-all duration-500"
      style={backgroundStyle}
    >
      <Game
        levels={levels}
        onSaveLevel={handleSaveLevel}
        onDeleteLevel={handleDeleteLevel}
        onIncrementPlayCount={incrementPlayCount}
        currentUser={currentUser}
        onLogin={login}
        onLogout={logout}
        onActiveLevelChange={setActiveLevel}
        onGameStateChange={setCurrentGameState}
      />
    </div>
  );
};

export default App;