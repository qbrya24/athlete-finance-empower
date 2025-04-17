
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaidAccount } from '@/services/plaid';
import { DollarSign, AlertCircle } from 'lucide-react';

interface BankAccountsProps {
  userId?: string;
  onAccountSelect?: (account: PlaidAccount) => void;
}

const BankAccounts: React.FC<BankAccountsProps> = ({ userId, onAccountSelect }) => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<PlaidAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase.functions.invoke('plaid-get-accounts', {});
        
        if (error) throw error;
        
        if (data && Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
        } else {
          setAccounts([]);
        }
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Could not load your connected accounts. Please try again later.');
        toast({
          title: "Error",
          description: "Could not load your connected accounts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [userId, toast]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex items-center text-destructive">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (accounts.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No bank accounts connected yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <Card 
          key={account.id} 
          className="w-full hover:bg-accent/50 transition-colors cursor-pointer"
          onClick={() => onAccountSelect && onAccountSelect(account)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              {account.institution?.name || 'Bank Account'} 
              <span className="ml-2 text-sm text-muted-foreground">••••{account.mask}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{account.type} • {account.subtype}</p>
              </div>
              <div className="flex items-center text-lg font-semibold">
                <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                {account.balance.available !== undefined 
                  ? account.balance.available.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : account.balance.current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BankAccounts;
