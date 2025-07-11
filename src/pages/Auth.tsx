
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/ui/Logo';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Check URL parameters on component mount and pre-fill test data
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('signup') === 'true') {
      setIsSignUp(true);
      // Pre-fill with test data for easy account creation
      setFormData({
        email: 'john.athlete@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Athlete',
        phone: '555-123-4567',
      });
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // When signing up, add the user metadata which will populate the profiles table
        // through the database trigger
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              name: `${formData.firstName} ${formData.lastName}`,
              phone: formData.phone,
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created successfully",
          description: "Your account has been created and your profile information has been saved.",
          variant: "default",
        });
        
        // Redirect new users to the onboarding process
        navigate('/onboarding');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        
        // Existing users go directly to dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <Logo size="lg" className="mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-green-700">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-green-500 mt-2">
            {isSignUp 
              ? 'Start your journey to better financial health' 
              : 'Sign in to continue your progress'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-green-600 mb-2">First Name</label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required={isSignUp}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-green-600 mb-2">Last Name</label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required={isSignUp}
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-green-600 mb-2">Phone Number</label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required={isSignUp}
                    className="w-full"
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="email" className="block text-green-600 mb-2">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-green-600 mb-2">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full"
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </div>
            ) : (
              isSignUp ? 'Create account' : 'Sign in'
            )}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-green-500 hover:text-green-700 text-sm transition-colors"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
