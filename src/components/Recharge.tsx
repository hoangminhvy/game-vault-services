import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, Gift, Shield } from "lucide-react";

const Recharge = () => {
  const rechargeOptions = [
    {
      amount: "50,000",
      bonus: "5,000",
      popular: false,
      icon: CreditCard,
    },
    {
      amount: "100,000",
      bonus: "15,000",
      popular: true,
      icon: Zap,
    },
    {
      amount: "200,000",
      bonus: "35,000",
      popular: false,
      icon: Gift,
    },
    {
      amount: "500,000",
      bonus: "100,000",
      popular: false,
      icon: Shield,
    },
  ];

  const paymentMethods = [
    { name: "Momo", icon: "💳" },
    { name: "ZaloPay", icon: "💰" },
    { name: "Banking", icon: "🏦" },
    { name: "Thẻ cào", icon: "🎫" },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-dark-bg via-dark-bg/95 to-card/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nạp Tiền Siêu Tốc
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nạp tiền nhanh chóng, an toàn với nhiều phương thức thanh toán. Nhận bonus hấp dẫn!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {rechargeOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card key={index} className={`relative bg-card/50 border-border-glow hover:border-neon-green/50 transition-all duration-300 hover:shadow-glow ${option.popular ? 'ring-2 ring-neon-green/30' : ''}`}>
                {option.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                    Phổ biến
                  </Badge>
                )}
                <CardHeader className="text-center pb-3">
                  <IconComponent className="h-8 w-8 text-neon-green mx-auto mb-2" />
                  <CardTitle className="text-foreground">
                    {option.amount}đ
                  </CardTitle>
                  <CardDescription className="text-neon-green font-semibold">
                    + {option.bonus}đ bonus
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant={option.popular ? "gaming" : "outline"} 
                    className="w-full"
                  >
                    Nạp ngay
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Phương thức thanh toán
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="bg-card/30 border-border-glow hover:border-neon-green/50 transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 flex items-center space-x-3">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-foreground font-medium">{method.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gaming" size="lg">
              Nạp tiền ngay
            </Button>
            <Button variant="outline" size="lg">
              Xem lịch sử giao dịch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recharge;