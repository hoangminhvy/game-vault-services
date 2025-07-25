import { useState, useEffect } from "react";
import { Search, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  description?: string;
}

const GameAccounts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "liên quân", label: "Liên Quân" },
    { value: "freefire", label: "FreeFire" },
    { value: "roblox", label: "Roblox" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

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
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-foreground">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tài Khoản <span className="text-neon-green">Game</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Khám phá bộ sưu tập tài khoản game chất lượng cao
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm tài khoản game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={`${
                  selectedCategory === category.value
                    ? "bg-neon-green text-dark-bg hover:bg-neon-green/90"
                    : "border-white/20 text-foreground hover:bg-white/5"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group">
                <CardContent className="p-4">
                  {/* Product Image */}
                  <div className="w-full h-32 bg-white/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">Ảnh sản phẩm</span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-foreground font-semibold mb-2 text-sm line-clamp-2 group-hover:text-neon-green transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="text-neon-green font-bold text-lg mb-3">
                    {formatCurrency(product.price)}
                  </div>

                  {/* Buy Button */}
                  <Button 
                    size="sm" 
                    className="w-full bg-neon-green text-dark-bg hover:bg-neon-green/90 text-xs"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Mua ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">
                Không tìm thấy sản phẩm nào
              </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default GameAccounts;