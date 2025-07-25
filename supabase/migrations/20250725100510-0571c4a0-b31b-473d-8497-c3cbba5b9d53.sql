-- Update verify_login function to include tien field
CREATE OR REPLACE FUNCTION public.verify_login(user_email text, user_password text)
RETURNS TABLE(taikhoan text, email text, maphanquyen numeric, tien numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT d.taikhoan, d.email, d.maphanquyen, d.tien
  FROM public.dataname d
  WHERE d.email = user_email 
  AND d.matkhau = public.crypt(user_password, d.matkhau);
END;
$$;