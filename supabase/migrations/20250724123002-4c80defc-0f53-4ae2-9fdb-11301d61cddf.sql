-- Drop and recreate the hash_password function with proper type casting
DROP FUNCTION IF EXISTS public.hash_password() CASCADE;

CREATE OR REPLACE FUNCTION public.hash_password()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.matkhau != OLD.matkhau) THEN
    NEW.matkhau = crypt(NEW.matkhau::text, gen_salt('bf'::text));
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