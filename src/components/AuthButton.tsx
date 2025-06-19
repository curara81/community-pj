
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import DonationHistoryModal from './DonationHistoryModal';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDonationHistory, setShowDonationHistory] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setShowDonationHistory(true)}
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
        <DonationHistoryModal 
          open={showDonationHistory} 
          onOpenChange={setShowDonationHistory}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
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
