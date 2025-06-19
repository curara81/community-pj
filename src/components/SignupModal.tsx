
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
  const [signupMethod, setSignupMethod] = useState<'select' | 'user-type' | 'email' | 'business'>('select');
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
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleSocialSignup('google')}
            variant="outline"
            className="w-14 h-14 rounded-full border-gray-300 hover:bg-gray-50 p-0 flex items-center justify-center"
          >
            <img 
              src="/lovable-uploads/dea4eab4-d07d-4996-99e9-e9004be8dbb2.png" 
              alt="Google" 
              className="w-10 h-10"
            />
          </Button>

          <Button
            onClick={() => handleSocialSignup('apple')}
            variant="outline"
            className="w-14 h-14 rounded-full border-gray-300 hover:bg-gray-50 p-0 flex items-center justify-center"
          >
            <img 
              src="/lovable-uploads/e29d3fb8-fbb7-4566-9230-e0af1d4c4ddf.png" 
              alt="Apple" 
              className="w-10 h-10"
            />
          </Button>

          <Button
            onClick={() => handleSocialSignup('kakao')}
            variant="outline"
            className="w-14 h-14 rounded-full border-gray-300 hover:bg-gray-50 p-0 flex items-center justify-center"
          >
            <img 
              src="/lovable-uploads/9748ff8c-0eb2-44ff-bb6a-fada797ea6d3.png" 
              alt="Kakao" 
              className="w-10 h-10"
            />
          </Button>
        </div>

        <Button
          onClick={() => setSignupMethod('user-type')}
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

  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => setSignupMethod('email')}
          className="border-2 border-orange-400 rounded-lg p-6 cursor-pointer hover:bg-orange-50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            </div>
            <span className="font-medium text-gray-700">개인 회원가입</span>
          </div>
        </div>
        
        <div 
          onClick={() => setSignupMethod('business')}
          className="border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 text-orange-400">
              🏢
            </div>
            <span className="font-medium text-gray-700">단체 회원가입</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setSignupMethod('select')}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          onClick={() => setSignupMethod('email')}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
        >
          다음
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
              {signupMethod === 'user-type' && '회원가입'}
              {signupMethod === 'email' && '개인 회원가입'}
              {signupMethod === 'business' && '단체 회원가입'}
            </DialogTitle>
          </DialogHeader>

          {signupMethod === 'select' && renderSelectMethod()}
          {signupMethod === 'user-type' && renderUserTypeSelection()}
          
          {signupMethod === 'email' && (
            <EmailSignupForm
              userType="individual"
              onBack={() => setSignupMethod('user-type')}
              onSuccess={() => onOpenChange(false)}
            />
          )}

          {signupMethod === 'business' && (
            <EmailSignupForm
              userType="business"
              onBack={() => setSignupMethod('user-type')}
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
