import React, { useState } from 'react';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import PlaidLink from '@/components/plaid/PlaidLink';
import BankAccounts from '@/components/plaid/BankAccounts';
import { PlaidAccount } from '@/services/plaid';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Link2, Wallet, Bank } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const BankConnections = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<PlaidAccount | null>(null);

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

  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-cream text-green rounded-full text-xs font-medium mb-2">
                Financial Connections
              </span>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Bank Accounts</h1>
              <p className="text-muted-foreground mt-1">Connect your financial accounts securely using Plaid</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium mb-4">Your Connected Accounts</h2>
              
              <BankAccounts 
                userId={user?.id} 
                onAccountSelect={handleAccountSelect} 
              />
              
              <div className="mt-6">
                <PlaidLink 
                  onSuccess={handlePlaidSuccess}
                  buttonText={isConnecting ? "Connecting..." : "Connect a New Account"}
                  className="w-full justify-center"
                />
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link2 className="w-5 h-5 mr-2 text-green" />
                    How It Works
                  </CardTitle>
                  <CardDescription>
                    Securely connect your financial accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green/10 p-2 rounded-full mr-3">
                      <Bank className="w-5 h-5 text-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Choose Your Bank</h3>
                      <p className="text-sm text-muted-foreground">
                        Select from thousands of supported financial institutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green/10 p-2 rounded-full mr-3">
                      <Wallet className="w-5 h-5 text-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">View Your Finances</h3>
                      <p className="text-sm text-muted-foreground">
                        Get insights into your spending, savings, and investments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground border-t pt-4">
                    Your data is encrypted and secure. We use Plaid to securely connect to your bank.
                    We never store your banking credentials.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>
      </div>
    </AppLayout>
  );
};

export default BankConnections;
