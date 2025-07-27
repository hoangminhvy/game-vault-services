import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('imgacc')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('imgacc')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: "Lỗi",
        description: `Chỉ được tải tối đa ${maxImages} ảnh`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Lỗi",
          description: `File ${file.name} quá lớn. Kích thước tối đa 5MB`,
          variant: "destructive",
        });
        continue;
      }

      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        newImages.push(imageUrl);
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
      toast({
        title: "Thành công",
        description: `Đã tải lên ${newImages.length} ảnh`,
      });
    }

    setUploading(false);
    event.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Hình ảnh sản phẩm (tối đa {maxImages} ảnh)
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading || images.length >= maxImages}
          onClick={() => document.getElementById('file-upload')?.click()}
          className="border-white/20 text-foreground hover:bg-white/5"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Đang tải..." : "Tải ảnh lên"}
        </Button>
      </div>

      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Images Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative aspect-square bg-white/5 rounded-lg overflow-hidden group">
            <img
              src={imageUrl}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {/* Placeholder for additional images */}
        {images.length < maxImages && (
          <div 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="aspect-square bg-white/5 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="text-center">
              <ImageIcon className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
              <span className="text-xs text-muted-foreground">Thêm ảnh</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;