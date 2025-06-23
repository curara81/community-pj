
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import LoginModal from './LoginModal';
import DonationHistoryModal from './DonationHistoryModal';
import { useToast } from '@/hooks/use-toast';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const [showDonationHistory, setShowDonationHistory] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast({
        title: "로그아웃 완료",
        description: "성공적으로 로그아웃되었습니다.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDonationHistory = () => {
    if (!user) {
      toast({
        title: "로그인 필요",
        description: "기부내역을 보려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }
    setShowDonationHistory(true);
  };

  if (loading) {
    return (
      <Button disabled className="!bg-gray-400 !text-white">
        로딩 중...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Button
          onClick={handleDonationHistory}
          variant="outline"
          className="!border-blue-500 !text-blue-600 hover:!bg-blue-50"
        >
          기부내역
        </Button>
        <span className="text-sm text-gray-600 max-w-[150px] truncate">
          {user.email}
        </span>
        <Button
          onClick={handleSignOut}
          disabled={isSigningOut}
          variant="outline"
          className="!border-red-500 !text-red-600 hover:!bg-red-50 disabled:opacity-50"
        >
          {isSigningOut ? '로그아웃 중...' : '로그아웃'}
        </Button>
        <DonationHistoryModal 
          open={showDonationHistory} 
          onOpenChange={setShowDonationHistory}
        />
      </div>
    );
  }

  return <LoginModal />;
};

export default AuthButton;
