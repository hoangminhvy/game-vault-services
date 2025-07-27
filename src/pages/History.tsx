import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, EyeOff, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseHistory {
  id: string;
  product_name: string;
  product_price: number;
  game_username: string;
  game_password: string;
  purchase_date: string;
  category: string;
}

const History = () => {
  const [history, setHistory] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const userData = localStorage.getItem('currentUser');
      if (!userData) {
        setHistory([]);
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);
      const { data, error } = await supabase
        .from('purchase_history')
        .select('*')
        .eq('user_email', user.email)
        .order('purchase_date', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
        setHistory([]);
      } else {
        setHistory(data || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép",
      description: `${type} đã được sao chép vào clipboard`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Lịch Sử <span className="text-neon-green">Mua Hàng</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Xem lại tất cả tài khoản game đã mua
          </p>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-card border border-border-glow rounded-2xl p-8 max-w-md mx-auto">
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Chưa có lịch sử mua hàng
              </h3>
              <p className="text-muted-foreground mb-6">
                Bạn chưa mua tài khoản game nào. Hãy khám phá các sản phẩm của chúng tôi!
              </p>
              <Button variant="gaming" onClick={() => window.location.href = '/tai-khoan-game'}>
                Mua tài khoản ngay
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <Card key={item.id} className="bg-gradient-card border-border-glow hover:border-neon-green/60 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">
                        {item.product_name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-muted-foreground text-sm">
                          {formatDate(item.purchase_date)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-neon-green">
                        {formatCurrency(item.product_price)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Username */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Tên tài khoản
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="bg-card-bg border border-border-glow rounded-lg px-3 py-2 flex-1 font-mono text-foreground">
                          {item.game_username}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(item.game_username, 'Tên tài khoản')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Mật khẩu
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="bg-card-bg border border-border-glow rounded-lg px-3 py-2 flex-1 font-mono text-foreground">
                          {showPasswords[item.id] ? item.game_password : '••••••••'}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => togglePasswordVisibility(item.id)}
                        >
                          {showPasswords[item.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(item.game_password, 'Mật khẩu')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/20 rounded-lg">
                    <p className="text-sm text-neon-green">
                      ✅ Tài khoản đã được giao thành công. Vui lòng đổi mật khẩu sau khi đăng nhập.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;