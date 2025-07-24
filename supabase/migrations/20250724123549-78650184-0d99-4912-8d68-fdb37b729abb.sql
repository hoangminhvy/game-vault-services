-- Fix the hash_password function by ensuring it works with the pgcrypto extension
DROP FUNCTION IF EXISTS public.hash_password() CASCADE;

CREATE OR REPLACE FUNCTION public.hash_password()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.matkhau != OLD.matkhau) THEN
    NEW.matkhau = public.crypt(NEW.matkhau, public.gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS hash_password_trigger ON public.dataname;
CREATE TRIGGER hash_password_trigger
  BEFORE INSERT OR UPDATE ON public.dataname
  FOR EACH ROW
  EXECUTE FUNCTION public.hash_password();

-- Test the function by creating a test record and then deleting it
INSERT INTO public.dataname (taikhoan, email, matkhau) VALUES ('testuser', 'test@example.com', 'testpass123');
DELETE FROM public.dataname WHERE taikhoan = 'testuser';