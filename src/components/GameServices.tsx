import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Trophy, 
  Crown,
  Star, 
  Users, 
  TrendingUp,
  ArrowRight,
  Shield,
  Clock,
  Zap
} from "lucide-react";

const GameServices = () => {
  const services = [
    {
      icon: <Gamepad2 className="h-8 w-8 text-neon-green" />,
      title: "Tài Khoản Game",
      description: "Mua bán tài khoản game chất lượng cao với giá cạnh tranh",
      features: ["Tài khoản VIP", "Rank cao", "Skin hiếm", "Bảo hành 30 ngày"],
      price: "Từ 50.000đ",
      badge: "Phổ biến"
    },
    {
      icon: <Trophy className="h-8 w-8 text-neon-purple" />,
      title: "Dịch Vụ Cày",
      description: "Cày level, farm gold, hoàn thành nhiệm vụ chuyên nghiệp",
      features: ["Cày 24/7", "An toàn 100%", "Tiến độ real-time", "Hỗ trợ tận tình"],
      price: "Từ 20.000đ/ngày",
      badge: "Nhanh chóng"
    },
    {
      icon: <Crown className="h-8 w-8 text-neon-cyan" />,
      title: "Đối Tác",
      description: "Hợp tác kinh doanh và phát triển cùng nhau",
      features: ["Duo/Solo", "Win rate 90%+", "Tăng rank nhanh", "Giá tốt nhất"],
      price: "Từ 100.000đ",
      badge: "VIP"
    }
  ];

  const games = [
    {
      name: "Liên Quân Mobile",
      category: "MOBA Mobile",
      accounts: "2,000+",
      rating: 4.9,
      trend: "+8%",
      price: "50K - 800K",
      features: ["Rank Thách Đấu", "Tướng đầy đủ", "Skin hiếm"],
      gradient: "from-neon-purple to-indigo-400",
      popular: true,
      image: "🎮"
    },
    {
      name: "FreeFire",
      category: "Battle Royale",
      accounts: "1,500+",
      rating: 4.8,
      trend: "+22%",
      price: "30K - 500K",
      features: ["Rank Thách Đấu", "Skin nhân vật", "Pet VIP"],
      gradient: "from-orange-500 to-red-400",
      popular: true,
      image: "🔥"
    },
    {
      name: "Roblox",
      category: "Sandbox",
      accounts: "1,000+",
      rating: 4.7,
      trend: "+15%",
      price: "20K - 300K",
      features: ["Robux nhiều", "Game Pass", "Limited Items"],
      gradient: "from-neon-green to-emerald-400",
      popular: true,
      image: "🎲"
    },
    {
      name: "PUBG Mobile",
      category: "Battle Royale",
      accounts: "800+",
      rating: 4.6,
      trend: "+12%",
      price: "40K - 600K",
      features: ["Rank Ace", "Skin súng", "Outfit hiếm"],
      gradient: "from-neon-blue to-cyan-400",
      popular: false,
      image: "🎯"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg via-card-bg to-dark-bg">
      <div className="container mx-auto px-4">
        {/* Services Section */}
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

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border-glow hover:border-neon-green/60 transition-all duration-300 hover:shadow-glow group relative overflow-hidden"
            >
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-card-bg rounded-lg border border-border-glow group-hover:shadow-glow transition-all">
                    {service.icon}
                  </div>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/40">
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
                  <div className="text-2xl font-bold text-neon-green">{service.price}</div>
                  <Button variant="outline" className="group-hover:border-neon-green group-hover:text-neon-green">
                    Xem thêm
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hot Accounts Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Tài Khoản{" "}
            <span className="text-transparent bg-gradient-accent bg-clip-text">
              Hot
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tài khoản game hot nhất hiện tại với giá cả cạnh tranh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {games.map((game, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border-glow hover:border-neon-purple/60 transition-all duration-300 hover:shadow-purple-glow group relative overflow-hidden"
            >
              {game.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/40">
                    HOT
                  </Badge>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}></div>

              <CardContent className="p-6 relative">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl animate-pulse">{game.image}</span>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-neon-purple transition-colors">
                        {game.name}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-neon-green mr-1" />
                      {game.trend}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {game.category}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Có sẵn:</span>
                    <span className="text-neon-green font-semibold">{game.accounts}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Giá:</span>
                    <span className="text-neon-purple font-semibold">{game.price}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {game.features.map((feature, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-xs bg-card-bg border-border-glow"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="gaming" size="sm" className="w-full">
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-card border border-border-glow rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-blue-glow transition-all">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-primary rounded-full shadow-glow">
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
              <Button variant="neon" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Xem tất cả
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameServices;