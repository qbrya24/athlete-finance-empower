
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import CategoryCard from '@/components/dashboard/CategoryCard';
import ResourcesSection from '@/components/dashboard/ResourcesSection';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, BarChart3, Newspaper, TrendingUp, PiggyBank, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      title: 'Educational Content',
      description: 'Learn financial concepts tailored for athletes',
      icon: <BookOpen className="w-6 h-6" />,
      path: '/education',
    },
    {
      title: 'Financial Tools',
      description: 'Track and plan your financial journey',
      icon: <BarChart3 className="w-6 h-6" />,
      path: '/financial-tools',
    },
    {
      title: 'News & Updates',
      description: 'Stay informed with athlete-specific financial news',
      icon: <Newspaper className="w-6 h-6" />,
      path: '/news',
    },
    {
      title: 'NIL Income',
      description: 'Manage your name, image, and likeness income',
      icon: <TrendingUp className="w-6 h-6" />,
      path: '/financial-tools',
    },
  ];
  
  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-6 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-cream text-green rounded-full text-xs font-medium mb-2">
                Dashboard
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Welcome to Final Whistle Wealth</h1>
            </div>
            <button
              onClick={() => navigate('/financial-tools')}
              className="flex items-center text-cream hover:text-cream/80 transition-colors"
            >
              <span className="mr-1">Financial Overview</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
            <div className="bg-green p-4 rounded-xl shadow-sm border border-cream/10 text-cream">
              <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Emergency Fund</div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold mr-2">$5,000</span>
                <span className="text-xs text-cream/70">/ $15,000 goal</span>
              </div>
              <div className="w-full h-2 bg-cream/20 rounded-full mt-2">
                <div className="h-full bg-gold rounded-full" style={{ width: '33%' }} />
              </div>
            </div>
            
            <div className="bg-green p-4 rounded-xl shadow-sm border border-cream/10 text-cream">
              <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Investments</div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold mr-2">$12,500</span>
                <span className="text-xs text-gold">+5.2%</span>
              </div>
              <div className="flex items-center mt-2">
                <PiggyBank className="w-4 h-4 text-cream mr-1" />
                <span className="text-xs text-cream/70">Diversified Portfolio</span>
              </div>
            </div>
            
            <div className="bg-green p-4 rounded-xl shadow-sm border border-cream/10 text-cream">
              <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Cash Available</div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold">$3,200</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs text-cream/70">Last updated today</span>
              </div>
            </div>
          </div>
        </FadeIn>
        
        {/* Main categories */}
        <div className="mb-8 md:mb-12">
          <FadeIn>
            <h2 className="text-xl font-semibold mb-4 md:mb-6">Get Started</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
                path={category.path}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Resources section */}
        <div className="mb-8 md:mb-12">
          <ResourcesSection />
        </div>
        
        {/* Recent activity */}
        <FadeIn delay={300}>
          <div className="bg-green rounded-xl p-4 md:p-6 shadow-sm border border-cream/10 text-cream">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-cream/10">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-cream" />
                  </div>
                  <div>
                    <div className="font-medium">Completed Module 1</div>
                    <div className="text-sm text-cream/70">Financial Basics</div>
                  </div>
                </div>
                <div className="text-sm text-cream/70">2 days ago</div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-cream/10">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3">
                    <BarChart3 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-medium">Updated Budget</div>
                    <div className="text-sm text-cream/70">Added new expense categories</div>
                  </div>
                </div>
                <div className="text-sm text-cream/70">1 week ago</div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center mr-3">
                    <Newspaper className="w-5 h-5 text-cream" />
                  </div>
                  <div>
                    <div className="font-medium">New NIL Regulations</div>
                    <div className="text-sm text-cream/70">Important updates for athletes</div>
                  </div>
                </div>
                <div className="text-sm text-cream/70">1 week ago</div>
              </div>
            </div>
            
            <button
              className="w-full mt-4 py-2 text-center text-cream border border-cream/20 rounded-lg hover:bg-cream/10 transition-colors"
            >
              View All Activity
            </button>
          </div>
        </FadeIn>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
