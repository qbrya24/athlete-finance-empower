
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Calculator, DollarSign } from 'lucide-react';

const AffordabilityCalculator: React.FC = () => {
  return (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Can You Afford This?</h2>
        
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Purchase Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-cream/60" />
              </div>
              <input 
                type="number" 
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Monthly Income</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-cream/60" />
              </div>
              <input 
                type="number" 
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Monthly Expenses</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-cream/60" />
              </div>
              <input 
                type="number" 
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <button className="w-full py-3 bg-gold text-cream font-medium rounded-md hover:bg-gold-400 transition-colors">
            Calculate Affordability
          </button>
          
          <div className="mt-6 p-4 border border-cream/20 rounded-lg bg-cream/10">
            <p className="text-center text-sm">Enter your financial details above to see if you can afford this purchase</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default AffordabilityCalculator;
