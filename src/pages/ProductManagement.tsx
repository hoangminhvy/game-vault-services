import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/ImageUpload";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  image_url2?: string;
  image_url3?: string;
  image_url4?: string;
  image_url5?: string;
  description?: string;
  tk?: string;
  mk?: string;
  'phương thức'?: string;
  'khách hàng'?: string;
  tt?: string;
  created_at: string;
  updated_at: string;
}

interface CayThueProduct {
  id: number;
  name: string;
  price: number;
  unit?: string;
  image_url?: string;
}

interface DVMienPhiProduct {
  id: number;
  name: string;
  image_url?: string;
  button_url?: string;
  status?: string;
}

interface ProductForm {
  name: string;
  category: string;
  price: string;
  description: string;
  tk: string;
  mk: string;
  'phương thức': string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cayThueProducts, setCayThueProducts] = useState<CayThueProduct[]>([]);
  const [dvMienPhiProducts, setDvMienPhiProducts] = useState<DVMienPhiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | CayThueProduct | DVMienPhiProduct | null>(null);
  const [productType, setProductType] = useState<'products' | 'caythue' | 'dvmienphi'>('products');
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    description: "",
    tk: "",
    mk: "",
    'phương thức': ""
  });
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const categories = [
    { value: "liên quân", label: "Liên Quân" },
    { value: "freefire", label: "FreeFire" },
    { value: "roblox", label: "Roblox" }
  ];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const [productsData, cayThueData, dvMienPhiData] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('caythue').select('*').order('id', { ascending: false }),
        supabase.from('DVmienphi').select('*').order('id', { ascending: false })
      ]);

      if (productsData.error) throw productsData.error;
      if (cayThueData.error) throw cayThueData.error;
      if (dvMienPhiData.error) throw dvMienPhiData.error;

      setProducts(productsData.data || []);
      setCayThueProducts(cayThueData.data || []);
      setDvMienPhiProducts(dvMienPhiData.data || []);
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
      description: "",
      tk: "",
      mk: "",
      'phương thức': ""
    });
    setImages([]);
    setEditingProduct(null);
  };

  const openCreateDialog = (type: 'products' | 'caythue' | 'dvmienphi') => {
    resetForm();
    setProductType(type);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product | CayThueProduct | DVMienPhiProduct, type: 'products' | 'caythue' | 'dvmienphi') => {
    setProductType(type);
    
    if (type === 'products' && 'category' in product) {
      const prod = product as Product;
      setFormData({
        name: prod.name,
        category: prod.category,
        price: prod.price.toString(),
        description: prod.description || "",
        tk: prod.tk || "",
        mk: prod.mk || "",
        'phương thức': prod['phương thức'] || ""
      });
      setImages([prod.image_url, prod.image_url2, prod.image_url3, prod.image_url4, prod.image_url5].filter(Boolean) as string[]);
    } else if (type === 'caythue') {
      const cayThueProduct = product as CayThueProduct;
      setFormData({
        name: cayThueProduct.name,
        category: "",
        price: cayThueProduct.price.toString(),
        description: "",
        tk: "",
        mk: "",
        'phương thức': cayThueProduct.unit || ""
      });
      setImages(cayThueProduct.image_url ? [cayThueProduct.image_url] : []);
    } else {
      setFormData({
        name: product.name,
        category: "",
        price: ('price' in product) ? product.price.toString() : "",
        description: "",
        tk: "",
        mk: "",
        'phương thức': ""
      });
      setImages(product.image_url ? [product.image_url] : []);
    }
    
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên sản phẩm",
        variant: "destructive"
      });
      return;
    }

    try {
      if (productType === 'products') {
        if (!formData.category || !formData.price.trim()) {
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

        const productData = {
          name: formData.name.trim(),
          category: formData.category,
          price: price,
          description: formData.description.trim() || null,
          tk: formData.tk.trim() || null,
          mk: formData.mk.trim() || null,
          'phương thức': formData['phương thức'].trim() || null,
          image_url: images[0] || null,
          image_url2: images[1] || null,
          image_url3: images[2] || null,
          image_url4: images[3] || null,
          image_url5: images[4] || null,
        };

        if (editingProduct && 'category' in editingProduct) {
          const { error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', editingProduct.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('products')
            .insert([productData]);
          
          if (error) throw error;
        }
      } else if (productType === 'caythue') {
        const price = formData.price ? parseFloat(formData.price) : 0;
        const cayThueData = {
          name: formData.name.trim(),
          price: price,
          unit: formData['phương thức'].trim() || null,
          image_url: images[0] || null,
        };

        if (editingProduct && typeof editingProduct.id === 'number') {
          const { error } = await supabase
            .from('caythue')
            .update(cayThueData)
            .eq('id', editingProduct.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('caythue')
            .insert([cayThueData]);
          
          if (error) throw error;
        }
      } else if (productType === 'dvmienphi') {
        const dvMienPhiData = {
          name: formData.name.trim(),
          image_url: images[0] || null,
          status: 'active'
        };

        if (editingProduct && typeof editingProduct.id === 'number') {
          const { error } = await supabase
            .from('DVmienphi')
            .update(dvMienPhiData)
            .eq('id', editingProduct.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('DVmienphi')
            .insert([dvMienPhiData]);
          
          if (error) throw error;
        }
      }

      toast({
        title: "Thành công",
        description: editingProduct ? "Cập nhật sản phẩm thành công" : "Tạo sản phẩm mới thành công"
      });

      setIsDialogOpen(false);
      resetForm();
      fetchAllProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm",
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (productId: string | number, type: 'products' | 'caythue' | 'dvmienphi') => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from(type === 'products' ? 'products' : type === 'caythue' ? 'caythue' : 'DVmienphi')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Thành công",
        description: "Xóa sản phẩm thành công"
      });
      
      fetchAllProducts();
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

  const renderProductGrid = (productList: (Product | CayThueProduct | DVMienPhiProduct)[], type: 'products' | 'caythue' | 'dvmienphi') => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productList.map((product) => (
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
                  onClick={() => openEditDialog(product, type)}
                  className="h-8 w-8 p-0 hover:bg-white/10"
                >
                  <Edit2 className="h-4 w-4 text-foreground" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteProduct(product.id, type)}
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
              {type === 'products' && 'category' in product && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Danh mục:</span>
                    <span className="text-sm text-foreground capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Trạng thái:</span>
                    <span className="text-sm text-foreground">{product.tt || 'Chưa bán'}</span>
                  </div>
                  {product['khách hàng'] && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Khách hàng:</span>
                      <span className="text-sm text-foreground">{product['khách hàng']}</span>
                    </div>
                  )}
                </>
              )}
              
              {'price' in product && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Giá:</span>
                  <span className="text-lg font-bold text-neon-green">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
      <div>
        <h2 className="text-2xl font-bold text-foreground">Quản lý sản phẩm</h2>
        <p className="text-muted-foreground">Tạo và quản lý tất cả các loại sản phẩm</p>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5">
          <TabsTrigger value="products" className="text-foreground">Tài khoản Game</TabsTrigger>
          <TabsTrigger value="caythue" className="text-foreground">Dịch vụ cày</TabsTrigger>
          <TabsTrigger value="dvmienphi" className="text-foreground">DV miễn phí</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-foreground">Tài khoản Game</h3>
            <Button onClick={() => openCreateDialog('products')} className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              Tạo tài khoản mới
            </Button>
          </div>
          {renderProductGrid(products, 'products')}
        </TabsContent>

        <TabsContent value="caythue" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-foreground">Dịch vụ cày</h3>
            <Button onClick={() => openCreateDialog('caythue')} className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              Tạo dịch vụ mới
            </Button>
          </div>
          {renderProductGrid(cayThueProducts, 'caythue')}
        </TabsContent>

        <TabsContent value="dvmienphi" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-foreground">Dịch vụ miễn phí</h3>
            <Button onClick={() => openCreateDialog('dvmienphi')} className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              Tạo dịch vụ mới
            </Button>
          </div>
          {renderProductGrid(dvMienPhiProducts, 'dvmienphi')}
        </TabsContent>
      </Tabs>

      {/* Product Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-bg border-white/10 text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
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

            {productType === 'products' && (
              <>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Tài khoản
                    </label>
                    <Input
                      value={formData.tk}
                      onChange={(e) => setFormData({ ...formData, tk: e.target.value })}
                      placeholder="Tên tài khoản game"
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Mật khẩu
                    </label>
                    <Input
                      value={formData.mk}
                      onChange={(e) => setFormData({ ...formData, mk: e.target.value })}
                      placeholder="Mật khẩu"
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Phương thức
                  </label>
                  <Input
                    value={formData['phương thức']}
                    onChange={(e) => setFormData({ ...formData, 'phương thức': e.target.value })}
                    placeholder="Phương thức giao dịch"
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
              </>
            )}

            {(productType === 'products' || productType === 'caythue') && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Giá (VND) {productType === 'products' ? '*' : ''}
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="bg-white/5 border-white/10 text-foreground"
                  required={productType === 'products'}
                />
              </div>
            )}
            
            {productType === 'caythue' && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Đơn vị
                </label>
                <Input
                  value={formData['phương thức']}
                  onChange={(e) => setFormData({ ...formData, 'phương thức': e.target.value })}
                  placeholder="Ví dụ: level, giờ, ngày..."
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>
            )}

            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={productType === 'products' ? 5 : 1}
            />
            
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
  );
};

export default ProductManagement;