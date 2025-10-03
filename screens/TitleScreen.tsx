import React from 'react';
import { soundManager } from '../components/SoundManager';
import { User, Chapter } from '../types';
import { CHAPTERS } from '../components/chapter-data';
import UserProfile from '../components/common/UserProfile';

interface TitleScreenProps {
  onSelectChapter: (chapter: Chapter) => void;
  onLogin: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({
  onSelectChapter,
  onLogin,
  currentUser,
  onLogout,
}) => {
  const handleAction = (action: () => void) => {
    soundManager.initialize();
    soundManager.playClick();
    action();
  };

  const colorClasses: Record<string, { bg: string, shadow: string }> = {
    blue: { bg: 'bg-blue-600', shadow: 'hover:shadow-blue-500/50' },
    red: { bg: 'bg-red-600', shadow: 'hover:shadow-red-500/50' },
    green: { bg: 'bg-green-600', shadow: 'hover:shadow-green-500/50' },
    yellow: { bg: 'bg-yellow-600', shadow: 'hover:shadow-yellow-500/50' },
    purple: { bg: 'bg-purple-600', shadow: 'hover:shadow-purple-500/50' },
    gray: { bg: 'bg-gray-600', shadow: 'hover:shadow-gray-500/50' },
  };

  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 font-sans p-4">
      <div className="relative text-center p-6 md:p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-yellow-500 max-w-6xl w-full h-[90vh] flex flex-col">
        {currentUser ? (
          <UserProfile user={currentUser} onLogout={onLogout} />
        ) : (
          <button
            onClick={() => handleAction(onLogin)}
            className="absolute top-4 right-4 flex items-center justify-center space-x-2 px-4 py-2 font-bold text-sm bg-white hover:bg-gray-200 text-gray-800 rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.33,44,30.024,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            <span>Login</span>
          </button>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-yellow-400 mb-4 tracking-tighter">
          Google Maps Emojis
        </h1>
        <p className="text-gray-300 mb-8">Select a chapter to begin your Solana adventure!</p>

        <div className="relative flex-grow w-full rounded-lg bg-gray-900/50 border border-gray-700">
           {/* Decorative Path */}
           <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <path d="M 180 180 C 250 280, 300 380, 380 480 C 450 550, 550 500, 650 400 C 700 350, 800 320, 900 250" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" strokeDasharray="15 15" />
           </svg>

          {CHAPTERS.map(chapter => {
            const chapterColors = colorClasses[chapter.color] || colorClasses.gray;
            return (
                <div
                key={chapter.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: chapter.position.top, left: chapter.position.left }}
                >
                <button
                    onClick={() => handleAction(() => onSelectChapter(chapter))}
                    className={`group relative w-24 h-24 rounded-full border-4 border-white/50 ${chapterColors.bg} ${chapterColors.shadow} transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-2xl`}
                >
                    <div className="flex items-center justify-center w-full h-full text-5xl">
                    {chapter.emoji}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-black/70 rounded-md text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {chapter.name}
                    </div>
                </button>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;