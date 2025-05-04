
import React, { useEffect } from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ResultsScreenProps {
  results: {
    literacyScore: {
      correct: number;
      total: number;
      percentage: number;
    };
    profile: {
      primaryProfile: string;
      secondaryProfile: string;
      profiles: {
        type: string;
        score: number;
      }[];
    };
  };
  onFinish: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onFinish }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Save financial literacy score to the user's profile
    const saveFinancialLiteracyScore = async () => {
      if (!user) return;
      
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ financial_literacy_score: results.literacyScore.percentage })
          .eq('id', user.id);
          
        if (error) {
          console.error('Error saving financial literacy score:', error);
          toast({
            title: "Error",
            description: "Failed to save your financial literacy score. Your progress has been recorded locally.",
            variant: "destructive"
          });
        } else {
          console.log('Financial literacy score saved successfully');
        }
      } catch (error) {
        console.error('Error saving financial literacy score:', error);
      }
    };
    
    saveFinancialLiteracyScore();
  }, [user, results.literacyScore.percentage]);
  
  const handleFinish = () => {
    // Navigate to dashboard after onboarding completion
    navigate('/dashboard');
  };

  const profileData = results.profile.profiles.map((profile) => ({
    name: profile.type,
    score: profile.score,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-2">Your Financial Profile</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="bg-green-50 rounded-full p-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-green">{results.profile.primaryProfile}</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold">You are primarily a {results.profile.primaryProfile}</h4>
              <p className="text-gray-500">
                With {results.profile.secondaryProfile} tendencies
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={profileData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Financial Literacy Score</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className={`
              rounded-full p-6 flex items-center justify-center
              ${results.literacyScore.percentage >= 80 ? 'bg-green-50 text-green' : 
                results.literacyScore.percentage >= 60 ? 'bg-yellow-50 text-yellow-600' : 
                'bg-red-50 text-red-500'}
            `}>
              <span className="text-2xl font-bold">{results.literacyScore.percentage}%</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold">You scored {results.literacyScore.correct} out of {results.literacyScore.total}</h4>
              <p className="text-gray-500">
                {results.literacyScore.percentage >= 80 ? 'Excellent! You have strong financial knowledge.' : 
                 results.literacyScore.percentage >= 60 ? 'Good job! You have decent financial knowledge.' : 
                 'There\'s room for improvement in your financial knowledge.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Button 
          onClick={handleFinish} 
          className="px-8 py-6 bg-green text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
