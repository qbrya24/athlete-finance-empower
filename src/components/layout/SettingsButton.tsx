
import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/settings')}
      className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-all button-hover"
      aria-label="Settings"
    >
      <Settings className="w-5 h-5" />
    </button>
  );
};

export default SettingsButton;
