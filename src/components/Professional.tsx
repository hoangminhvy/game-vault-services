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
      title: "Bảo mật tuyệt đối",
      description: "Mã hóa thông tin khách hàng với tiêu chuẩn ngân hàng"
    },
    {
      icon: <Award className="h-6 w-6 text-neon-purple" />,
      title: "Chứng nhận chất lượng",
      description: "ISO 9001:2015 và các chứng chỉ quốc tế"
    },
    {
      icon: <Clock className="h-6 w-6 text-neon-cyan" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ kỹ thuật viên luôn sẵn sàng hỗ trợ"
    },
    {
      icon: <Users className="h-6 w-6 text-neon-blue" />,
      title: "Đội ngũ chuyên nghiệp",
      description: "Hơn 100 chuyên gia với kinh nghiệm 5+ năm"
    }
  ];

  const stats = [
    { label: "Khách hàng tin tưởng", value: "50,000+", color: "text-neon-green" },
    { label: "Dự án hoàn thành", value: "25,000+", color: "text-neon-purple" },
    { label: "Năm kinh nghiệm", value: "8+", color: "text-neon-cyan" },
    { label: "Đánh giá 5 sao", value: "98%", color: "text-neon-blue" }
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

        {/* Certifications */}
        <div className="bg-gradient-card border border-border-glow rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-full shadow-glow">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Chứng nhận & Giải thưởng
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Được công nhận bởi các tổ chức uy tín trong ngành công nghệ và gaming
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              ISO 9001:2015
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Top Gaming Service 2023
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Headphones className="h-4 w-4 mr-2" />
              Best Customer Service
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Lock className="h-4 w-4 mr-2" />
              Security Certified
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professional;