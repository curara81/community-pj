
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: () => void;
}

const LoginModal = ({ open, onOpenChange, onSwitchToSignup }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "로그인 실패",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "로그인 성공",
          description: "환영합니다!",
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: "소셜 로그인 실패",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            로그인
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                아이디 (이메일)
              </label>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                패스워드
              </label>
              <Input
                type="password"
                placeholder="패스워드를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-center text-sm font-medium text-gray-700">
              SNS 로그인/회원가입
            </h4>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleSocialLogin('google')}
                variant="outline"
                className="w-16 h-16 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 p-0"
              >
                <span className="text-2xl">🔍</span>
              </Button>

              <Button
                onClick={() => handleSocialLogin('kakao')}
                variant="outline"
                className="w-16 h-16 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 p-0"
              >
                <span className="text-2xl">💬</span>
              </Button>

              <Button
                onClick={() => handleSocialLogin('apple')}
                variant="outline"
                className="w-16 h-16 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 p-0"
              >
                <span className="text-2xl">🍎</span>
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700"
            >
              아직 계정이 없으신가요? 회원가입
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
