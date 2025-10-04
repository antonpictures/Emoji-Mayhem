import React, { useState } from 'react';
import { soundManager } from '../components/SoundManager';
import { User } from '../types';
import AboutModal from '../components/AboutModal';

interface TitleScreenProps {
  onStartAdventure: () => void;
  onLogin: () => void;
  currentUser: User | null;
  onLogout: () => void;
  onStartVideoPoker: () => void;
  onStartEmpireRTS: () => void;
  onStartVideoEditor: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartAdventure,
  onLogin,
  currentUser,
  onLogout,
  onStartVideoPoker,
  onStartEmpireRTS,
  onStartVideoEditor,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleAction = (action: () => void) => {
    soundManager.initialize();
    soundManager.playClick();
    action();
  };

  const toggleMenu = () => {
    handleAction(() => setIsMenuOpen(!isMenuOpen));
  };
  
  const openAboutModal = () => {
    handleAction(() => {
        setIsAboutModalOpen(true);
        setIsMenuOpen(false);
    });
  };

  return (
    <>
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 font-sans p-4">
      <div className="relative text-center p-6 md:p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-yellow-500 max-w-4xl w-full flex flex-col">
        
        <div className="absolute top-4 right-4 z-50">
            <button onClick={toggleMenu} className="w-12 h-12 flex items-center justify-center text-3xl text-white bg-gray-700/80 hover:bg-gray-600 rounded-full transition-colors">
                ☰
            </button>
            {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl py-2 animate-pop-in text-left">
                    {currentUser ? (
                         <div className="px-4 py-2">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                                    {currentUser.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">{currentUser.name}</p>
                                    <button onClick={() => handleAction(onLogout)} className="text-xs text-red-400 hover:text-red-300 font-semibold">
                                        Logout
                                    </button>
                                </div>
                            </div>
                         </div>
                    ) : (
                        <button onClick={() => handleAction(onLogin)} className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2">
                            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.33,44,30.024,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                            <span>Login with Google</span>
                        </button>
                    )}
                    <hr className="border-gray-700 my-1"/>
                    <button onClick={openAboutModal} className="w-full text-left px-4 py-2 text-white hover:bg-gray-700">
                        About
                    </button>
                </div>
            )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-yellow-400 mb-1 tracking-tighter">
          Google Maps Games
        </h1>
        <p className="text-yellow-300/80 text-sm mb-8">Powered by $MPS on Solana</p>

        <div className="w-full space-y-8">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-300 mb-3 tracking-wide">Main Adventure</h2>
                 <button
                    onClick={() => handleAction(onStartAdventure)}
                    className="px-6 py-3 sm:px-10 sm:py-4 font-bold text-base sm:text-xl bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                >
                    <span className="text-2xl sm:text-3xl mr-3">🎯</span>
                    Play Emoji Slingshot
                </button>
            </div>
            
            <div>
                 <h2 className="text-lg sm:text-xl font-bold text-gray-300 mb-3 tracking-wide">Bonus Games</h2>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => handleAction(onStartVideoPoker)}
                        className="px-6 py-3 sm:px-10 sm:py-4 font-bold text-base sm:text-xl bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                    >
                        <span className="text-2xl sm:text-3xl mr-3">🃏</span>
                        Play $MPS Video Poker
                    </button>
                    <button
                        onClick={() => handleAction(onStartEmpireRTS)}
                        className="px-6 py-3 sm:px-10 sm:py-4 font-bold text-base sm:text-xl bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                    >
                        <span className="text-2xl sm:text-3xl mr-3">🏰</span>
                        Play Empire MPS
                    </button>
                    <button
                        onClick={() => handleAction(onStartVideoEditor)}
                        className="px-6 py-3 sm:px-10 sm:py-4 font-bold text-base sm:text-xl bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                    >
                        <span className="text-2xl sm:text-3xl mr-3">🎥</span>
                        $MPS Video Editor
                    </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
    <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
};

export default TitleScreen;