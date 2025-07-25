import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface ProductForm {
  name: string;
  category: string;
  price: string;
  image_url: string;
  description: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    image_url: "",
    description: ""
  });
  const { toast } = useToast();

  const categories = [
    { value: "liên quân", label: "Liên Quân" },
    { value: "freefire", label: "FreeFire" },
    { value: "roblox", label: "Roblox" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách sản phẩm",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      image_url: "",
      description: ""
    });
    setEditingProduct(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image_url: product.image_url || "",
      description: product.description || ""
    });
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category || !formData.price.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      toast({
        title: "Lỗi",
        description: "Giá phải là số dương",
        variant: "destructive"
      });
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        price: price,
        image_url: formData.image_url.trim() || null,
        description: formData.description.trim() || null
      };

      if (editingProduct) {
        // Update product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        toast({
          title: "Thành công",
          description: "Cập nhật sản phẩm thành công"
        });
      } else {
        // Create product
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
        
        toast({
          title: "Thành công",
          description: "Tạo sản phẩm mới thành công"
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm",
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Thành công",
        description: "Xóa sản phẩm thành công"
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Quản lý sản phẩm</h2>
          <p className="text-muted-foreground">Tạo và quản lý tài khoản game</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              Tạo sản phẩm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-bg border-white/10 text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Tên sản phẩm *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên sản phẩm"
                  className="bg-white/5 border-white/10 text-foreground"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Danh mục *
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-foreground">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-bg border-white/10">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="text-foreground">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Giá (VND) *
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="bg-white/5 border-white/10 text-foreground"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  URL hình ảnh
                </label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Mô tả
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết sản phẩm"
                  className="bg-white/5 border-white/10 text-foreground min-h-[80px]"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-neon-green text-dark-bg hover:bg-neon-green/90">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProduct ? "Cập nhật" : "Tạo mới"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-white/20 text-foreground hover:bg-white/5"
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-foreground text-lg line-clamp-2">
                  {product.name}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditDialog(product)}
                    className="h-8 w-8 p-0 hover:bg-white/10"
                  >
                    <Edit2 className="h-4 w-4 text-foreground" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteProduct(product.id)}
                    className="h-8 w-8 p-0 hover:bg-white/10 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Product Image */}
              <div className="w-full h-32 bg-white/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="h-8 w-8 text-muted-foreground" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Danh mục:</span>
                  <span className="text-sm text-foreground capitalize">{product.category}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Giá:</span>
                  <span className="text-lg font-bold text-neon-green">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                
                {product.description && (
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Mô tả:</span>
                    <p className="text-sm text-foreground mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Products */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-4">
            Chưa có sản phẩm nào
          </div>
          <Button onClick={openCreateDialog} className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
            <Plus className="h-4 w-4 mr-2" />
            Tạo sản phẩm đầu tiên
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;