
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSignupModal } from '@/hooks/useSignupModal';
import SignupMethodSelector from './signup/SignupMethodSelector';
import UserTypeSelector from './signup/UserTypeSelector';
import BusinessTypeSelector from './signup/BusinessTypeSelector';
import EmailSignupForm from './EmailSignupForm';
import PrivacyConsentModal from './PrivacyConsentModal';

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

const SignupModal = ({ open, onOpenChange, onSwitchToLogin }: SignupModalProps) => {
  const {
    signupMethod,
    setSignupMethod,
    showPrivacyConsent,
    setShowPrivacyConsent,
    handleSocialSignup,
    handlePrivacyConsent,
  } = useSignupModal();

  const getTitle = () => {
    switch (signupMethod) {
      case 'select': return '회원가입';
      case 'user-type': return '회원가입';
      case 'business-type': return '단체 회원가입';
      case 'email': return '개인 회원가입';
      case 'business': return '사업자 회원가입';
      case 'non-business': return '비사업자 회원가입';
      default: return '회원가입';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-white border-slate-300 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-800">
              {getTitle()}
            </DialogTitle>
          </DialogHeader>

          {signupMethod === 'select' && (
            <SignupMethodSelector
              onSocialSignup={handleSocialSignup}
              onEmailSignup={() => setSignupMethod('user-type')}
              onSwitchToLogin={onSwitchToLogin}
            />
          )}

          {signupMethod === 'user-type' && (
            <UserTypeSelector
              onSelectIndividual={() => setSignupMethod('email')}
              onSelectBusiness={() => setSignupMethod('business-type')}
              onBack={() => setSignupMethod('select')}
              onNext={() => setSignupMethod('email')}
            />
          )}

          {signupMethod === 'business-type' && (
            <BusinessTypeSelector
              onSelectBusiness={() => setSignupMethod('business')}
              onSelectNonBusiness={() => setSignupMethod('non-business')}
              onBack={() => setSignupMethod('user-type')}
              onNext={() => setSignupMethod('business')}
            />
          )}
          
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
              onBack={() => setSignupMethod('business-type')}
              onSuccess={() => onOpenChange(false)}
            />
          )}

          {signupMethod === 'non-business' && (
            <EmailSignupForm
              userType="non-business"
              onBack={() => setSignupMethod('business-type')}
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
