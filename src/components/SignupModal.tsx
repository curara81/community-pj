
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import EmailSignupForm from './EmailSignupForm';
import PrivacyConsentModal from './PrivacyConsentModal';

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

const SignupModal = ({ open, onOpenChange, onSwitchToLogin }: SignupModalProps) => {
  const [signupMethod, setSignupMethod] = useState<'select' | 'email' | 'business'>('select');
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [privacyConsented, setPrivacyConsented] = useState(false);
  const { toast } = useToast();

  const handleSocialSignup = async (provider: 'google' | 'kakao' | 'apple') => {
    if (!privacyConsented) {
      setShowPrivacyConsent(true);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: "소셜 회원가입 실패",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`${provider} signup error:`, error);
    }
  };

  const handlePrivacyConsent = (consented: boolean) => {
    setPrivacyConsented(consented);
    setShowPrivacyConsent(false);
  };

  const renderSelectMethod = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <Button
          onClick={() => handleSocialSignup('google')}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
        >
          🔍 구글
        </Button>

        <Button
          onClick={() => handleSocialSignup('kakao')}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
        >
          💬 카카오
        </Button>

        <Button
          onClick={() => handleSocialSignup('apple')}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
        >
          🍎 애플
        </Button>

        <Button
          onClick={() => setSignupMethod('email')}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
        >
          ID/PW로 가입하기
        </Button>
      </div>

      <div className="text-center text-sm text-gray-600 border-t pt-4">
        <p>만 14세 미만 혹은 단체(사업자/비사업자)는</p>
        <p>ID/PW로만 가입 가능합니다.</p>
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:text-blue-700"
        >
          이미 계정이 있으신가요? 로그인
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-800">
              {signupMethod === 'select' && '회원가입'}
              {signupMethod === 'email' && '개인 회원가입'}
              {signupMethod === 'business' && '단체 회원가입'}
            </DialogTitle>
          </DialogHeader>

          {signupMethod === 'select' && renderSelectMethod()}
          
          {(signupMethod === 'email' || signupMethod === 'business') && (
            <EmailSignupForm
              userType={signupMethod === 'business' ? 'business' : 'individual'}
              onBack={() => setSignupMethod('select')}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <PrivacyConsentModal
        open={showPrivacyConsent}
        onOpenChange={setShowPrivacyConsent}
        onConsent={handlePrivacyConsent}
      />
    </>
  );
};

export default SignupModal;
