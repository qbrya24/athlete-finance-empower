
import React from 'react';
import { PiggyBank, TrendingUp, Wallet, User } from 'lucide-react';

interface ProfileTypeInfo {
  type: string;
  score: number;
  description: string;
  iconType: 'PiggyBank' | 'Wallet' | 'TrendingUp' | 'User';
  traits: string[];
  color: string;
}

interface ProfileTypeDisplayProps {
  profileInfo: ProfileTypeInfo;
  isSecondary?: boolean;
}

const ProfileTypeDisplay: React.FC<ProfileTypeDisplayProps> = ({ 
  profileInfo,
  isSecondary = false 
}) => {
  // Render the appropriate icon based on iconType
  const renderIcon = () => {
    switch (profileInfo.iconType) {
      case 'PiggyBank':
        return <PiggyBank className="w-6 h-6 text-cream" />;
      case 'Wallet':
        return <Wallet className="w-6 h-6 text-cream" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-cream" />;
      case 'User':
      default:
        return <User className="w-6 h-6 text-cream" />;
    }
  };

  return (
    <div className={isSecondary ? '' : 'mb-4'}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-full ${profileInfo.color}`}>
          {renderIcon()}
        </div>
        <div>
          <h3 className="font-semibold">
            {isSecondary ? 'Secondary: ' : 'Primary: '}
            {profileInfo.type}
          </h3>
          <p className="text-sm text-gray-600">{profileInfo.description}</p>
        </div>
      </div>
      
      {!isSecondary && profileInfo.traits && (
        <div className="flex flex-wrap gap-2 mt-2">
          {profileInfo.traits.map((trait) => (
            <span key={trait} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
              {trait}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileTypeDisplay;
