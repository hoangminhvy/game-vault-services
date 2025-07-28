-- Add missing columns to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS uyquyen boolean DEFAULT false;

-- Add da_rut column to dataname table if it doesn't exist
ALTER TABLE public.dataname 
ADD COLUMN IF NOT EXISTS da_rut numeric DEFAULT 0;