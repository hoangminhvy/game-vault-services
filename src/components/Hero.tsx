import { Button } from "@/components/ui/button";
import { Shield, Star, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-gaming.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Gaming Hero" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Mua Bán{" "}
            <span className="text-transparent bg-gradient-primary bg-clip-text">
              Tài Khoản Game
            </span>
            <br />
            Uy Tín Hàng Đầu
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Chuyên cung cấp tài khoản game chất lượng cao, dịch vụ cày thuê chuyên nghiệp 
            và boost rank nhanh chóng. Uy tín - An toàn - Giá rẻ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="gaming" size="lg" className="text-lg px-8 py-4">
              <Zap className="mr-2 h-5 w-5" />
              Khám phá ngay
            </Button>
            <Button variant="neon" size="lg" className="text-lg px-8 py-4">
              <Shield className="mr-2 h-5 w-5" />
              Dịch vụ miễn phí
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">5000+</div>
              <div className="text-muted-foreground">Khách hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2">50+</div>
              <div className="text-muted-foreground">Game hỗ trợ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-blue mb-2">24/7</div>
              <div className="text-muted-foreground">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Star className="h-6 w-6 text-neon-green opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Users className="h-8 w-8 text-neon-purple opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Shield className="h-7 w-7 text-neon-blue opacity-60" />
      </div>
    </section>
  );
};

export default Hero;