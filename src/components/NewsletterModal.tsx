
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface NewsletterModalProps {
  children: React.ReactNode;
}

const NewsletterModal = ({ children }: NewsletterModalProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const interestOptions = [
    '난민사역 소식',
    '돌봄 사업 현황',
    '자원봉사 기회',
    '후원 안내',
    '교육 프로그램',
    '행사 및 이벤트'
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
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }
    console.log('뉴스레터 신청:', { email, name, interests });
    alert('뉴스레터 신청이 완료되었습니다. 감사합니다!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-stone-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-stone-800">
            📮 뉴스레터 신청
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">이메일 *</label>
            <Input
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">성함</label>
            <Input
              type="text"
              placeholder="성함을 입력해주세요 (선택사항)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">관심 있는 소식 (복수선택 가능)</label>
            <div className="space-y-2">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <label htmlFor={interest} className="text-sm text-stone-700">{interest}</label>
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
            />
            <label htmlFor="terms" className="text-xs text-stone-600">
              개인정보 수집 및 이용에 동의합니다. 
              (수집목적: 뉴스레터 발송, 보관기간: 구독 해지 시까지)
            </label>
          </div>

          <Button type="submit" className="w-full bg-stone-600 hover:bg-stone-700 text-white font-semibold">
            뉴스레터 신청하기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
