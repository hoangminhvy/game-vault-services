-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create products table for game accounts
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can update products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Only admins can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, category, price, description) VALUES
('Tài khoản Liên Quân VIP', 'liên quân', 150000, 'Tài khoản Liên Quân Mobile với nhiều tướng quý hiếm'),
('Account FreeFire Pro', 'freefire', 200000, 'Tài khoản FreeFire với skin súng đẹp'),
('Roblox Premium Account', 'roblox', 100000, 'Tài khoản Roblox với Robux và items đẹp'),
('Liên Quân Siêu VIP', 'liên quân', 350000, 'Tài khoản có đầy đủ tướng và skin'),
('FreeFire Elite', 'freefire', 280000, 'Tài khoản FreeFire cấp cao với nhiều skin'),
('Roblox Developer', 'roblox', 180000, 'Tài khoản Roblox cho developer');