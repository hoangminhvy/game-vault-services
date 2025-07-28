import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Gamepad2, Menu, User, Wallet, LogOut, History } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to refresh user data from database
  const refreshUserData = async () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      try {
        const { data, error } = await supabase.rpc('get_user_by_email', {
          user_email: user.email
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
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setLogoutConfirmOpen(false);
    navigate('/');
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi tài khoản",
    });
  };

  const handlePartnerRegister = () => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      toast({
        title: "Lỗi",
        description: "Vui lòng đăng nhập để đăng ký đối tác",
        variant: "destructive",
      });
      return;
    }

    const user = JSON.parse(userData);
    if (user.maphanquyen === 2) {
      navigate('/doi-tac');
      return;
    }

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setPartnerModalOpen(false);
    setEmailVerificationOpen(true);

    // In real app, send email here
    toast({
      title: "Mã xác thực đã được gửi",
      description: `Mã xác thực: ${code} (Demo - trong thực tế sẽ gửi qua email)`,
    });
  };

  const handleVerifyCode = async () => {
    if (verificationCode === generatedCode) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        
        try {
          // Update user permission to 2 in database
          const { error } = await supabase
            .from('dataname')
            .update({ maphanquyen: 2 })
            .eq('email', user.email);

          if (error) {
            toast({
              title: "Lỗi",
              description: "Không thể cập nhật quyền đối tác",
              variant: "destructive",
            });
            return;
          }

          // Update localStorage
          const updatedUser = { ...user, maphanquyen: 2 };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
          
          setEmailVerificationOpen(false);
          setVerificationCode('');
          
          toast({
            title: "Xác thực thành công",
            description: "Bạn đã trở thành đối tác. Chuyển hướng đến trang đối tác...",
          });
          
          setTimeout(() => {
            navigate('/doi-tac');
          }, 1000);
        } catch (error) {
          console.error('Error updating user permission:', error);
          toast({
            title: "Lỗi",
            description: "Có lỗi xảy ra khi cập nhật quyền",
            variant: "destructive",
          });
        }
      }
    } else {
      toast({
        title: "Mã xác thực không đúng",
        description: "Vui lòng kiểm tra lại mã xác thực",
        variant: "destructive",
      });
    }
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
            <a href="/cay-thue" className="text-foreground hover:text-neon-green transition-colors">
              Dịch vụ Cày
            </a>
            <a href="/dv-mien-phi" className="text-foreground hover:text-neon-green transition-colors">
              DV miễn phí
            </a>
            {currentUser && (
              <a href="/lich-su" className="text-foreground hover:text-neon-green transition-colors">
                Lịch sử
              </a>
            )}
            <a href="#" className="text-foreground hover:text-neon-green transition-colors">
              Nạp tiền
            </a>
            <button onClick={() => setPartnerModalOpen(true)} className="text-foreground hover:text-neon-green transition-colors">
              Đối tác
            </button>
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
            <a href="/cay-thue" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Dịch vụ Cày
            </a>
            <a href="/dv-mien-phi" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              DV miễn phí
            </a>
            {currentUser && (
              <a href="/lich-su" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
                <History className="inline h-4 w-4 mr-2" />
                Lịch sử
              </a>
            )}
            <a href="#" className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors">
              Nạp tiền
            </a>
            <button onClick={() => setPartnerModalOpen(true)} className="block px-4 py-2 text-foreground hover:text-neon-green hover:bg-white/5 rounded transition-colors w-full text-left">
              Đối tác
            </button>
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

      {/* Partner Modal */}
      <Dialog open={partnerModalOpen} onOpenChange={setPartnerModalOpen}>
        <DialogContent className="bg-gradient-card border-border-glow max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-center">Đối tác kinh doanh</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <div className="space-y-2 text-muted-foreground">
              <p>Hợp tác kinh doanh tài khoản và các dịch vụ của bạn</p>
              <ul className="text-sm space-y-1">
                <li>• Đăng ký dễ dàng</li>
                <li>• Ưu đãi đặc biệt</li>
                <li>• Tiếp cận khách hàng tiềm năng</li>
                <li>• An toàn tuyệt đối</li>
              </ul>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setPartnerModalOpen(false)} className="flex-1">
                Đóng
              </Button>
              <Button onClick={handlePartnerRegister} className="flex-1 bg-neon-green text-dark-bg hover:bg-neon-green/90">
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Verification Modal */}
      <Dialog open={emailVerificationOpen} onOpenChange={setEmailVerificationOpen}>
        <DialogContent className="bg-gradient-card border-border-glow max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-center">Xác thực Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Chúng tôi đã gửi mã xác thực đến email của bạn từ <strong>thuongnhanIT</strong>
            </p>
            <Input
              type="text"
              placeholder="Nhập mã xác thực 6 số"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="bg-white/5 border-white/10 text-foreground text-center"
              maxLength={6}
            />
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setEmailVerificationOpen(false)} className="flex-1">
                Hủy
              </Button>
              <Button onClick={handleVerifyCode} className="flex-1 bg-neon-green text-dark-bg hover:bg-neon-green/90">
                Xác thực
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation */}
      <AlertDialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
        <AlertDialogContent className="bg-gradient-card border-border-glow">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Đăng xuất</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLogoutConfirmOpen(false)}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-500 hover:bg-red-600">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;