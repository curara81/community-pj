
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DonationModalProps {
  children: React.ReactNode;
  donationType?: 'regular' | 'one-time';
}

const DonationModal = ({ children, donationType: initialDonationType = 'regular' }: DonationModalProps) => {
  const [donationType, setDonationType] = useState<'regular' | 'one-time'>(initialDonationType);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isUnder14, setIsUnder14] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cms' | 'card'>('cms');
  const [withdrawalDay, setWithdrawalDay] = useState('5');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  // 신용카드 관련 상태
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardHolderPhone, setCardHolderPhone] = useState('');
  const [paymentDay, setPaymentDay] = useState('5');

  const donationAmounts = ['20,000원', '30,000원', '50,000원', '80,000원', '100,000원', '직접입력'];

  const handleAmountSelect = (selectedAmount: string) => {
    if (selectedAmount === '직접입력') {
      setAmount('직접입력');
    } else {
      setAmount(selectedAmount);
      setCustomAmount('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = amount === '직접입력' ? customAmount : amount;
    console.log('후원 신청:', { 
      donationType, 
      amount: finalAmount, 
      name, 
      email, 
      phone, 
      isUnder14,
      paymentMethod,
      withdrawalDay: donationType === 'regular' ? withdrawalDay : null,
      bankInfo: donationType === 'regular' && paymentMethod === 'cms' ? { bankName, accountNumber } : null,
      cardInfo: donationType === 'regular' && paymentMethod === 'card' ? { cardHolderName, cardHolderPhone, paymentDay } : null
    });
    alert(`${donationType === 'regular' ? '정기' : '일시'} 후원 신청이 접수되었습니다. 담당자가 연락드리겠습니다.`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-stone-50 border-stone-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-stone-800">
            💝 후원 신청하기
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={donationType === 'regular' ? 'default' : 'outline'}
              onClick={() => setDonationType('regular')}
              className="flex-1 bg-stone-600 hover:bg-stone-700 text-white border-stone-300"
            >
              정기후원
            </Button>
            <Button
              type="button"
              variant={donationType === 'one-time' ? 'default' : 'outline'}
              onClick={() => setDonationType('one-time')}
              className="flex-1 bg-stone-600 hover:bg-stone-700 text-white border-stone-300"
            >
              일시후원
            </Button>
          </div>

          {/* 후원금액 선택 */}
          <div>
            <label className="block text-sm font-medium mb-3 text-stone-700">후원금액</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {donationAmounts.map((amountOption) => (
                <Button
                  key={amountOption}
                  type="button"
                  variant={amount === amountOption ? 'default' : 'outline'}
                  onClick={() => handleAmountSelect(amountOption)}
                  className={`h-12 text-sm ${
                    amount === amountOption 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {amountOption}
                </Button>
              ))}
            </div>
            {amount === '직접입력' && (
              <Input
                type="text"
                placeholder="금액을 입력해주세요"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-white border-stone-300 focus:border-blue-500"
                required
              />
            )}
          </div>

          {/* 정기후원일 경우 결제 방법 선택 */}
          {donationType === 'regular' && (
            <div>
              <label className="block text-sm font-medium mb-3 text-stone-700">결제수단</label>
              <div className="flex gap-2 mb-3">
                <Button
                  type="button"
                  variant={paymentMethod === 'cms' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('cms')}
                  className={`flex-1 ${
                    paymentMethod === 'cms'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  CMS자동이체
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 ${
                    paymentMethod === 'card'
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  신용카드
                </Button>
              </div>
              
              {paymentMethod === 'cms' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone-700">출금일</label>
                    <Select value={withdrawalDay} onValueChange={setWithdrawalDay}>
                      <SelectTrigger className="bg-white border-stone-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">매월 5일</SelectItem>
                        <SelectItem value="10">매월 10일</SelectItem>
                        <SelectItem value="15">매월 15일</SelectItem>
                        <SelectItem value="20">매월 20일</SelectItem>
                        <SelectItem value="25">매월 25일</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone-700">은행명</label>
                    <Input
                      type="text"
                      placeholder="은행을 선택해 주세요"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="bg-white border-stone-300 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone-700">계좌번호</label>
                    <Input
                      type="text"
                      placeholder="휴대폰번호 형식의 계좌번호 사용불가"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="bg-white border-stone-300 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800 mb-1">
                      ※ 휴대전화번호 형식의 평생계좌는 CMS자동이체신청이 불가합니다.
                    </p>
                    <p className="text-xs text-blue-800">
                      ※ CMS자동이체 신청 시 전자금융거래법 제15조 및 동법 시행령 제10조에 따라 출금동의 인증이 필요합니다.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone-700">카드주명</label>
                    <Input
                      type="text"
                      placeholder="카드 소유자 성함을 입력해주세요"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      className="bg-white border-stone-300 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone-700">카드주 휴대폰</label>
                    <Input
                      type="tel"
                      placeholder="카드 소유자 휴대폰번호를 입력해주세요"
                      value={cardHolderPhone}
                      onChange={(e) => setCardHolderPhone(e.target.value)}
                      className="bg-white border-stone-300 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone-700">결제일</label>
                    <Select value={paymentDay} onValueChange={setPaymentDay}>
                      <SelectTrigger className="bg-white border-stone-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">매월 5일</SelectItem>
                        <SelectItem value="10">매월 10일</SelectItem>
                        <SelectItem value="15">매월 15일</SelectItem>
                        <SelectItem value="20">매월 20일</SelectItem>
                        <SelectItem value="25">매월 25일</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-orange-100 p-3 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-800">
                      ※ 신용카드 후원 시 나이스빌링, 나이스_정기과금, 후원금_나이스 또는 Nice로 표시되어 청구됩니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 기본정보 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-stone-800">기본정보</h4>
            
            <div>
              <div className="flex items-center gap-4 mb-2">
                <label className="text-sm font-medium text-stone-700">성함 *</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="under14"
                    checked={isUnder14}
                    onCheckedChange={(checked) => setIsUnder14(checked as boolean)}
                  />
                  <label htmlFor="under14" className="text-xs text-stone-600">
                    만 14세 미만
                  </label>
                </div>
              </div>
              <Input
                type="text"
                placeholder="성함을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-stone-300 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-stone-700">휴대폰번호 *</label>
              <Input
                type="tel"
                placeholder="휴대폰번호를 입력해주세요"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border-stone-300 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-stone-700">이메일 *</label>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-stone-300 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <Card className="bg-blue-100 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-blue-800">💳 계좌 안내</h4>
              <p className="text-sm text-blue-800">하나은행 218-910044-94704</p>
              <p className="text-sm text-blue-700 mb-3">(예금주: 사단법인 컴유니티)</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                ※ 컴유니티는 별도의 운영후원금으로 운영되고 있어, 여러분들의 소중한 후원금은 100% 현장사업에 사용됩니다.
              </p>
            </CardContent>
          </Card>

          {isUnder14 && (
            <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                ※ 만 14세 미만 어린이는 법정보호자의 동의 절차가 필요합니다.
              </p>
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            후원 신청하기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
