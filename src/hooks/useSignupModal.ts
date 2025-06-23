
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type SignupMethod = 'select' | 'user-type' | 'business-type' | 'email' | 'business' | 'non-business';

export const useSignupModal = () => {
  const [signupMethod, setSignupMethod] = useState<SignupMethod>('select');
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

  return {
    signupMethod,
    setSignupMethod,
    showPrivacyConsent,
    setShowPrivacyConsent,
    privacyConsented,
    handleSocialSignup,
    handlePrivacyConsent,
  };
};
