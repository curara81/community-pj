
import { Button } from "@/components/ui/button";

interface SignupMethodSelectorProps {
  onEmailSignup: () => void;
  onSwitchToLogin: () => void;
}

const SignupMethodSelector = ({ onEmailSignup, onSwitchToLogin }: SignupMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Button
          onClick={onEmailSignup}
          className="w-full bg-slate-600 hover:bg-slate-700 text-white h-12"
        >
          ID/PW로 가입하기
        </Button>
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:bg-slate-600 hover:text-white"
        >
          이미 계정이 있으신가요? 로그인
        </Button>
      </div>
    </div>
  );
};

export default SignupMethodSelector;
