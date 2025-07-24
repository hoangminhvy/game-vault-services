-- Enable Row Level Security on dataname table
ALTER TABLE public.dataname ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for dataname table
CREATE POLICY "Users can view their own data" 
ON public.dataname 
FOR SELECT 
USING (auth.uid()::text = taikhoan);

CREATE POLICY "Users can update their own data" 
ON public.dataname 
FOR UPDATE 
USING (auth.uid()::text = taikhoan);

CREATE POLICY "Admins can view all data" 
ON public.dataname 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.dataname 
    WHERE taikhoan = auth.uid()::text 
    AND maphanquyen = 3
  )
);

-- Insert admin account
INSERT INTO public.dataname (taikhoan, email, matkhau, tien, maphanquyen) 
VALUES (
  gen_random_uuid()::text,
  'ppk67817@gmail.com',
  crypt('Hung@1988', gen_salt('bf')),
  0,
  3
) ON CONFLICT DO NOTHING;

-- Create function to verify login
CREATE OR REPLACE FUNCTION public.verify_login(user_email text, user_password text)
RETURNS TABLE(taikhoan text, email text, maphanquyen numeric) AS $$
BEGIN
  RETURN QUERY
  SELECT d.taikhoan, d.email, d.maphanquyen
  FROM public.dataname d
  WHERE d.email = user_email 
  AND d.matkhau = crypt(user_password, d.matkhau);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;