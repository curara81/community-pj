
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethodSelectorProps {
  paymentMethod: 'cms' | 'card';
  withdrawalDay: string;
  bankName: string;
  accountNumber: string;
  cardHolderName: string;
  cardHolderPhone: string;
  paymentDay: string;
  onPaymentMethodChange: (method: 'cms' | 'card') => void;
  onWithdrawalDayChange: (day: string) => void;
  onBankNameChange: (name: string) => void;
  onAccountNumberChange: (number: string) => void;
  onCardHolderNameChange: (name: string) => void;
  onCardHolderPhoneChange: (phone: string) => void;
  onPaymentDayChange: (day: string) => void;
}

const PaymentMethodSelector = ({
  paymentMethod,
  withdrawalDay,
  bankName,
  accountNumber,
  cardHolderName,
  cardHolderPhone,
  paymentDay,
  onPaymentMethodChange,
  onWithdrawalDayChange,
  onBankNameChange,
  onAccountNumberChange,
  onCardHolderNameChange,
  onCardHolderPhoneChange,
  onPaymentDayChange
}: PaymentMethodSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-stone-700">결제수단</label>
      <div className="flex gap-2 mb-3">
        <Button
          type="button"
          variant={paymentMethod === 'cms' ? 'default' : 'outline'}
          onClick={() => onPaymentMethodChange('cms')}
          className={`flex-1 ${
            paymentMethod === 'cms'
              ? 'bg-slate-600 hover:bg-slate-700 text-white'
              : 'border-stone-300 text-stone-700 hover:bg-stone-100'
          }`}
        >
          CMS자동이체
        </Button>
        <Button
          type="button"
          variant={paymentMethod === 'card' ? 'default' : 'outline'}
          onClick={() => onPaymentMethodChange('card')}
          className={`flex-1 ${
            paymentMethod === 'card'
              ? 'bg-slate-600 hover:bg-slate-700 text-white'
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
            <Select value={withdrawalDay} onValueChange={onWithdrawalDayChange}>
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
              onChange={(e) => onBankNameChange(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500 placeholder:text-stone-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">계좌번호</label>
            <Input
              type="text"
              placeholder="휴대폰번호 형식의 계좌번호 사용불가"
              value={accountNumber}
              onChange={(e) => onAccountNumberChange(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500 placeholder:text-stone-500"
              required
            />
          </div>
          
          <div className="bg-stone-100 p-3 rounded-lg border border-stone-200">
            <p className="text-xs text-stone-800 mb-1">
              ※ 휴대전화번호 형식의 평생계좌는 CMS자동이체신청이 불가합니다.
            </p>
            <p className="text-xs text-stone-800">
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
              onChange={(e) => onCardHolderNameChange(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500 placeholder:text-stone-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">카드주 휴대폰</label>
            <Input
              type="tel"
              placeholder="카드 소유자 휴대폰번호를 입력해주세요"
              value={cardHolderPhone}
              onChange={(e) => onCardHolderPhoneChange(e.target.value)}
              className="bg-white border-stone-300 focus:border-stone-500 placeholder:text-stone-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">결제일</label>
            <Select value={paymentDay} onValueChange={onPaymentDayChange}>
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
          
          <div className="bg-stone-100 p-3 rounded-lg border border-stone-200">
            <p className="text-xs text-stone-800">
              ※ 신용카드 후원 시 나이스빌링, 나이스_정기과금, 후원금_나이스 또는 Nice로 표시되어 청구됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
