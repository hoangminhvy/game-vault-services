-- Fix security issue: Function Search Path Mutable
CREATE OR REPLACE FUNCTION public.verify_login(user_email text, user_password text)
RETURNS TABLE(taikhoan text, email text, maphanquyen numeric) AS $$
BEGIN
  RETURN QUERY
  SELECT d.taikhoan, d.email, d.maphanquyen
  FROM public.dataname d
  WHERE d.email = user_email 
  AND d.matkhau = crypt(user_password, d.matkhau);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';