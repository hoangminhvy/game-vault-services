import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  unit?: string;
  image_url?: string;
}

const CayThue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = ["all", "cay-level", "farm-gold", "boost-rank", "quest"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('caythue')
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
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
            Dịch Vụ <span className="text-neon-green">Cày Thuê</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Dịch vụ cày level, farm gold, boost rank chuyên nghiệp
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category === "all" ? "Tất cả" :
                 category === "cay-level" ? "Cày Level" :
                 category === "farm-gold" ? "Farm Gold" :
                 category === "boost-rank" ? "Boost Rank" : "Nhiệm vụ"}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-gradient-card border-border-glow hover:border-neon-green/60 transition-all duration-300 hover:shadow-glow group">
              <CardContent className="p-4">
                <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden">
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
                
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-neon-green transition-colors">
                  {product.name}
                </h3>
                
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neon-green font-bold text-lg">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Cày thuê
                  </Badge>
                </div>
                
                <Button variant="gaming" size="sm" className="w-full">
                  Đặt dịch vụ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Không tìm thấy dịch vụ nào</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CayThue;