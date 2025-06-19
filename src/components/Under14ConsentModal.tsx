
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from 'react';

interface Under14ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConsent: (consented: boolean) => void;
}

const Under14ConsentModal = ({ open, onOpenChange, onConsent }: Under14ConsentModalProps) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    onConsent(true);
    onOpenChange(false);
    setAgreed(false);
  };

  const handleDisagree = () => {
    onConsent(false);
    onOpenChange(false);
    setAgreed(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center text-gray-800">
            만 14세 미만 아동의 회원가입 및 개인정보 처리에 관한 안내
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            본 사이트는 「개인정보 보호법」에 따라 만 14세 미만 아동의 개인정보를 수집·이용하거나 회원가입을 진행할 경우, 
            반드시 보호자(법정대리인)의 동의가 필요합니다.
          </p>
          
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>
              만 14세 미만 아동이 회원가입을 원할 경우, 보호자(법정대리인)의 동의 절차를 반드시 거쳐야 하며, 
              동의가 확인되지 않을 경우 회원가입이 제한됩니다.
            </li>
            <li>
              보호자 동의는 휴대전화 본인인증, 서면 동의서 제출, 이메일 또는 전화 등 다양한 방법으로 진행될 수 있습니다.
            </li>
            <li>
              보호자 동의를 받기 위해 필요한 최소한의 정보(보호자의 성명, 연락처 등)는 아동으로부터 직접 수집할 수 있습니다. 
              동의가 완료되지 않을 경우 해당 정보는 즉시 파기됩니다.
            </li>
            <li>
              만 14세 미만 아동의 개인정보를 보호하기 위해 이해하기 쉬운 언어와 양식으로 개인정보 처리 목적, 
              수집 항목, 보유 기간, 동의 거부 시 불이익 등을 명확히 안내합니다.
            </li>
          </ul>
          
          <p className="font-medium text-red-600">
            법정대리인의 동의 없이 개인정보를 수집·이용할 경우, 관련 법령에 따라 5년 이하의 징역 또는 
            5천만 원 이하의 벌금 등 법적 제재를 받을 수 있습니다.
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-6">
          <Checkbox
            id="under14-consent"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
          />
          <label htmlFor="under14-consent" className="text-sm text-gray-700">
            위 내용을 확인하였으며, 보호자 동의 절차를 진행하는 것에 동의합니다.
          </label>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDisagree}
            className="flex-1"
          >
            동의하지 않음
          </Button>
          <Button
            type="button"
            onClick={handleAgree}
            disabled={!agreed}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            동의함
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Under14ConsentModal;
