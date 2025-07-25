import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, Settings, DollarSign, Package } from "lucide-react";
import ProductManagement from "./ProductManagement";
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface UserData {
  taikhoan: string;
  email: string;
  matkhau: string;
  tien: number;
  maphanquyen: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserData>>({});
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is admin
    const userDataStr = localStorage.getItem('currentUser');
    if (!userDataStr) {
      navigate('/auth');
      return;
    }

    const userData = JSON.parse(userDataStr);
    if (userData.maphanquyen !== 3) {
      navigate('/auth');
      return;
    }

    setCurrentUser(userData);
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
    navigate('/');
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
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-foreground">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bảng điều khiển Admin
            </h1>
            <p className="text-muted-foreground">
              Chào mừng, {currentUser?.taikhoan}
            </p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="border-white/20 text-foreground hover:bg-white/5"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Tổng người dùng
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Tổng tiền trong hệ thống
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-green">
                {users.reduce((total, user) => total + (user.tien || 0), 0).toLocaleString()}đ
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Admin
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {users.filter(user => user.maphanquyen === 3).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px] bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">Tổng quan</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">Sản phẩm</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">Người dùng</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground">Tổng quan hệ thống</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Người dùng thường</p>
                      <p className="text-2xl font-bold text-foreground">
                        {users.filter(user => user.maphanquyen === 1).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Đối tác</p>
                      <p className="text-2xl font-bold text-foreground">
                        {users.filter(user => user.maphanquyen === 2).length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground">Quản lý người dùng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Tài khoản</TableHead>
                        <TableHead className="text-foreground">Email</TableHead>
                        <TableHead className="text-foreground">Số tiền</TableHead>
                        <TableHead className="text-foreground">Phân quyền</TableHead>
                        <TableHead className="text-foreground">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.taikhoan}>
                          <TableCell className="text-foreground">
                            {editingUser === user.taikhoan ? (
                              <Input
                                value={editForm.taikhoan || ''}
                                onChange={(e) => setEditForm({...editForm, taikhoan: e.target.value})}
                                className="bg-white/5 border-white/10 text-foreground"
                              />
                            ) : (
                              user.taikhoan
                            )}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {editingUser === user.taikhoan ? (
                              <Input
                                value={editForm.email || ''}
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                className="bg-white/5 border-white/10 text-foreground"
                              />
                            ) : (
                              user.email
                            )}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {editingUser === user.taikhoan ? (
                              <Input
                                type="number"
                                value={editForm.tien || 0}
                                onChange={(e) => setEditForm({...editForm, tien: Number(e.target.value)})}
                                className="bg-white/5 border-white/10 text-foreground"
                              />
                            ) : (
                              (user.tien?.toLocaleString() || '0') + 'đ'
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUser === user.taikhoan ? (
                              <select
                                value={editForm.maphanquyen || 1}
                                onChange={(e) => setEditForm({...editForm, maphanquyen: Number(e.target.value)})}
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-foreground"
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
                                <Button size="sm" onClick={handleSave} className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
                                  Lưu
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancel} className="border-white/20 text-foreground hover:bg-white/5">
                                  Hủy
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => handleEdit(user)} className="border-white/20 text-foreground hover:bg-white/5">
                                Sửa
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground">Cài đặt hệ thống</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Các tính năng cài đặt sẽ được phát triển trong tương lai.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;