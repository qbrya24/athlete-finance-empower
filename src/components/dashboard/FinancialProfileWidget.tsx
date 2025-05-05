
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from '@/components/ui/use-toast';
import ProfileTypeDisplay from './profile/ProfileTypeDisplay';
import ProfileLoadingState from './profile/ProfileLoadingState';
import EmptyProfileState from './profile/EmptyProfileState';
import { getProfileTypeInfo, getLiteracyScoreText, type ProfileData } from './profile/profileUtils';

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

  // Show loading state
  if (isLoading) {
    return <ProfileLoadingState />;
  }

  // Show empty state if no profile data
  if (!profileData?.primary_investor_profile) {
    return <EmptyProfileState />;
  }

  const primaryProfile = profileData.primary_investor_profile 
    ? getProfileTypeInfo(profileData.primary_investor_profile, profileData)
    : null;
    
  const secondaryProfile = profileData.secondary_investor_profile 
    ? getProfileTypeInfo(profileData.secondary_investor_profile, profileData)
    : null;

  const literacyScore = getLiteracyScoreText(profileData?.financial_literacy_score);

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
          {primaryProfile && <ProfileTypeDisplay profileInfo={primaryProfile} />}
          {secondaryProfile && <ProfileTypeDisplay profileInfo={secondaryProfile} isSecondary />}
          
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
