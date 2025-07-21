import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      username: "ProGamer2024",
      game: "League of Legends",
      rating: 5,
      content: "Mua acc Thách Đấu tại đây rất uy tín, giao dịch nhanh chóng và an toàn. Đã giao dịch 3 lần đều hài lòng!",
      verified: true,
      avatar: "NA"
    },
    {
      name: "Trần Thị B", 
      username: "ValQueen",
      game: "Valorant",
      rating: 5,
      content: "Dịch vụ cày rank Valorant rất chuyên nghiệp. Từ Iron lên Diamond chỉ trong 1 tuần, giá cả hợp lý.",
      verified: true,
      avatar: "TB"
    },
    {
      name: "Lê Minh C",
      username: "MobileKing",
      game: "Liên Quân Mobile",
      rating: 5,
      content: "Acc Liên Quân có đầy đủ tướng và skin đẹp. Seller hỗ trợ nhiệt tình, bảo hành chu đáo.",
      verified: true,
      avatar: "LC"
    },
    {
      name: "Phạm Văn D",
      username: "GenshinMaster",
      game: "Genshin Impact", 
      rating: 5,
      content: "Acc Genshin với team 5 sao đầy đủ, weapon R5. Chất lượng vượt mong đợi với mức giá này!",
      verified: true,
      avatar: "PD"
    },
    {
      name: "Hoàng Thị E",
      username: "PUBGPro",
      game: "PUBG Mobile",
      rating: 4,
      content: "Dịch vụ boost rank PUBG nhanh và ổn định. Team chơi rất giỏi, tỷ lệ thắng cao như cam kết.",
      verified: true,
      avatar: "HE"
    },
    {
      name: "Vũ Văn F",
      username: "FIFAFan",
      game: "FIFA Online 4", 
      rating: 5,
      content: "Squad FIFA cực khủng với nhiều SS+. Giao dịch nhanh gọn, không phải chờ đợi lâu.",
      verified: true,
      avatar: "VF"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card-bg to-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Khách Hàng{" "}
            <span className="text-transparent bg-gradient-primary bg-clip-text">
              Đánh Giá
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hơn 5000+ khách hàng hài lòng với dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-card border-border-glow hover:border-neon-green/50 transition-all duration-300 hover:shadow-glow group relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-8 w-8 text-neon-green" />
              </div>

              <CardContent className="p-6 relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-border-glow">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <Badge className="text-xs bg-neon-green/20 text-neon-green border-neon-green/30">
                            ✓ Xác thực
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{testimonial.username}</p>
                    </div>
                  </div>
                </div>

                {/* Game and rating */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.game}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">5000+</div>
            <div className="text-muted-foreground">Khách hàng hài lòng</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2">4.9/5</div>
            <div className="text-muted-foreground">Đánh giá trung bình</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-neon-blue mb-2">98%</div>
            <div className="text-muted-foreground">Tỷ lệ hài lòng</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-muted-foreground">Hỗ trợ liên tục</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;