
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCard, PlusCircle, ArrowUpRight } from 'lucide-react';

interface BankAccount {
  id: string;
  name: string;
  mask: string;
  balance: {
    available: number;
    current: number;
  };
  institution?: {
    name: string;
  };
}

const BankAccountsWidget = () => {
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('plaid-get-accounts', {});
      
      if (error) throw error;
      return data.accounts;
    }
  });

  const handleConnectBank = () => {
    navigate('/bank-connections');
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2" />
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2" />
            Bank Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">Unable to load your bank accounts</p>
            <Button onClick={handleConnectBank} variant="outline">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const accounts = data as BankAccount[] || [];
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex justify-between items-start">
        <CardTitle className="flex items-center text-lg">
          <CreditCard className="w-5 h-5 mr-2" />
          Bank Accounts
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs" 
          onClick={() => navigate('/bank-connections')}
        >
          View All
          <ArrowUpRight className="ml-1 w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">No bank accounts connected yet</p>
            <Button onClick={handleConnectBank} className="flex items-center">
              <PlusCircle className="mr-2 w-4 h-4" />
              Connect Your Bank
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {accounts.slice(0, 3).map((account) => (
              <div key={account.id} className="p-3 bg-accent/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {account.institution?.name || 'Bank'} ••••{account.mask}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(account.balance.available || account.balance.current || 0)
                        .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              </div>
            ))}
            
            {accounts.length > 3 && (
              <Button 
                variant="ghost" 
                className="w-full text-xs" 
                onClick={() => navigate('/bank-connections')}
              >
                View {accounts.length - 3} more accounts
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BankAccountsWidget;
