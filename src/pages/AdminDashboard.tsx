import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface UserData {
  taikhoan: string;
  email: string;
  matkhau: string;
  tien: number;
  maphanquyen: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserData>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    const userData = JSON.parse(currentUser);
    if (userData.maphanquyen !== 3) {
      navigate('/auth');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('dataname')
        .select('*')
        .order('maphanquyen', { ascending: false });

      if (error) {
        toast.error('Lỗi khi tải dữ liệu người dùng');
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra');
    }
    setLoading(false);
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user.taikhoan);
    setEditForm(user);
  };

  const handleSave = async () => {
    if (!editingUser) return;

    try {
      const { error } = await supabase
        .from('dataname')
        .update(editForm)
        .eq('taikhoan', editingUser);

      if (error) {
        toast.error('Lỗi khi cập nhật dữ liệu');
        console.error('Error updating user:', error);
        return;
      }

      toast.success('Cập nhật thành công');
      setEditingUser(null);
      setEditForm({});
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra');
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/auth');
  };

  const getRoleText = (role: number) => {
    switch (role) {
      case 1: return 'Người dùng';
      case 2: return 'Đối tác';
      case 3: return 'Admin';
      default: return 'Không xác định';
    }
  };

  const getRoleColor = (role: number) => {
    switch (role) {
      case 1: return 'secondary';
      case 2: return 'default';
      case 3: return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Quản lý hệ thống</h1>
          <Button onClick={handleLogout} variant="outline">
            Đăng xuất
          </Button>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Danh sách tài khoản</h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tài khoản</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mật khẩu (mã hóa)</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Phân quyền</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.taikhoan}>
                    <TableCell>
                      {editingUser === user.taikhoan ? (
                        <Input
                          value={editForm.taikhoan || ''}
                          onChange={(e) => setEditForm({...editForm, taikhoan: e.target.value})}
                        />
                      ) : (
                        user.taikhoan
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUser === user.taikhoan ? (
                        <Input
                          value={editForm.email || ''}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {user.matkhau.substring(0, 20)}...
                    </TableCell>
                    <TableCell>
                      {editingUser === user.taikhoan ? (
                        <Input
                          type="number"
                          value={editForm.tien || 0}
                          onChange={(e) => setEditForm({...editForm, tien: Number(e.target.value)})}
                        />
                      ) : (
                        user.tien?.toLocaleString() || '0'
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUser === user.taikhoan ? (
                        <select
                          value={editForm.maphanquyen || 1}
                          onChange={(e) => setEditForm({...editForm, maphanquyen: Number(e.target.value)})}
                          className="border rounded px-2 py-1"
                        >
                          <option value={1}>Người dùng (1)</option>
                          <option value={2}>Đối tác (2)</option>
                          <option value={3}>Admin (3)</option>
                        </select>
                      ) : (
                        <Badge variant={getRoleColor(user.maphanquyen)}>
                          {getRoleText(user.maphanquyen)} ({user.maphanquyen})
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUser === user.taikhoan ? (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            Lưu
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            Hủy
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                          Sửa
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}