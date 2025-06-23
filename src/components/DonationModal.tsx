
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DonationAmountSelector from './DonationAmountSelector';
import PaymentMethodSelector from './PaymentMethodSelector';
import DonorInfoForm from './DonorInfoForm';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, validateKoreanPhone, validateDonationAmount, sanitizeInput } from '@/utils/validation';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const handleAmountSelect = (selectedAmount: string) => {
    if (selectedAmount === '직접입력') {
      setAmount('직접입력');
    } else {
      setAmount(selectedAmount);
      setCustomAmount('');
    }
  };

  const validateForm = (): boolean => {
    const finalAmount = amount === '직접입력' ? customAmount : amount;
    
    if (!name.trim()) {
      toast({
        title: "입력 오류",
        description: "성함을 입력해주세요.",
        variant: "destructive",
      });
      return false;
    }

    if (!validateEmail(email)) {
      toast({
        title: "입력 오류",
        description: "올바른 이메일 주소를 입력해주세요.",
        variant: "destructive",
      });
      return false;
    }

    if (!validateKoreanPhone(phone)) {
      toast({
        title: "입력 오류",
        description: "올바른 연락처를 입력해주세요. (예: 010-1234-5678)",
        variant: "destructive",
      });
      return false;
    }

    if (!validateDonationAmount(finalAmount)) {
      toast({
        title: "입력 오류",
        description: "후원금액은 1,000원 이상 10,000,000원 이하로 입력해주세요.",
        variant: "destructive",
      });
      return false;
    }

    // Validate payment method specific fields for regular donations
    if (donationType === 'regular') {
      if (paymentMethod === 'cms') {
        if (!bankName.trim() || !accountNumber.trim()) {
          toast({
            title: "입력 오류",
            description: "은행명과 계좌번호를 입력해주세요.",
            variant: "destructive",
          });
          return false;
        }
      } else if (paymentMethod === 'card') {
        if (!cardHolderName.trim() || !validateKoreanPhone(cardHolderPhone)) {
          toast({
            title: "입력 오류",
            description: "카드 소유자 정보를 올바르게 입력해주세요.",
            variant: "destructive",
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if user is authenticated for database storage
    if (!user) {
      toast({
        title: "로그인 필요",
        description: "후원 신청을 위해 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalAmount = amount === '직접입력' ? customAmount : amount;
      const amountValue = parseInt(finalAmount.replace(/[^\d]/g, ''));

      // Sanitize all inputs
      const donationData = {
        user_id: user.id,
        amount: amountValue,
        donation_type: donationType,
        payment_method: donationType === 'regular' ? paymentMethod : 'one-time',
        status: 'pending'
      };

      const { error } = await supabase
        .from('donations')
        .insert([donationData]);

      if (error) {
        console.error('Donation submission error:', error);
        toast({
          title: "후원 신청 실패",
          description: "후원 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "후원 신청 완료",
          description: `${donationType === 'regular' ? '정기' : '일시'} 후원 신청이 성공적으로 접수되었습니다.`,
        });
        
        // Reset form
        setAmount('');
        setCustomAmount('');
        setName('');
        setEmail('');
        setPhone('');
        setIsUnder14(false);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "후원 신청 실패",
        description: "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  ? 'bg-stone-600 hover:bg-stone-700 text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400'
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
                  ? 'bg-stone-600 hover:bg-stone-700 text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400'
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

          <Card className="bg-stone-100 border-stone-200">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-stone-800">💳 계좌 안내</h4>
              <p className="text-sm text-stone-800">하나은행 218-910044-94704</p>
              <p className="text-sm text-stone-700 mb-3">(예금주: 사단법인 컴유니티)</p>
              <p className="text-xs text-stone-700 leading-relaxed">
                ※ 컴유니티는 별도의 운영후원금으로 운영되고 있어, 여러분들의 소중한 후원금은 100% 현장사업에 사용됩니다.
              </p>
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-stone-600 hover:bg-stone-700 text-white font-semibold disabled:opacity-50"
          >
            {isSubmitting ? '신청 중...' : '후원 신청하기'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
