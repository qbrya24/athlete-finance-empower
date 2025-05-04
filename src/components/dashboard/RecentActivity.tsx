
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, BarChart3, Newspaper } from 'lucide-react';

const RecentActivity: React.FC = () => {
  return (
    <FadeIn delay={300}>
      <div className="bg-green rounded-xl p-4 md:p-5 shadow-sm border border-cream/10 text-cream">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-cream/10">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-cream" />
              </div>
              <div>
                <div className="font-medium text-sm">Completed Module 1</div>
                <div className="text-xs text-cream/70">Financial Basics</div>
              </div>
            </div>
            <div className="text-xs text-cream/70">2 days ago</div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-cream/10">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gold/30 flex items-center justify-center mr-3">
                <BarChart3 className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="font-medium text-sm">Updated Budget</div>
                <div className="text-xs text-cream/70">Added new expense categories</div>
              </div>
            </div>
            <div className="text-xs text-cream/70">1 week ago</div>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center mr-3">
                <Newspaper className="w-4 h-4 text-cream" />
              </div>
              <div>
                <div className="font-medium text-sm">New NIL Regulations</div>
                <div className="text-xs text-cream/70">Important updates for athletes</div>
              </div>
            </div>
            <div className="text-xs text-cream/70">1 week ago</div>
          </div>
        </div>
        
        <button
          className="w-full mt-3 py-2 text-center text-cream border border-cream/20 rounded-lg hover:bg-cream/10 transition-colors text-sm"
        >
          View All Activity
        </button>
      </div>
    </FadeIn>
  );
};

export default RecentActivity;
