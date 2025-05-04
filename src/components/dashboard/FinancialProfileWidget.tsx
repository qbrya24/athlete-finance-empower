
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, PiggyBank, Wallet, TrendingUp } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/components/ui/use-toast';

interface ProfileTypeInfo {
  type: string;
  score: number;
  description: string;
  icon: React.ReactNode;
  traits: string[];
  color: string;
}

const FinancialProfileWidget: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['userProfileData'],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('primary_investor_profile, secondary_investor_profile, saver_score, spender_score, investor_score, financial_literacy_score')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
        throw error;
      }

      return data;
    }
  });

  const getProfileTypeInfo = (type: string | null): ProfileTypeInfo => {
    switch (type) {
      case 'Saver':
        return {
          type: 'Saver',
          score: profileData?.saver_score || 0,
          description: 'You prioritize financial security and are careful with your money.',
          icon: <PiggyBank className="w-6 h-6 text-cream" />,
          traits: ['Risk-averse', 'Security-focused', 'Disciplined'],
          color: 'bg-green-500/80'
        };
      case 'Spender':
        return {
          type: 'Spender',
          score: profileData?.spender_score || 0,
          description: 'You enjoy using your money for experiences and possessions.',
          icon: <Wallet className="w-6 h-6 text-cream" />,
          traits: ['Experience-oriented', 'Present-focused', 'Spontaneous'],
          color: 'bg-gold/80'
        };
      case 'Investor':
        return {
          type: 'Investor',
          score: profileData?.investor_score || 0,
          description: 'You focus on growing your wealth through investments.',
          icon: <TrendingUp className="w-6 h-6 text-cream" />,
          traits: ['Growth-minded', 'Strategic', 'Future-oriented'],
          color: 'bg-blue-500/80'
        };
      default:
        return {
          type: 'Unknown',
          score: 0,
          description: 'Your financial profile could not be determined.',
          icon: <User className="w-6 h-6 text-cream" />,
          traits: ['Complete the assessment to learn more'],
          color: 'bg-gray-500'
        };
    }
  };

  const primaryProfile = profileData?.primary_investor_profile 
    ? getProfileTypeInfo(profileData.primary_investor_profile)
    : null;
    
  const secondaryProfile = profileData?.secondary_investor_profile 
    ? getProfileTypeInfo(profileData.secondary_investor_profile)
    : null;

  const getLiteracyScoreText = (score: number | null | undefined): { text: string, color: string } => {
    if (!score) return { text: 'Not assessed', color: 'text-gray-500' };
    
    if (score >= 80) return { text: 'Excellent', color: 'text-green-500' };
    if (score >= 60) return { text: 'Good', color: 'text-yellow-600' };
    return { text: 'Needs improvement', color: 'text-red-400' };
  };
  
  const literacyScore = getLiteracyScoreText(profileData?.financial_literacy_score);

  if (isLoading) {
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
  }

  if (!profileData?.primary_investor_profile) {
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
  }

  return (
    <FadeIn delay={200}>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Your Financial Profile</CardTitle>
              <CardDescription>Based on your assessment</CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500">Financial Literacy</span>
              <span className={`text-sm font-medium ${literacyScore.color}`}>
                {literacyScore.text} {profileData?.financial_literacy_score}%
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {primaryProfile && (
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${primaryProfile.color}`}>
                  {primaryProfile.icon}
                </div>
                <div>
                  <h3 className="font-semibold">Primary: {primaryProfile.type}</h3>
                  <p className="text-sm text-gray-600">{primaryProfile.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {primaryProfile.traits.map((trait) => (
                  <span key={trait} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {secondaryProfile && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${secondaryProfile.color}`}>
                  {secondaryProfile.icon}
                </div>
                <div>
                  <h3 className="font-semibold">Secondary: {secondaryProfile.type}</h3>
                  <p className="text-sm text-gray-600">{secondaryProfile.description}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t">
            <a 
              href="/financial-tools"
              className="text-green hover:text-green-600 text-sm flex items-center"
            >
              View detailed financial insights
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default FinancialProfileWidget;
