-- Fix security definer function
ALTER FUNCTION public.update_updated_at_column() SECURITY DEFINER SET search_path = public;