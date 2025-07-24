import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-border-glow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-neon-green" />
            <span className="text-2xl font-bold text-foreground">
              thuonghan<span className="text-neon-green">IT</span>
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
              DV miễn phí
            </a>
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Nạp tiền
            </a>
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Đối tác
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Đăng nhập
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="pt-4 pb-2 space-y-2">
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Trang chủ
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Tài khoản Game
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Dịch vụ Cày
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              DV miễn phí
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Nạp tiền
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Đối tác
            </a>
            <div className="px-4 py-2">
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;