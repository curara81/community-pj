
import { Button } from "@/components/ui/button";

interface SignupMethodSelectorProps {
  onSocialSignup: (provider: 'google' | 'kakao' | 'apple') => void;
  onEmailSignup: () => void;
  onSwitchToLogin: () => void;
}

const SignupMethodSelector = ({ onSocialSignup, onEmailSignup, onSwitchToLogin }: SignupMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => onSocialSignup('google')}
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
            onClick={() => onSocialSignup('apple')}
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
            onClick={() => onSocialSignup('kakao')}
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
          onClick={onEmailSignup}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-slate-600 hover:text-white h-12"
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
          className="text-blue-600 hover:bg-slate-600 hover:text-white"
        >
          이미 계정이 있으신가요? 로그인
        </Button>
      </div>
    </div>
  );
};

export default SignupMethodSelector;
