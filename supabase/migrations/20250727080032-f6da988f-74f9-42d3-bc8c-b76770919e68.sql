-- Create purchase_history table for tracking user purchases
CREATE TABLE public.purchase_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  product_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  game_username TEXT NOT NULL,
  game_password TEXT NOT NULL,
  purchase_method TEXT,
  category TEXT NOT NULL DEFAULT 'Game Account',
  purchase_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.purchase_history ENABLE ROW LEVEL SECURITY;

-- Create policies for purchase_history
CREATE POLICY "Users can view their own purchase history" 
ON public.purchase_history 
FOR SELECT 
USING (user_email = (SELECT email FROM public.dataname WHERE email = user_email));

CREATE POLICY "System can insert purchase records" 
ON public.purchase_history 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_purchase_history_updated_at
BEFORE UPDATE ON public.purchase_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();