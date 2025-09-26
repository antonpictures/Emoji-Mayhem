
import React from 'react';
// Fix: Corrected the import path to be a relative module import.
import Game from './components/Game';

const App: React.FC = () => {
  const handleQuit = () => {
    // In a full app, this might return to a main menu.
    // For now, we can show an alert or reset the component.
    alert("Thanks for playing!");
    window.location.reload(); // Simple way to "restart"
  };

  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center font-sans overflow-hidden">
      <Game onQuit={handleQuit} />
    </div>
  );
};

export default App;
