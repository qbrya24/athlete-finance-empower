
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import FadeIn from '@/components/animations/FadeIn';
import QuestionnaireForm from '@/components/onboarding/QuestionnaireForm';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const OnboardingSteps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'questionnaire', title: 'Financial Mindset' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (currentStep === 0) {
      if (validateForm()) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <AppLayout withNavigation={false}>
      <div className="min-h-screen bg-cream flex flex-col">
        {/* Header */}
        <header className="py-4 px-4 border-b border-green/5">
          <div className="container max-w-4xl mx-auto flex items-center justify-between">
            <Logo size="sm" />
            <div className="text-sm text-green/70">
              <span className="font-medium">{OnboardingSteps[currentStep].title}</span>
              <span className="mx-2">•</span>
              <span>Step {currentStep + 1} of {OnboardingSteps.length}</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 overflow-y-auto">
          {currentStep === 0 && (
            <FadeIn>
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Welcome to Final Whistle Wealth</h2>
                <p className="text-green/70 mb-6">Let's start by getting to know you better</p>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-green mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-2 md:py-3 rounded-lg border bg-white
                        focus:outline-none focus:ring-2 focus:ring-green/30
                        transition-all duration-200
                        ${errors.name ? 'border-red-500' : 'border-gray-200'}
                      `}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-2 md:py-3 rounded-lg border bg-white
                        focus:outline-none focus:ring-2 focus:ring-green/30
                        transition-all duration-200
                        ${errors.email ? 'border-red-500' : 'border-gray-200'}
                      `}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-green mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-2 md:py-3 rounded-lg border bg-white
                        focus:outline-none focus:ring-2 focus:ring-green/30
                        transition-all duration-200
                        ${errors.phone ? 'border-red-500' : 'border-gray-200'}
                      `}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
          
          {currentStep === 1 && (
            <FadeIn>
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Financial Knowledge & Mindset</h2>
                <p className="text-green/70 mb-6">
                  Complete this assessment to determine your financial profile and knowledge level.
                </p>
                
                <QuestionnaireForm />
              </div>
            </FadeIn>
          )}
        </main>
        
        {/* Navigation footer (only for first step) */}
        {currentStep === 0 && (
          <footer className="py-4 px-4 border-t border-green/5 bg-white/50 mt-auto">
            <div className="container max-w-4xl mx-auto flex justify-between">
              <button
                onClick={() => navigate('/')}
                className="px-3 py-2 text-green/70 hover:text-green transition-colors flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-green text-white rounded-lg hover:bg-green-600 transition-colors flex items-center button-hover"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </footer>
        )}
      </div>
    </AppLayout>
  );
};

export default Onboarding;
