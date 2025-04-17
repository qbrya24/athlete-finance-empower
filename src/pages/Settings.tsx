
import React, { useState } from 'react';
import { Bell, Lock, User, CreditCard, HelpCircle, FileText, LogOut, ChevronRight, Shield, BarChart } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // Actual logout logic would go here
  };
  
  return (
    <AppLayout>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-cream text-gray-800'}`}>
        <div className="max-w-md mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-700">Settings</h1>
          </div>
          
          {/* Settings Categories */}
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-green-600 mb-3">Account</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-green-500 mr-3" />
                    <span>Profile Information</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 text-green-500 mr-3" />
                    <span>Security & Password</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-green-500 mr-3" />
                    <span>Connected Accounts</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Financial Preferences */}
            <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-green-600 mb-3">Financial Preferences</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <BarChart className="w-5 h-5 text-green-500 mr-3" />
                    <span>Budgeting Categories</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <span>NIL Management</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-green-600 mb-3">Notifications</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-green-500 mr-3" />
                    <span>Push Notifications</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-green-500 mr-3" />
                    <span>Email Preferences</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* App Preferences */}
            <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-green-600 mb-3">App Preferences</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <div className="flex items-center">
                    <span>Dark Mode</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={darkMode} 
                      onChange={() => setDarkMode(!darkMode)} 
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <span>Language</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">English</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Support & Legal */}
            <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-green-600 mb-3">Support & Legal</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Help Center</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-500 mr-3" />
                    <span>Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-500 mr-3" />
                    <span>Terms of Service</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Log Out Button */}
            <button 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </button>
            
            {/* Version Info */}
            <p className="text-center text-gray-500 text-sm mt-4 dark:text-gray-400">
              Final Whistle Wealth v1.0.0
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
