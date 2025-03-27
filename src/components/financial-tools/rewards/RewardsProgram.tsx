
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Award, PiggyBank, BarChart2, BookOpen } from 'lucide-react';

const RewardsProgram: React.FC = () => {
  return (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Rewards Program</h2>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Points</span>
            <span className="text-xl font-bold">750</span>
          </div>
          <div className="w-full h-3 bg-cream/10 rounded-full">
            <div className="h-full bg-gold rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-cream/70 mt-2 text-right">250 points until next reward tier</p>
        </div>
        
        <h3 className="text-lg font-medium mb-4">How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Complete Education Modules</h4>
              <p className="text-sm text-cream/70">100 points per module</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <PiggyBank className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Reach Savings Goals</h4>
              <p className="text-sm text-cream/70">150 points per goal achieved</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <BarChart2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Use Financial Tools</h4>
              <p className="text-sm text-cream/70">50 points per week of active use</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Read Financial News</h4>
              <p className="text-sm text-cream/70">25 points per article</p>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-cream/10 rounded-lg p-4 border border-cream/20 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-medium mb-1">Gift Card</h4>
            <p className="text-xs text-cream/70 mb-2">1,000 points</p>
            <button className="w-full py-1 bg-gold/80 text-cream rounded text-sm">Redeem</button>
          </div>
          
          <div className="bg-cream/10 rounded-lg p-4 border border-cream/20 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-medium mb-1">Financial Consultation</h4>
            <p className="text-xs text-cream/70 mb-2">2,500 points</p>
            <button className="w-full py-1 bg-cream/30 text-cream/60 rounded text-sm" disabled>Locked</button>
          </div>
          
          <div className="bg-cream/10 rounded-lg p-4 border border-cream/20 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-medium mb-1">Premium Tools</h4>
            <p className="text-xs text-cream/70 mb-2">5,000 points</p>
            <button className="w-full py-1 bg-cream/30 text-cream/60 rounded text-sm" disabled>Locked</button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default RewardsProgram;
