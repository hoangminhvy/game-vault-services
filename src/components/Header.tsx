import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, User, Wallet, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Function to refresh user data from database
  const refreshUserData = async () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      try {
        const { data, error } = await supabase.rpc('verify_login', {
          user_email: user.email,
          user_password: 'dummy' // We can't verify password here, so we'll fetch by email
        });
        
        if (!error && data && data.length > 0) {
          const updatedUser = data[0];
          const newUserData = { ...user, tien: updatedUser.tien };
          localStorage.setItem('currentUser', JSON.stringify(newUserData));
          setCurrentUser(newUserData);
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      // Refresh user data from database on page load
      refreshUserData();
    }
    
    // Listen for storage changes to update user data
    const handleStorageChange = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      } else {
        setCurrentUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userDataUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdate', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

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
            <a href="/" className="text-foreground hover:text-neon-green transition-colors">
              Trang chủ
            </a>
            <a href="/tai-khoan-game" className="text-foreground hover:text-neon-green transition-colors">
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
            {currentUser ? (
              <>
                <div className="hidden sm:flex items-center space-x-3">
                  {/* User info container */}
                  <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
                        <span className="text-dark-bg font-bold text-xs">
                          {currentUser.taikhoan?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-foreground text-sm">{currentUser.taikhoan}</span>
                    </div>
                    <div className="h-3 w-px bg-white/20"></div>
                    <div className="flex items-center space-x-1">
                      <Wallet className="h-3 w-3 text-neon-green" />
                      <span className="text-neon-green text-sm font-semibold">
                        {formatCurrency(currentUser.tien || 0)}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
                <div className="sm:hidden flex items-center space-x-1">
                  <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-1 py-1">
                    <div className="w-5 h-5 bg-neon-green rounded-full flex items-center justify-center">
                      <span className="text-dark-bg font-bold text-xs">
                        {currentUser.taikhoan?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-foreground text-xs">{currentUser.taikhoan}</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs px-2">
                    <Wallet className="h-3 w-3 mr-1" />
                    <span className="text-xs">{formatCurrency(currentUser.tien || 0)}</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:flex"
                  onClick={() => navigate('/auth')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="sm:hidden"
                  onClick={() => navigate('/auth')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Button>
              </>
            )}
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
            <a href="/" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Trang chủ
            </a>
            <a href="/tai-khoan-game" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
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
              {currentUser ? (
                <div className="space-y-2">
                  <div className="text-center text-foreground font-medium">{currentUser.taikhoan}</div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Wallet className="h-4 w-4 mr-2" />
                    {formatCurrency(currentUser.tien)}
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/auth')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;