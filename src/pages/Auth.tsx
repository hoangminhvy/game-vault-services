import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [taikhoan, setTaikhoan] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.rpc('verify_login', {
        user_email: email,
        user_password: password
      });

      if (error || !data || data.length === 0) {
        toast.error('Email hoặc mật khẩu không đúng');
        setLoading(false);
        return;
      }

      const userData = data[0];
      
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Trigger event to update Header component
      window.dispatchEvent(new Event('userDataUpdate'));
      
      if (userData.maphanquyen === 3) {
        // Admin needs PIN verification
        navigate('/admin-pin');
      } else if (userData.maphanquyen === 1) {
        // Regular user goes to home page
        navigate('/');
      } else {
        navigate('/dashboard');
      }
      
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Có lỗi xảy ra khi đăng nhập');
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !taikhoan) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (taikhoan.length < 4 || taikhoan.length > 10) {
      toast.error("Tên tài khoản không được ít hơn 4 ký tự hoặc nhiều hơn 10 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu nhập lại không khớp');
      return;
    }

    if (password.length < 8) {
      toast.error('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(password)) {
      toast.error('Mật khẩu phải có cả số lẫn chữ');
      return;
    }

    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      toast.error('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
      return;
    }

    setLoading(true);

    try {
      // Insert into dataname table
      const { error } = await supabase
        .from('dataname')
        .insert({
          taikhoan: taikhoan,
          email: email,
          matkhau: password, // Will be hashed by trigger
          tien: 0,
          maphanquyen: 1 // Default user role
        });

      if (error) {
        console.error('Signup error:', error);
        if (error.code === '23505') {
          toast.error('Email hoặc tài khoản đã tồn tại');
        } else {
          toast.error(`Có lỗi xảy ra khi đăng ký: ${error.message}`);
        }
        setLoading(false);
        return;
      }

      toast.success('Đăng ký thành công! Vui lòng đăng nhập');
      
      // Show browser save password prompt simulation
      if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Firefox')) {
        setTimeout(() => {
          const shouldSave = confirm('Bạn có muốn lưu thông tin đăng nhập để dễ dàng đăng nhập lại không?');
          if (shouldSave) {
            toast.success('Thông tin đăng nhập đã được lưu');
          }
        }, 500);
      }
      
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setTaikhoan('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Có lỗi xảy ra khi đăng ký');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2"
          onClick={() => navigate('/')}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </h1>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Tài khoản</label>
              <Input
                type="text"
                value={taikhoan}
                onChange={(e) => setTaikhoan(e.target.value)}
                required
                placeholder="Nhập tài khoản"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mật khẩu</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Nhập lại mật khẩu</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Nhập lại mật khẩu"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail('');
              setPassword('');
              setTaikhoan('');
              setConfirmPassword('');
            }}
          >
            {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
          </Button>
        </div>
      </Card>
    </div>
  );
}