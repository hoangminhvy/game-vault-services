-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('imgacc', 'imgacc', true);

-- Create policies for image uploads
CREATE POLICY "Public can view images in imgacc bucket" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'imgacc');

CREATE POLICY "Admin can upload images to imgacc bucket" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'imgacc');

CREATE POLICY "Admin can update images in imgacc bucket" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'imgacc');

CREATE POLICY "Admin can delete images in imgacc bucket" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'imgacc');