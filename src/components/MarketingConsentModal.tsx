
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarketingConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MarketingConsentModal = ({ open, onOpenChange }: MarketingConsentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            마케팅 정보 수신 동의 안내
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-96 px-4">
          <div className="space-y-4 text-sm text-gray-700">
            <p>사단법인 컴유니티(이하 '컴유니티')는 개인정보 보호법 및 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에 따라, 마케팅 및 광고성 정보 전송을 위해 회원님의 사전 동의를 받고 있습니다.</p>

            <div>
              <h4 className="font-semibold mb-2">1. 수집 및 이용 목적</h4>
              <ul className="list-disc list-inside ml-4">
                <li>컴유니티가 제공하는 각종 혜택, 이벤트, 신상품 안내, 맞춤형 서비스, 할인 행사 등 마케팅 및 광고성 정보 제공</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. 수집 및 이용 항목</h4>
              <ul className="list-disc list-inside ml-4">
                <li>휴대전화번호, 이메일 주소 등</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. 전송 방법</h4>
              <ul className="list-disc list-inside ml-4">
                <li>문자메시지(SMS), 이메일, 앱 푸시 등 전자적 전송매체</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">4. 동의 거부 권리 및 불이익</h4>
              <ul className="list-disc list-inside ml-4">
                <li>마케팅 정보 수신에 동의하지 않아도 회원가입 및 기본 서비스 이용에 제한이 없습니다.</li>
                <li>단, 동의하지 않을 경우 각종 이벤트, 혜택, 신상품 안내 등 마케팅 정보를 제공받을 수 없습니다.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">5. 동의 철회 및 변경</h4>
              <ul className="list-disc list-inside ml-4">
                <li>회원님은 언제든지 마케팅 정보 수신 동의를 철회하거나 변경하실 수 있습니다.</li>
                <li>철회(변경) 방법: 마이페이지 &gt; 개인정보 관리 또는 고객센터 문의</li>
                <li>동의 철회 시, 즉시 마케팅 정보 전송이 중단됩니다.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">6. 보유 및 이용 기간</h4>
              <ul className="list-disc list-inside ml-4">
                <li>동의일로부터 회원 탈퇴 또는 마케팅 동의 철회 시까지 보유 및 이용합니다.</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-800 mb-1">
                ※ 광고성 정보 전송 시, 관련 법령에 따라 "(광고)" 문구를 포함하여 발송되며, 수신 거부 방법이 함께 안내됩니다.
              </p>
              <p className="text-xs text-gray-800">
                ※ 수신 동의 없는 상태에서 광고성 정보를 발송하는 것은 불법이며, 동의 이후에도 언제든지 수신 거부가 가능합니다.
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">마케팅 정보 수신 동의</h4>
              <p className="text-sm">
                ☐ (선택) 컴유니티가 제공하는 마케팅 및 광고성 정보 수신에 동의합니다.<br/>
                (동의하지 않으셔도 서비스 이용에 제한이 없습니다.)
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-stone-600 hover:bg-stone-700 text-white"
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketingConsentModal;
