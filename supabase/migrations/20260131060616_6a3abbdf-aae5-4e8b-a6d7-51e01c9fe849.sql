-- Create table for Telegram bot users
CREATE TABLE public.telegram_bot_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id BIGINT NOT NULL UNIQUE,
  language VARCHAR(5) DEFAULT 'en',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_telegram_bot_users_chat_id ON public.telegram_bot_users(chat_id);

-- Enable RLS
ALTER TABLE public.telegram_bot_users ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to manage users (using service role)
CREATE POLICY "Service role can manage telegram users"
ON public.telegram_bot_users
FOR ALL
USING (true)
WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER update_telegram_bot_users_updated_at
BEFORE UPDATE ON public.telegram_bot_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();