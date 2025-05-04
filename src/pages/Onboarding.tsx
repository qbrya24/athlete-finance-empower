
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import FadeIn from '@/components/animations/FadeIn';
import QuestionnaireForm from '@/components/onboarding/QuestionnaireForm';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/providers/AuthProvider';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);
  
  return (
    <AppLayout withNavigation={false}>
      <div className="min-h-screen bg-cream flex flex-col">
        <header className="py-4 px-4 border-b border-green/5">
          <div className="container max-w-4xl mx-auto flex items-center justify-between">
            <Logo size="sm" />
            <div className="text-sm text-green/70">
              <span className="font-medium">Financial Mindset Assessment</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 overflow-y-auto">
          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Financial Knowledge & Mindset</h2>
              <p className="text-green/70 mb-6">
                Complete this assessment to determine your financial profile and knowledge level.
              </p>
              
              <QuestionnaireForm />
            </div>
          </FadeIn>
        </main>
      </div>
    </AppLayout>
  );
};

export default Onboarding;
