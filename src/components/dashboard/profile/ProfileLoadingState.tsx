
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileLoadingState: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Financial Profile</CardTitle>
        <CardDescription>Loading your profile...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center">
          <div className="animate-pulse w-full h-full bg-gray-200 rounded-md"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileLoadingState;
