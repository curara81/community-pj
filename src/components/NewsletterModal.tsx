
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsletterModalProps {
  children: React.ReactNode;
}

const NewsletterModal = ({ children }: NewsletterModalProps) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const interestOptions = [
    { ko: '난민사역 소식', en: 'Refugee Ministry News' },
    { ko: '돌봄 사업 현황', en: 'Care Program Updates' },
    { ko: '자원봉사 기회', en: 'Volunteer Opportunities' },
    { ko: '후원 안내', en: 'Donation Information' },
    { ko: '교육 프로그램', en: 'Education Programs' },
    { ko: '행사 및 이벤트', en: 'Events & Activities' }
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter(item => item !== interest));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert(t('개인정보 처리방침에 동의해주세요.', 'Please agree to the privacy policy.'));
      return;
    }
    alert(t('뉴스레터 신청이 완료되었습니다. 감사합니다!', 'Newsletter subscription completed. Thank you!'));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-stone-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-stone-800">
            📮 {t("뉴스레터 신청", "Newsletter Subscription")}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">{t("이메일", "Email")} *</label>
            <Input
              type="email"
              placeholder={t("이메일 주소를 입력해주세요", "Enter your email address")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">{t("성함", "Name")}</label>
            <Input
              type="text"
              placeholder={t("성함을 입력해주세요 (선택사항)", "Enter your name (optional)")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">{t("관심 있는 소식 (복수선택 가능)", "Topics of Interest (Multiple selections allowed)")}</label>
            <div className="space-y-2">
              {interestOptions.map((interest) => (
                <div key={interest.ko} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.ko}
                    checked={interests.includes(interest.ko)}
                    onCheckedChange={(checked) => handleInterestChange(interest.ko, checked as boolean)}
                    className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black w-5 h-5"
                  />
                  <label htmlFor={interest.ko} className="text-sm text-stone-700 font-bold">{t(interest.ko, interest.en)}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              required
              className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black w-5 h-5"
            />
            <label htmlFor="terms" className="text-xs text-stone-600 font-bold">
              {t("개인정보 수집 및 이용에 동의합니다. (수집목적: 뉴스레터 발송, 보관기간: 구독 해지 시까지)", "I agree to the collection and use of personal information. (Purpose: Newsletter delivery, Retention period: Until unsubscription)")}
            </label>
          </div>

          <Button type="submit" className="w-full bg-stone-600 hover:bg-stone-700 text-white font-semibold">
            {t("뉴스레터 신청하기", "Subscribe to Newsletter")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
