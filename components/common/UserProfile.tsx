import React from 'react';
import { User } from '../../types';
import { soundManager } from '../SoundManager';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    soundManager.playClick();
    onLogout();
  };

  return (
    <div className="absolute top-4 right-4 bg-gray-900/50 p-2 rounded-lg z-20 flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
        {user.avatar}
      </div>
      <div>
        <p className="font-bold text-white text-sm">{user.name}</p>
        <button
          onClick={handleLogout}
          className="text-xs text-red-400 hover:text-red-300 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
