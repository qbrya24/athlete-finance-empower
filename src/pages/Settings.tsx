
import React, { useState } from 'react';
import { Bell, Lock, User, CreditCard, HelpCircle, FileText, LogOut, ChevronRight, Shield, BarChart, Building, Wallet, Link2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/providers/AuthProvider';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { supabase } from '@/integrations/supabase/client';
import PlaidLink from '@/components/plaid/PlaidLink';
import BankAccounts from '@/components/plaid/BankAccounts';
import { PlaidAccount } from '@/services/plaid';
import FadeIn from '@/components/animations/FadeIn';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<PlaidAccount | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // Actual logout logic would go here
  };

  const handlePlaidSuccess = async (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => {
    console.log('Public token received', publicToken);
    setIsConnecting(true);
    
    try {
      const { error } = await supabase.functions.invoke('plaid-exchange-token', {
        body: { 
          public_token: publicToken,
          institution: {
            name: metadata.institution?.name,
            id: metadata.institution?.institution_id
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Success!',
        description: `Successfully connected to ${metadata.institution?.name}`,
      });
      
      // Force refresh of account data
      window.location.reload();
    } catch (err) {
      console.error('Error exchanging token:', err);
      toast({
        title: 'Connection Failed',
        description: 'There was a problem connecting your account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAccountSelect = (account: PlaidAccount) => {
    setSelectedAccount(account);
    toast({
      title: 'Account Selected',
      description: `You selected ${account.name}`,
    });
  };

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  }
  
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
                
                <div 
                  className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => toggleSection('bankConnections')}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-green-500 mr-3" />
                    <span>Connected Accounts</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform ${activeSection === 'bankConnections' ? 'rotate-90' : ''}`} />
                </div>
                
                {activeSection === 'bankConnections' && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-md font-medium mb-3">Your Connected Bank Accounts</h3>
                    
                    <BankAccounts 
                      userId={user?.id} 
                      onAccountSelect={handleAccountSelect} 
                    />
                    
                    <div className="mt-4">
                      <PlaidLink 
                        onSuccess={handlePlaidSuccess}
                        buttonText={isConnecting ? "Connecting..." : "Connect a New Account"}
                        className="w-full justify-center text-sm"
                      />
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm">
                      <div className="flex items-start mb-3">
                        <Building className="w-4 h-4 text-green-600 mt-0.5 mr-2" />
                        <p className="text-green-700">Connect your financial accounts securely using Plaid.</p>
                      </div>
                      <p className="text-xs text-green-600">Your data is encrypted and secure. We never store your banking credentials.</p>
                    </div>
                  </div>
                )}
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
