import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DonationAmountSelector from './DonationAmountSelector';
import PaymentMethodSelector from './PaymentMethodSelector';
import DonorInfoForm from './DonorInfoForm';
import { sendDonationEmail } from '@/utils/emailService';

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
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardHolderPhone, setCardHolderPhone] = useState('');
  const [paymentDay, setPaymentDay] = useState('5');

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
    
    const formData = { 
      donationType, 
      amount: finalAmount, 
      name, 
      email, 
      phone, 
      isUnder14,
      paymentMethod,
      withdrawalDay: donationType === 'regular' ? withdrawalDay : undefined,
      bankName: donationType === 'regular' && paymentMethod === 'cms' ? bankName : undefined,
      accountNumber: donationType === 'regular' && paymentMethod === 'cms' ? accountNumber : undefined,
      cardHolderName: donationType === 'regular' && paymentMethod === 'card' ? cardHolderName : undefined,
      cardHolderPhone: donationType === 'regular' && paymentMethod === 'card' ? cardHolderPhone : undefined,
      paymentDay: donationType === 'regular' && paymentMethod === 'card' ? paymentDay : undefined
    };
    
    console.log('후원 신청:', formData);
    sendDonationEmail(formData);
    alert(`${donationType === 'regular' ? '정기' : '일시'} 후원 신청이 접수되었습니다. 이메일 클라이언트가 열립니다.`);
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
              className={`flex-1 font-semibold ${
                donationType === 'regular'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              정기후원
            </Button>
            <Button
              type="button"
              variant={donationType === 'one-time' ? 'default' : 'outline'}
              onClick={() => setDonationType('one-time')}
              className={`flex-1 font-semibold ${
                donationType === 'one-time'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              일시후원
            </Button>
          </div>

          <DonationAmountSelector
            amount={amount}
            customAmount={customAmount}
            onAmountSelect={handleAmountSelect}
            onCustomAmountChange={setCustomAmount}
          />

          {donationType === 'regular' && (
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              withdrawalDay={withdrawalDay}
              bankName={bankName}
              accountNumber={accountNumber}
              cardHolderName={cardHolderName}
              cardHolderPhone={cardHolderPhone}
              paymentDay={paymentDay}
              onPaymentMethodChange={setPaymentMethod}
              onWithdrawalDayChange={setWithdrawalDay}
              onBankNameChange={setBankName}
              onAccountNumberChange={setAccountNumber}
              onCardHolderNameChange={setCardHolderName}
              onCardHolderPhoneChange={setCardHolderPhone}
              onPaymentDayChange={setPaymentDay}
            />
          )}

          <DonorInfoForm
            name={name}
            email={email}
            phone={phone}
            isUnder14={isUnder14}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onUnder14Change={setIsUnder14}
          />

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

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
            후원 신청하기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
