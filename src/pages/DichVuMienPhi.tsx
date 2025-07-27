import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image_url?: string;
  button_url?: string;
  status?: string;
}

const DichVuMienPhi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('DVmienphi')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-foreground">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Dịch Vụ <span className="text-neon-green">Miễn Phí</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Các dịch vụ và công cụ miễn phí dành cho game thủ
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products List - 1 column layout */}
        <div className="space-y-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-gradient-card border-border-glow hover:border-neon-green/60 transition-all duration-300 hover:shadow-glow group">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full lg:w-48 h-48 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Ảnh sản phẩm</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-neon-green transition-colors">
                      {product.name}
                    </h3>
                    
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4">
                        <span className="text-neon-green font-bold text-xl">
                          MIỄN PHÍ
                        </span>
                      </div>
                      
                      <Button variant="gaming" className="group">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Truy cập
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Không tìm thấy dịch vụ nào</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery("")}
            >
              Xóa tìm kiếm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DichVuMienPhi;