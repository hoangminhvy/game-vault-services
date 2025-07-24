-- Create function to hash password on insert/update
CREATE OR REPLACE FUNCTION hash_password()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.matkhau != OLD.matkhau) THEN
    NEW.matkhau = crypt(NEW.matkhau, gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger to automatically hash passwords
CREATE TRIGGER hash_password_trigger
  BEFORE INSERT OR UPDATE ON public.dataname
  FOR EACH ROW
  EXECUTE FUNCTION hash_password();