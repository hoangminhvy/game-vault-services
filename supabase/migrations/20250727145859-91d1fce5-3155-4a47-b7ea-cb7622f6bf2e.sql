-- Update policies for admin upload access
DROP POLICY IF EXISTS "Admin can upload images to imgacc bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update images in imgacc bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete images in imgacc bucket" ON storage.objects;

-- Create more permissive upload policies
CREATE POLICY "Anyone can upload images to imgacc bucket" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'imgacc');

CREATE POLICY "Anyone can update images in imgacc bucket" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'imgacc');

CREATE POLICY "Anyone can delete images in imgacc bucket" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'imgacc');