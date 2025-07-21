import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, TrendingUp } from "lucide-react";

const PopularGames = () => {
  const games = [
    {
      name: "League of Legends",
      category: "MOBA",
      accounts: "1,200+",
      rating: 4.9,
      trend: "+15%",
      price: "150.000đ - 2.000.000đ",
      features: ["Rank Thách Đấu", "Skin hiếm", "BE/RP cao"],
      gradient: "from-blue-500 to-cyan-400",
      popular: true
    },
    {
      name: "Valorant",
      category: "FPS",
      accounts: "800+",
      rating: 4.8,
      trend: "+22%",
      price: "200.000đ - 1.500.000đ",
      features: ["Rank Radiant", "Skin Phantom", "VP/RP"],
      gradient: "from-red-500 to-pink-400",
      popular: true
    },
    {
      name: "Liên Quân Mobile",
      category: "MOBA Mobile",
      accounts: "2,000+",
      rating: 4.7,
      trend: "+8%",
      price: "50.000đ - 800.000đ",
      features: ["Rank Thách Đấu", "Tướng đầy đủ", "Skin SS"],
      gradient: "from-purple-500 to-indigo-400",
      popular: false
    },
    {
      name: "PUBG Mobile",
      category: "Battle Royale",
      accounts: "1,500+",
      rating: 4.6,
      trend: "+12%",
      price: "100.000đ - 1.200.000đ",
      features: ["Rank Ace", "Outfit hiếm", "UC cao"],
      gradient: "from-orange-500 to-yellow-400",
      popular: false
    },
    {
      name: "Genshin Impact",
      category: "RPG",
      accounts: "600+",
      rating: 4.9,
      trend: "+25%",
      price: "300.000đ - 5.000.000đ",
      features: ["AR 60", "5* C6", "Weapon R5"],
      gradient: "from-emerald-500 to-teal-400",
      popular: true
    },
    {
      name: "FIFA Online 4",
      category: "Sports",
      accounts: "900+",
      rating: 4.5,
      trend: "+5%",
      price: "80.000đ - 2.500.000đ",
      features: ["Squad khủng", "BP cao", "Cầu thủ SS"],
      gradient: "from-green-500 to-emerald-400",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Game{" "}
            <span className="text-transparent bg-gradient-accent bg-clip-text">
              Phổ Biến
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tài khoản game hot nhất hiện tại với giá cả cạnh tranh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Card 
              key={index}
              className="bg-card border-border-glow hover:border-neon-green/50 transition-all duration-300 hover:shadow-glow group relative overflow-hidden"
            >
              {/* Popular badge */}
              {game.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    HOT
                  </Badge>
                </div>
              )}

              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <CardContent className="p-6 relative">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-neon-green transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-neon-green mr-1" />
                      {game.trend}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {game.category}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tài khoản có sẵn:</span>
                    <span className="text-neon-green font-semibold">{game.accounts}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Đánh giá:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-foreground font-semibold">{game.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Giá:</span>
                    <span className="text-neon-purple font-semibold">{game.price}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Đặc điểm nổi bật:</div>
                  <div className="flex flex-wrap gap-2">
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

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Xem chi tiết
                  </Button>
                  <Button variant="gaming" size="sm" className="flex-1">
                    Mua ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="neon" size="lg">
            <Users className="mr-2 h-5 w-5" />
            Xem tất cả game
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularGames;