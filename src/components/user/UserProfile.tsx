
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/providers/AuthProvider';
import { getUserInitials, getGravatarUrl } from '@/utils/userUtils';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleProfileClick = () => {
    navigate('/settings');
  };
  
  if (!user) return null;
  
  const email = user.email || '';
  const initials = getUserInitials(email);
  const avatarUrl = getGravatarUrl(email);

  return (
    <button
      onClick={handleProfileClick}
      className="flex items-center justify-center rounded-full hover:bg-green-50 p-1 transition-colors"
      aria-label="Your profile"
    >
      <Avatar className="h-8 w-8 border border-green-100">
        <AvatarImage src={avatarUrl} alt={email} />
        <AvatarFallback className="bg-green-100 text-green-700 text-xs font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
    </button>
  );
};

export default UserProfile;
