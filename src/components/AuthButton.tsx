
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import DonationHistoryModal from './DonationHistoryModal';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDonationHistory, setShowDonationHistory] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const { toast } = useToast();

  // 사용자 프로필 정보 가져오기
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error fetching user profile:', error);
            setUserName(user.email?.split('@')[0] || '사용자');
          } else {
            setUserName(data?.name || user.email?.split('@')[0] || '사용자');
          }
        } catch (error) {
          console.error('Error:', error);
          setUserName(user.email?.split('@')[0] || '사용자');
        }
      };
      
      fetchUserProfile();
    } else {
      setUserName(null);
    }
  }, [user]);

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

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  if (loading) {
    return (
      <Button disabled className="bg-slate-400 text-white hover:bg-slate-400">
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
          className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-white"
        >
          기부내역
        </Button>
        <span className="text-sm text-gray-700 max-w-[200px] truncate font-medium">
          {userName}님 환영합니다.
        </span>
        <Button
          onClick={handleSignOut}
          disabled={isSigningOut}
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50 bg-white"
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

  return (
    <>
      <Button
        onClick={() => setShowLoginModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        로그인
      </Button>
      <LoginModal 
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal 
        open={showSignupModal}
        onOpenChange={setShowSignupModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default AuthButton;
