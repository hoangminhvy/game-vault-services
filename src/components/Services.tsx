import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Trophy, 
  Zap, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  Crown
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Gamepad2 className="h-8 w-8 text-neon-green" />,
      title: "Tài Khoản Game",
      description: "Mua bán tài khoản game chất lượng cao với giá cả cạnh tranh",
      features: ["Tài khoản VIP", "Rank cao", "Skin hiếm", "Bảo hành 30 ngày"],
      price: "Từ 50.000đ",
      badge: "Phổ biến",
      gradient: "from-neon-green to-neon-blue"
    },
    {
      icon: <Trophy className="h-8 w-8 text-neon-purple" />,
      title: "Dịch Vụ Cày",
      description: "Cày level, farm gold, hoàn thành nhiệm vụ chuyên nghiệp",
      features: ["Cày 24/7", "An toàn 100%", "Tiến độ real-time", "Hỗ trợ tận tình"],
      price: "Từ 20.000đ/ngày",
      badge: "Nhanh chóng",
      gradient: "from-neon-purple to-neon-green"
    },
    {
      icon: <Crown className="h-8 w-8 text-yellow-400" />,
      title: "Boost Rank",
      description: "Tăng rank nhanh chóng với tỷ lệ thắng cao",
      features: ["Duo/Solo", "Win rate 90%+", "Tăng rank nhanh", "Giá tốt nhất"],
      price: "Từ 100.000đ",
      badge: "VIP",
      gradient: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-card-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Dịch Vụ{" "}
            <span className="text-transparent bg-gradient-primary bg-clip-text">
              Chuyên Nghiệp
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ gaming với chất lượng cao nhất
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border-glow hover:border-neon-green/50 transition-all duration-300 hover:shadow-glow group relative overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-card-bg rounded-lg border border-border-glow">
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-foreground group-hover:text-neon-green transition-colors">
                  {service.title}
                </CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>

              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-neon-green mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-neon-green">{service.price}</div>
                  </div>
                  <Button variant="outline" className="group-hover:border-neon-green group-hover:text-neon-green">
                    Xem thêm
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border-glow rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-primary rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Cam kết chất lượng 100%
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tất cả dịch vụ đều được bảo hành và hỗ trợ 24/7. 
              Hoàn tiền 100% nếu không hài lòng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gaming" size="lg">
                <Clock className="mr-2 h-5 w-5" />
                Tư vấn miễn phí
              </Button>
              <Button variant="premium" size="lg">
                <Zap className="mr-2 h-5 w-5" />
                Đặt dịch vụ ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;