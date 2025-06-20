
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import DonationHistoryModal from './DonationHistoryModal';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDonationHistory, setShowDonationHistory] = useState(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', user.id)
            .single();

          if (data && !error) {
            setUserName(data.name);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserName('');
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleDonationHistoryClick = () => {
    window.open('https://link.donationbox.co.kr/userPaymentsLogin.jsp?uid=cS5wf7XV59', '_blank');
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {userName && (
          <span className="text-slate-600 font-medium">
            {userName}님 환영합니다.
          </span>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleDonationHistoryClick}
            className="text-gray-700 hover:text-blue-600"
          >
            기부내역조회
          </Button>
          <Button
            variant="ghost"
            onClick={signOut}
            className="text-gray-700 hover:text-blue-600"
          >
            로그아웃
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={handleDonationHistoryClick}
        className="text-gray-700 hover:text-blue-600"
      >
        기부내역조회
      </Button>
      <Button
        variant="ghost"
        onClick={() => setShowLoginModal(true)}
        className="text-gray-700 hover:text-blue-600"
      >
        로그인
      </Button>
      <Button
        variant="ghost"
        onClick={() => setShowSignupModal(true)}
        className="text-gray-700 hover:text-blue-600"
      >
        회원가입
      </Button>
      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />
      <SignupModal 
        open={showSignupModal} 
        onOpenChange={setShowSignupModal}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default AuthButton;
