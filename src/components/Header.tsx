import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-border-glow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-neon-green" />
            <span className="text-2xl font-bold text-foreground">
              Game<span className="text-neon-green">Vault</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Trang chủ
            </a>
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Tài khoản Game
            </a>
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Dịch vụ Cày
            </a>
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Boost Rank
            </a>
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Liên hệ
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Đăng nhập
            </Button>
            <Button variant="gaming" size="sm">
              Đăng ký
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;