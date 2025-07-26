-- Create function to get user data by email
CREATE OR REPLACE FUNCTION public.get_user_by_email(user_email text)
RETURNS TABLE(taikhoan text, email text, maphanquyen numeric, tien numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT d.taikhoan, d.email, d.maphanquyen, d.tien
  FROM public.dataname d
  WHERE d.email = user_email;
END;
$$;