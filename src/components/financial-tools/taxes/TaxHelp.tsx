
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Receipt } from 'lucide-react';

const TaxHelp: React.FC = () => {
  return (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Tax Help Center</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-cream/10 rounded-lg p-6 border border-cream/20">
            <h3 className="text-lg font-medium mb-3">Income Tax Calculator</h3>
            <p className="text-sm text-cream/80 mb-4">Estimate your tax liability based on your income sources</p>
            <button className="px-4 py-2 bg-gold text-cream rounded-md text-sm hover:bg-gold-400 transition-colors">
              Calculate Now
            </button>
          </div>
          
          <div className="bg-cream/10 rounded-lg p-6 border border-cream/20">
            <h3 className="text-lg font-medium mb-3">NIL Tax Guidelines</h3>
            <p className="text-sm text-cream/80 mb-4">Learn about tax implications for your Name, Image, and Likeness income</p>
            <button className="px-4 py-2 bg-gold text-cream rounded-md text-sm hover:bg-gold-400 transition-colors">
              Read Guide
            </button>
          </div>
        </div>
        
        <div className="bg-cream/10 rounded-lg p-6 border border-cream/20 mb-6">
          <h3 className="text-lg font-medium mb-3">Schedule a Tax Consultation</h3>
          <p className="text-sm text-cream/80 mb-4">Speak with a tax professional who specializes in athlete finances</p>
          <button className="px-4 py-2 bg-gold text-cream rounded-md text-sm hover:bg-gold-400 transition-colors">
            Book Appointment
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-cream/80 mb-2">Have a tax question?</p>
          <button className="px-6 py-2 border border-cream/20 rounded-full text-sm hover:bg-cream/10 transition-colors">
            Ask Our Tax Experts
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default TaxHelp;
