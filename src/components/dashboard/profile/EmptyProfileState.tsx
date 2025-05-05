
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const EmptyProfileState: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Financial Profile</CardTitle>
        <CardDescription>Complete your assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <User className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500">You haven't completed the financial assessment yet.</p>
          <a
            href="/onboarding"
            className="mt-4 px-4 py-2 bg-green text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Take Assessment
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyProfileState;
