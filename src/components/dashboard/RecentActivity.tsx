
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, BarChart3, Newspaper } from 'lucide-react';

const RecentActivity: React.FC = () => {
  return (
    <FadeIn delay={300}>
      <div className="bg-green rounded-lg p-3 shadow-sm border border-cream/10 text-cream">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between py-1.5 border-b border-cream/10">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center mr-2">
                <BookOpen className="w-3 h-3 text-cream" />
              </div>
              <div>
                <div className="font-medium text-sm">Completed Module 1</div>
                <div className="text-xs text-cream/70">Financial Basics</div>
              </div>
            </div>
            <div className="text-xs text-cream/70">2 days ago</div>
          </div>
          
          <div className="flex items-center justify-between py-1.5 border-b border-cream/10">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center mr-2">
                <BarChart3 className="w-3 h-3 text-gold" />
              </div>
              <div>
                <div className="font-medium text-sm">Updated Budget</div>
                <div className="text-xs text-cream/70">Added new expense categories</div>
              </div>
            </div>
            <div className="text-xs text-cream/70">1 week ago</div>
          </div>
          
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center mr-2">
                <Newspaper className="w-3 h-3 text-cream" />
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
          className="w-full mt-2 py-1.5 text-center text-cream border border-cream/20 rounded-lg hover:bg-cream/10 transition-colors text-sm"
        >
          View All Activity
        </button>
      </div>
    </FadeIn>
  );
};

export default RecentActivity;
