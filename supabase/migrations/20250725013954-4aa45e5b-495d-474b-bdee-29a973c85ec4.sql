-- Fix the verify_login function to work with the updated password hashing
DROP FUNCTION IF EXISTS public.verify_login(text, text);

CREATE OR REPLACE FUNCTION public.verify_login(user_email text, user_password text)
RETURNS TABLE(taikhoan text, email text, maphanquyen numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT d.taikhoan, d.email, d.maphanquyen
  FROM public.dataname d
  WHERE d.email = user_email 
  AND d.matkhau = public.crypt(user_password, d.matkhau);
END;
$$;