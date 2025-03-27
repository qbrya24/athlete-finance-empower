
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeIn } from '@/components/animations/FadeIn';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState<'new' | 'existing' | null>(null);

  // Check if user has used the app before
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleUserSelection = (state: 'new' | 'existing') => {
    setUserState(state);
    setTimeout(() => {
      if (state === 'new') {
        navigate('/onboarding');
      } else {
        // For now, just go to dashboard since we don't have auth
        navigate('/dashboard');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
      <div 
        className={cn(
          "w-full max-w-md transition-all duration-700",
          loading ? "scale-100" : "scale-90"
        )}
      >
        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-12 relative">
          <FadeIn>
            <Logo size="lg" className="mb-6" />
          </FadeIn>
          
          <FadeIn delay={300}>
            <h1 className="text-center text-green text-3xl font-semibold mt-4 mb-2">
              Final Whistle Wealth
            </h1>
          </FadeIn>
          
          <FadeIn delay={500}>
            <p className="text-center text-green/80 max-w-sm mx-auto mb-8">
              Empowering athletes to make smart financial decisions and secure their futures beyond the game.
            </p>
          </FadeIn>
        </div>

        {/* Options */}
        {!loading && (
          <div className="space-y-4">
            <FadeIn delay={700}>
              <button
                onClick={() => handleUserSelection('new')}
                className={cn(
                  "w-full p-4 rounded-xl text-left",
                  "bg-green text-white",
                  "border border-green/5 hover:border-green/10",
                  "transition-all shadow-md",
                  "hover:shadow-lg hover:scale-[1.02]",
                  "active:scale-[0.98]",
                  userState === 'new' ? "scale-[1.02]" : ""
                )}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white/20 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" x2="19" y1="8" y2="14" />
                      <line x1="22" x2="16" y1="11" y2="11" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">New User</h3>
                    <p className="text-white/80 text-sm">Create a new account and start your journey</p>
                  </div>
                </div>
              </button>
            </FadeIn>
            
            <FadeIn delay={900}>
              <button
                onClick={() => handleUserSelection('existing')}
                className={cn(
                  "w-full p-4 rounded-xl text-left",
                  "bg-gold text-white",
                  "border border-gold/5 hover:border-gold/10",
                  "transition-all shadow-md",
                  "hover:shadow-lg hover:scale-[1.02]",
                  "active:scale-[0.98]",
                  userState === 'existing' ? "scale-[1.02]" : ""
                )}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white/20 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Existing User</h3>
                    <p className="text-white/80 text-sm">Welcome back, continue your progress</p>
                  </div>
                </div>
              </button>
            </FadeIn>
          </div>
        )}

        {/* Logo at bottom */}
        <div className="flex justify-center mt-16">
          <Logo size="sm" variant="icon" className="opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default Index;
