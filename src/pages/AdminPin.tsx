import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AdminPin() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (pin === '251209#') {
      toast.success('Xác thực thành công!');
      navigate('/admin-dashboard');
    } else {
      toast.error('Mã PIN không đúng');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Xác thực Admin</h1>
          <p className="text-muted-foreground mt-2">
            Vui lòng nhập mã PIN để truy cập giao diện quản lý
          </p>
        </div>

        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mã PIN</label>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              placeholder="Nhập mã PIN"
              className="text-center text-lg tracking-widest"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Đang xác thực...' : 'Xác thực'}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate('/auth')}
          >
            Quay lại đăng nhập
          </Button>
        </div>
      </Card>
    </div>
  );
}