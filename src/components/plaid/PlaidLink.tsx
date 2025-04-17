
import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink, PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface PlaidLinkProps {
  onSuccess?: (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => void;
  onExit?: () => void;
  className?: string;
  buttonText?: string;
}

const PlaidLink: React.FC<PlaidLinkProps> = ({ 
  onSuccess, 
  onExit, 
  className,
  buttonText = "Connect your bank account" 
}) => {
  const { toast } = useToast();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get a link token from our backend
  const getLinkToken = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('plaid-create-link-token', {});
      
      if (error) throw error;
      if (data?.link_token) {
        setLinkToken(data.link_token);
      } else {
        throw new Error('No link token returned');
      }
    } catch (err) {
      console.error('Error getting link token:', err);
      toast({
        title: "Error",
        description: "Could not initialize Plaid connection. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getLinkToken();
  }, [getLinkToken]);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: (public_token, metadata) => {
      console.log('Plaid Link Success:', metadata);
      if (onSuccess) {
        onSuccess(public_token, metadata);
      }
    },
    onExit: (err, metadata) => {
      console.log('Plaid Link Exit:', err, metadata);
      if (err) {
        toast({
          title: "Connection Cancelled",
          description: err.display_message || "The bank connection was cancelled.",
          variant: "default",
        });
      }
      if (onExit) {
        onExit();
      }
    },
    onEvent: (eventName, metadata) => {
      console.log('Plaid Link Event:', eventName, metadata);
    },
  });

  return (
    <Button
      onClick={() => open()}
      disabled={!ready || !linkToken || isLoading}
      className={className}
      variant="default"
    >
      {isLoading ? "Loading..." : buttonText}
    </Button>
  );
};

export default PlaidLink;
