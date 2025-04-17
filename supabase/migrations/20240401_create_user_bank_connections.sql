
-- Create a table to store Plaid item data
CREATE TABLE IF NOT EXISTS public.user_bank_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plaid_item_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  institution_name TEXT,
  institution_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS user_bank_connections_user_id_idx ON public.user_bank_connections(user_id);

-- Create a unique constraint on user_id and plaid_item_id to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS user_bank_connections_user_id_plaid_item_id_idx 
ON public.user_bank_connections(user_id, plaid_item_id);

-- Set up RLS (Row Level Security)
ALTER TABLE public.user_bank_connections ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own connections
CREATE POLICY user_bank_connections_select_policy ON public.user_bank_connections
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to only insert their own connections
CREATE POLICY user_bank_connections_insert_policy ON public.user_bank_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to only update their own connections
CREATE POLICY user_bank_connections_update_policy ON public.user_bank_connections
  FOR UPDATE USING (auth.uid() = user_id);
