
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DonationAmountSelectorProps {
  amount: string;
  customAmount: string;
  onAmountSelect: (amount: string) => void;
  onCustomAmountChange: (amount: string) => void;
}

const donationAmounts = ['20,000원', '30,000원', '50,000원', '80,000원', '100,000원', '직접입력'];

const DonationAmountSelector = memo(({ 
  amount, 
  customAmount, 
  onAmountSelect, 
  onCustomAmountChange 
}: DonationAmountSelectorProps) => {
  const handleCustomAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomAmountChange(e.target.value);
  }, [onCustomAmountChange]);

  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-stone-700">후원금액</label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {donationAmounts.map((amountOption) => (
          <Button
            key={amountOption}
            type="button"
            variant={amount === amountOption ? 'default' : 'outline'}
            onClick={() => onAmountSelect(amountOption)}
            className={`h-12 text-sm font-semibold ${
              amount === amountOption 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'border-stone-300 text-stone-700 hover:bg-blue-50 hover:border-blue-300'
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
          onChange={handleCustomAmountChange}
          className="bg-white border-stone-300 focus:border-blue-500 placeholder:text-stone-500"
          required
        />
      )}
    </div>
  );
});

DonationAmountSelector.displayName = 'DonationAmountSelector';

export default DonationAmountSelector;
