
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface DonationModalProps {
  children: React.ReactNode;
}

const DonationModal = ({ children }: DonationModalProps) => {
  const [donationType, setDonationType] = useState<'regular' | 'one-time'>('regular');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('후원 신청:', { donationType, amount, name, email, phone });
    // 실제로는 여기서 후원 처리 로직을 구현
    alert(`${donationType === 'regular' ? '정기' : '일시'} 후원 신청이 접수되었습니다. 담당자가 연락드리겠습니다.`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-stone-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-800">
            💝 후원 신청하기
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={donationType === 'regular' ? 'default' : 'outline'}
              onClick={() => setDonationType('regular')}
              className="flex-1"
            >
              정기후원
            </Button>
            <Button
              type="button"
              variant={donationType === 'one-time' ? 'default' : 'outline'}
              onClick={() => setDonationType('one-time')}
              className="flex-1"
            >
              일시후원
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">후원 금액</label>
            <Input
              type="text"
              placeholder="후원 금액을 입력해주세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white border-stone-300 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">성함</label>
            <Input
              type="text"
              placeholder="성함을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-stone-300 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">이메일</label>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-stone-300 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">연락처</label>
            <Input
              type="tel"
              placeholder="연락처를 입력해주세요"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border-stone-300 focus:border-amber-500"
              required
            />
          </div>

          <Card className="bg-amber-100 border-amber-200">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-amber-800">💳 계좌 안내</h4>
              <p className="text-sm text-amber-800">하나은행 218-910044-94704</p>
              <p className="text-sm text-amber-700">(예금주: 사단법인 컴유니티)</p>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
            후원 신청하기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
