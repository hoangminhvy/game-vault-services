import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Gamepad2, 
  Facebook, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Shield,
  Star
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-border-glow">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-16 grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-neon-green" />
              <span className="text-2xl font-bold text-foreground">
                Game<span className="text-neon-green">Vault</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Chuyên cung cấp tài khoản game chất lượng cao và dịch vụ gaming chuyên nghiệp. 
              Uy tín hàng đầu Việt Nam với hơn 5 năm kinh nghiệm.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Dịch Vụ</h3>
            <ul className="space-y-3">
              {[
                "Tài khoản League of Legends",
                "Tài khoản Valorant", 
                "Tài khoản Liên Quân Mobile",
                "Dịch vụ cày thuê",
                "Boost rank",
                "Nạp game"
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-neon-green transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Introduction */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Giới thiệu</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">danhnhanIT</li>
              <li className="text-muted-foreground text-sm">Ngô Tuấn</li>
              <li className="text-muted-foreground text-sm">Hoàng Vỹ</li>
              <li className="text-muted-foreground text-sm">Triệu Khải</li>
            </ul>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Gmail
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Tin nhắn
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Về chúng tôi
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Liên Hệ</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-neon-green flex-shrink-0" />
                <span className="text-muted-foreground">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-neon-green flex-shrink-0" />
                <span className="text-muted-foreground">support@gamevault.vn</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-neon-green flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-neon-green flex-shrink-0" />
                <span className="text-muted-foreground">24/7 - Hỗ trợ liên tục</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border-glow" />

        {/* Trust badges */}
        <div className="py-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-6 w-6 text-neon-green" />
              <span className="text-sm text-muted-foreground">
                Bảo mật SSL 256-bit
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Star className="h-6 w-6 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                Đánh giá 4.9/5 sao
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="h-6 w-6 text-neon-blue" />
              <span className="text-sm text-muted-foreground">
                Hỗ trợ 24/7
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-border-glow" />

        {/* Copyright */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 GameVault. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-neon-green transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-neon-green transition-colors">
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;