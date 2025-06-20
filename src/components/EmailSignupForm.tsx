
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Under14ConsentModal from './Under14ConsentModal';
import TermsModal from './TermsModal';
import MarketingConsentModal from './MarketingConsentModal';
import PrivacyConsentModal from './PrivacyConsentModal';

interface EmailSignupFormProps {
  userType: 'individual' | 'business' | 'non-business';
  onBack: () => void;
  onSuccess: () => void;
}

const EmailSignupForm = ({ userType, onBack, onSuccess }: EmailSignupFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthDate: '',
    gender: '',
    businessName: '',
    businessNumber: '',
    representativeName: '',
  });
  
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketingConsent: false,
  });
  
  const [isUnder14, setIsUnder14] = useState(false);
  const [under14Consented, setUnder14Consented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUnder14Modal, setShowUnder14Modal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements(prev => ({ ...prev, [field]: checked }));
  };

  const handleUnder14Check = (checked: boolean) => {
    setIsUnder14(checked);
    if (checked) {
      setShowUnder14Modal(true);
    } else {
      setUnder14Consented(false);
    }
  };

  const handleUnder14Consent = (consented: boolean) => {
    setUnder14Consented(consented);
    if (!consented) {
      setIsUnder14(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "비밀번호 확인",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    if (!agreements.termsOfService || !agreements.privacyPolicy) {
      toast({
        title: "약관 동의",
        description: "필수 약관에 동의해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (isUnder14 && !under14Consented) {
      toast({
        title: "보호자 동의 필요",
        description: "만 14세 미만의 경우 보호자 동의가 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            birth_date: formData.birthDate,
            gender: formData.gender,
            user_type: userType,
            business_name: (userType === 'business' || userType === 'non-business') ? formData.businessName : null,
            business_number: userType === 'business' ? formData.businessNumber : null,
            representative_name: (userType === 'business' || userType === 'non-business') ? formData.representativeName : null,
            marketing_consent: agreements.marketingConsent,
            under_14: isUnder14,
            guardian_consent: under14Consented,
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
        toast({
          title: "회원가입 성공",
          description: "이메일 인증을 확인해주세요.",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            이메일 *
          </label>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
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
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
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
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            {(userType === 'business' || userType === 'non-business') ? '담당자명' : '이름'} *
          </label>
          <Input
            type="text"
            placeholder={(userType === 'business' || userType === 'non-business') ? '담당자명을 입력해주세요' : '이름을 입력해주세요'}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
          />
        </div>

        {(userType === 'business' || userType === 'non-business') && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                단체명 *
              </label>
              <Input
                type="text"
                placeholder="단체명을 입력해주세요"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
              />
            </div>

            {userType === 'business' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  사업자등록번호 *
                </label>
                <Input
                  type="text"
                  placeholder="사업자등록번호를 입력해주세요"
                  value={formData.businessNumber}
                  onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                  required
                  className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {userType === 'business' ? '대표자명' : '대표자명 (선택)'}
              </label>
              <Input
                type="text"
                placeholder="대표자명을 입력해주세요"
                value={formData.representativeName}
                onChange={(e) => handleInputChange('representativeName', e.target.value)}
                className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            휴대폰번호 *
          </label>
          <Input
            type="tel"
            placeholder="휴대폰번호를 입력해주세요"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-stone-500 placeholder:text-gray-600"
          />
        </div>

        {userType === 'individual' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                생년월일 *
              </label>
              <div className="flex gap-3 items-center">
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  required
                  className="bg-white border-gray-300 focus:border-stone-500 flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="under14"
                    checked={isUnder14}
                    onCheckedChange={handleUnder14Check}
                  />
                  <label htmlFor="under14" className="text-sm text-gray-700 whitespace-nowrap">
                    만 14세 미만
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                성별 *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="mr-2"
                  />
                  남성
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="mr-2"
                  />
                  여성
                </label>
              </div>
            </div>
          </>
        )}

        <div className="space-y-3 border-t pt-4">
          <h4 className="font-medium text-gray-700">약관 동의</h4>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsOfService"
                checked={agreements.termsOfService}
                onCheckedChange={(checked) => handleAgreementChange('termsOfService', !!checked)}
              />
              <label htmlFor="termsOfService" className="text-sm text-gray-700 flex-1">
                이용약관에 동의합니다 (필수)
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowTermsModal(true)}
                className="text-stone-600 hover:text-stone-700 underline p-0 h-auto"
              >
                내용보기
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacyPolicy"
                checked={agreements.privacyPolicy}
                onCheckedChange={(checked) => handleAgreementChange('privacyPolicy', !!checked)}
              />
              <label htmlFor="privacyPolicy" className="text-sm text-gray-700 flex-1">
                개인정보처리방침에 동의합니다 (필수)
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivacyModal(true)}
                className="text-stone-600 hover:text-stone-700 underline p-0 h-auto"
              >
                내용보기
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={agreements.marketingConsent}
                onCheckedChange={(checked) => handleAgreementChange('marketingConsent', !!checked)}
              />
              <label htmlFor="marketingConsent" className="text-sm text-gray-700 flex-1">
                마케팅 정보 수신에 동의합니다 (선택)
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowMarketingModal(true)}
                className="text-stone-600 hover:text-stone-700 underline p-0 h-auto"
              >
                내용보기
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            이전
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white"
          >
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </div>
      </form>

      <Under14ConsentModal
        open={showUnder14Modal}
        onOpenChange={setShowUnder14Modal}
        onConsent={handleUnder14Consent}
      />

      <TermsModal
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
      />

      <PrivacyConsentModal
        open={showPrivacyModal}
        onOpenChange={setShowPrivacyModal}
        onConsent={() => {}}
      />

      <MarketingConsentModal
        open={showMarketingModal}
        onOpenChange={setShowMarketingModal}
      />
    </>
  );
};

export default EmailSignupForm;
