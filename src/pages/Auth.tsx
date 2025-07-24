import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [taikhoan, setTaikhoan] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
      
      if (userData.maphanquyen === 3) {
        // Admin needs PIN verification
        navigate('/admin-pin');
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
    
    if (password !== confirmPassword) {
      toast.error('Mật khẩu nhập lại không khớp');
      return;
    }

    setLoading(true);

    try {
      // Hash password and insert into dataname table
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
        if (error.code === '23505') {
          toast.error('Email hoặc tài khoản đã tồn tại');
        } else {
          toast.error('Có lỗi xảy ra khi đăng ký');
        }
        setLoading(false);
        return;
      }

      toast.success('Đăng ký thành công! Vui lòng đăng nhập');
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
      <Card className="w-full max-w-md p-6 space-y-6">
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
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Nhập lại mật khẩu</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Nhập lại mật khẩu"
              />
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