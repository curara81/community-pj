
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PrivacyConsentModal from './PrivacyConsentModal';

interface EmailSignupFormProps {
  userType: 'individual' | 'business';
  onBack: () => void;
  onSuccess: () => void;
}

const EmailSignupForm = ({ userType, onBack, onSuccess }: EmailSignupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phone: '',
    businessName: '',
    businessRegistrationNumber: '',
    representativeName: '',
    representativePhone: '',
    businessType: 'business_entity' as 'business_entity' | 'non_business_entity'
  });
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [privacyConsented, setPrivacyConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyConsented) {
      setShowPrivacyConsent(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "비밀번호 확인",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
            birth_date: formData.birthDate,
            phone: formData.phone,
            user_type: userType === 'business' ? formData.businessType : 'individual',
            business_name: formData.businessName,
            business_registration_number: formData.businessRegistrationNumber,
            representative_name: formData.representativeName,
            representative_phone: formData.representativePhone
          }
        }
      });

      if (error) {
        toast({
          title: "회원가입 실패",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (data.user) {
          const profileData = {
            id: data.user.id,
            name: formData.name,
            birth_date: formData.birthDate || null,
            phone: formData.phone,
            user_type: userType === 'business' ? formData.businessType : 'individual',
            business_name: formData.businessName || null,
            business_registration_number: formData.businessRegistrationNumber || null,
            representative_name: formData.representativeName || null
          };

          const { error: profileError } = await supabase
            .from('profiles')
            .upsert(profileData);

          if (profileError) {
            console.error('Profile update error:', profileError);
          }
        }

        toast({
          title: "회원가입 성공",
          description: "이메일을 확인해주세요.",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyConsent = (consented: boolean) => {
    setPrivacyConsented(consented);
    setShowPrivacyConsent(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {userType === 'business' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">👤</div>
                <span className="text-sm text-gray-700">개인 회원가입</span>
              </div>
              <div className="border-2 border-orange-400 rounded-lg p-4 text-center bg-orange-50">
                <div className="text-2xl mb-2">🏢</div>
                <span className="text-sm text-gray-700 font-medium">단체 회원가입</span>
              </div>
            </div>

            <div className="space-y-3">
              <RadioGroup
                value={formData.businessType}
                onValueChange={(value) => 
                  setFormData({
                    ...formData, 
                    businessType: value as 'business_entity' | 'non_business_entity'
                  })
                }
                className="flex gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business_entity" id="business_entity" />
                  <label htmlFor="business_entity" className="text-sm text-gray-700">
                    사업자
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non_business_entity" id="non_business_entity" />
                  <label htmlFor="non_business_entity" className="text-sm text-gray-700">
                    비사업자
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {userType === 'business' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {formData.businessType === 'business_entity' ? '사업자 확인' : '단체명 확인'}
              </label>
              <Input
                type="text"
                placeholder="단체명"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                required
                className="bg-white border-gray-300 focus:border-blue-500"
              />
            </div>

            {formData.businessType === 'business_entity' && (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="사업자등록번호"
                  value={formData.businessRegistrationNumber}
                  onChange={(e) => setFormData({...formData, businessRegistrationNumber: e.target.value})}
                  className="flex-1 bg-white border-gray-300 focus:border-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="whitespace-nowrap text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  사업자번호 확인
                </Button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                담당자 이름
              </label>
              <Input
                type="text"
                placeholder="담당자 이름"
                value={formData.representativeName}
                onChange={(e) => setFormData({...formData, representativeName: e.target.value})}
                required
                className="bg-white border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                휴대폰 번호
              </label>
              <div className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="-없이 숫자만 입력"
                  value={formData.representativePhone}
                  onChange={(e) => setFormData({...formData, representativePhone: e.target.value})}
                  required
                  className="flex-1 bg-white border-gray-300 focus:border-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="whitespace-nowrap text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  인증번호 발송
                </Button>
              </div>
            </div>
          </>
        )}

        {userType === 'individual' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                이름 *
              </label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="bg-white border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                생년월일
              </label>
              <Input
                type="date"
                placeholder="예시) 19900101"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="bg-white border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                휴대폰 번호
              </label>
              <div className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="-없이 숫자만 입력"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="flex-1 bg-white border-gray-300 focus:border-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="whitespace-nowrap text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  인증번호 발송
                </Button>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            이메일 *
          </label>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="bg-white border-gray-300 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            비밀번호 *
          </label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="bg-white border-gray-300 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            비밀번호 확인 *
          </label>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            className="bg-white border-gray-300 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={privacyConsented}
            onCheckedChange={() => setShowPrivacyConsent(true)}
          />
          <label htmlFor="privacy" className="text-sm text-gray-700">
            [필수] 개인정보 수집 및 이용 동의
          </label>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowPrivacyConsent(true)}
            className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm underline"
          >
            보기
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={loading || !privacyConsented}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            {loading ? '가입 중...' : '다음'}
          </Button>
        </div>
      </form>

      <PrivacyConsentModal
        open={showPrivacyConsent}
        onOpenChange={setShowPrivacyConsent}
        onConsent={handlePrivacyConsent}
      />
    </>
  );
};

export default EmailSignupForm;
