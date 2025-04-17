
import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Book, BarChart3, Newspaper as NewspaperIcon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import SettingsButton from './SettingsButton';
import UserProfile from '@/components/user/UserProfile';

interface AppLayoutProps {
  children: ReactNode;
  withNavigation?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  withNavigation = true
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isFinancialTools = location.pathname === '/financial-tools';
  
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Add meta viewport tag for proper scaling and iPhone optimization
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1.0');
    }
    
    // iPhone 16:9 optimizations
    const handleResize = () => {
      if (isMobile) {
        document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        document.documentElement.style.setProperty('--app-width', `${window.innerWidth}px`);
        
        // Calculate and set viewport height for iPhone 16:9 aspect ratio
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const navigation = [
    { name: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Education', path: '/education', icon: <Book className="w-5 h-5" /> },
    { name: 'Financial Tools', path: '/financial-tools', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'News', path: '/news', icon: <NewspaperIcon className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  if (!withNavigation) {
    return (
      <main className="min-h-screen bg-cream mobile-safe-area safe-area-inset-top safe-area-inset-bottom">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-green/10 px-3 sm:px-4 py-3 safe-area-inset-top">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="sm" variant={isMobile ? "icon" : "full"} />
          
          <div className="flex items-center gap-2">
            <UserProfile />
            <SettingsButton />
            <button 
              className="md:hidden text-green p-2 mobile-touch-target"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  "hover:bg-green-50 button-hover",
                  isActive(item.path) 
                    ? "text-green bg-green-50" 
                    : "text-green/70"
                )}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div 
        className={cn(
          "fixed inset-0 z-30 bg-black/50 md:hidden transition-opacity backdrop-blur-sm",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
      />
      
      <nav 
        className={cn(
          "fixed top-[61px] left-0 right-0 z-30 bg-white border-b border-green/10 shadow-lg md:hidden",
          "transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col p-3 sm:p-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              className={cn(
                "px-4 py-3 rounded-lg text-left text-base font-medium transition-all mobile-touch-target",
                "hover:bg-green-50 flex items-center gap-3",
                isActive(item.path) 
                  ? "text-green bg-green-50" 
                  : "text-green/70"
              )}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-green/10 shadow-lg flex justify-around items-center safe-area-inset-bottom">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center py-3 px-2 w-full mobile-touch-target transition-colors",
              isActive(item.path) 
                ? "text-green bg-green-50/50" 
                : "text-green/60"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.name}</span>
          </button>
        ))}
      </div>

      <main className={cn(
        "pt-[61px] pb-[72px] md:pb-0 min-h-screen",
        isFinancialTools && "financial-tool-container"
      )}>
        <div className={cn(
          "container mx-auto px-3 sm:px-4 py-4 overflow-auto content-wrapper",
          isFinancialTools && "no-scrollbar"
        )}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
