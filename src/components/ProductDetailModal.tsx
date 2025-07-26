import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  description?: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const handlePurchase = async () => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      toast({
        title: "Lỗi",
        description: "Vui lòng đăng nhập để mua sản phẩm",
        variant: "destructive",
      });
      return;
    }

    const user = JSON.parse(userData);
    if (!product) return;

    setIsProcessing(true);

    try {
      // Check if user has enough money
      if (user.tien < product.price) {
        toast({
          title: "Không đủ tiền",
          description: "Số dư không đủ để mua sản phẩm này",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Get fresh user data from database
      const { data: currentUserData, error: getUserError } = await supabase.rpc('get_user_by_email', {
        user_email: user.email
      });

      if (getUserError || !currentUserData || currentUserData.length === 0) {
        toast({
          title: "Lỗi",
          description: "Không thể lấy thông tin tài khoản",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      const freshUserData = currentUserData[0];
      
      // Check again with fresh data
      if (freshUserData.tien < product.price) {
        toast({
          title: "Không đủ tiền",
          description: "Số dư không đủ để mua sản phẩm này",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Calculate new balance
      const newBalance = freshUserData.tien - product.price;

      // Update user's balance in database
      const { error: updateError } = await supabase
        .from('dataname')
        .update({ tien: newBalance })
        .eq('email', user.email);

      if (updateError) {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật số dư",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Update localStorage
      const updatedUser = { ...user, tien: newBalance };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Trigger user data update event
      window.dispatchEvent(new Event('userDataUpdate'));

      // Success message
      toast({
        title: "Mua thành công!",
        description: "Vui lòng vào phần lịch sử để xem thông tin tài khoản",
      });

      // Close dialogs
      setShowConfirmDialog(false);
      onClose();

    } catch (error) {
      console.error('Error processing purchase:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xử lý giao dịch",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card border-border-glow">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.image_url ? (
                <>
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                    <img 
                      src={product.image_url} 
                      alt={`${product.name} - Ảnh 2`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Ảnh sản phẩm 1</span>
                  </div>
                  <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Ảnh sản phẩm 2</span>
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <span className="text-3xl font-bold text-neon-green">
                  {formatCurrency(product.price)}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Mô tả sản phẩm</h3>
                <div className="bg-card-bg border border-border-glow rounded-lg p-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description || "Tài khoản game chất lượng cao với đầy đủ tính năng và nội dung mở khóa. Được kiểm tra kỹ lưỡng trước khi giao hàng. Bảo hành 30 ngày, hỗ trợ 24/7."}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Đặc điểm nổi bật</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-card-bg border border-border-glow rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">✅ Bảo hành 30 ngày</span>
                  </div>
                  <div className="bg-card-bg border border-border-glow rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">✅ Giao hàng ngay lập tức</span>
                  </div>
                  <div className="bg-card-bg border border-border-glow rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">✅ Hỗ trợ 24/7</span>
                  </div>
                  <div className="bg-card-bg border border-border-glow rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">✅ Đã kiểm tra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Đóng
              </Button>
              <Button 
                variant="gaming" 
                onClick={() => setShowConfirmDialog(true)}
                className="flex-1"
                disabled={isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : "Mua ngay"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-gradient-card border-border-glow">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Xác nhận mua hàng</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Bạn có chắc chắn muốn mua "{product.name}" với giá {formatCurrency(product.price)}?
              <br />
              <br />
              Số tiền sẽ được trừ khỏi tài khoản của bạn ngay lập tức.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setShowConfirmDialog(false)}
              disabled={isProcessing}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handlePurchase}
              disabled={isProcessing}
              className="bg-neon-green hover:bg-neon-green/90 text-dark-bg"
            >
              {isProcessing ? "Đang xử lý..." : "Đồng ý"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetailModal;