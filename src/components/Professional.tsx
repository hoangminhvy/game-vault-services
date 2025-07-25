import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Award, 
  Clock, 
  Users,
  CheckCircle,
  Star,
  Headphones,
  Lock
} from "lucide-react";

const Professional = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-neon-green" />,
      title: "Uy tín",
      description: "Đảm bảo uy tín và chất lượng dịch vụ hàng đầu"
    },
    {
      icon: <Users className="h-6 w-6 text-neon-purple" />,
      title: "Tiếp cận khách hàng tiềm năng", 
      description: "Mở rộng mạng lưới khách hàng hiệu quả"
    },
    {
      icon: <Headphones className="h-6 w-6 text-neon-cyan" />,
      title: "Hỗ trợ đa thể loại",
      description: "Hỗ trợ nhiều loại game và dịch vụ khác nhau"
    },
    {
      icon: <Lock className="h-6 w-6 text-neon-blue" />,
      title: "Tạo shop acc tự động miễn phí",
      description: "Hệ thống tự động tạo shop không tốn phí"
    }
  ];

  const stats = [
    { label: "Khách hàng tin tưởng", value: "10,000+", color: "text-neon-green" },
    { label: "Dự án hoàn thành", value: "100+", color: "text-neon-purple" },
    { label: "Năm kinh nghiệm", value: "8+", color: "text-neon-cyan" },
    { label: "đánh giá tích cực", value: "98%", color: "text-neon-blue" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card-bg to-dark-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/40 mb-4">
            Chuyên nghiệp
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Tại sao chọn{" "}
            <span className="text-transparent bg-gradient-primary bg-clip-text">
              thuongnhanIT
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Với hơn 8 năm kinh nghiệm trong ngành gaming và công nghệ, 
            chúng tôi cam kết mang đến dịch vụ chất lượng cao nhất cho khách hàng
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border-glow hover:border-neon-green/60 transition-all duration-300 hover:shadow-glow group text-center"
            >
              <CardHeader>
                <div className="mx-auto p-3 bg-card-bg rounded-lg border border-border-glow group-hover:shadow-glow transition-all w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-foreground group-hover:text-neon-green transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Professional;