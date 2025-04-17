
// This file contains Plaid integration methods and utility functions

// Plaid API endpoints for our Supabase Edge Function 
// (to be implemented separately for security)
export const PLAID_API = {
  createLinkToken: "/api/plaid/create-link-token",
  exchangePublicToken: "/api/plaid/exchange-public-token",
  getAccounts: "/api/plaid/get-accounts",
};

// Types for Plaid data
export interface PlaidLinkToken {
  linkToken: string;
  expiration: string;
}

export interface PlaidAccount {
  id: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
  balance: {
    available: number;
    current: number;
    limit?: number;
  };
  institution?: {
    name: string;
    logo?: string;
  };
}

export interface PlaidError {
  error_code: string;
  error_message: string;
  error_type: string;
}
