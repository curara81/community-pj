
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConsent: (consented: boolean) => void;
}

const PrivacyConsentModal = ({ open, onOpenChange, onConsent }: PrivacyConsentModalProps) => {
  const handleConsent = (agree: boolean) => {
    onConsent(agree);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            개인정보 수집 및 이용 동의
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded border p-4">
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">1. 개인정보의 수집 및 이용 목적</h3>
              <p>- 회원가입 및 회원관리</p>
              <p>- 후원 서비스 제공</p>
              <p>- 공지사항 전달</p>
              <p>- 민원 처리</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. 수집하는 개인정보의 항목</h3>
              <p>- 필수항목: 이름, 이메일, 휴대폰번호</p>
              <p>- 선택항목: 생년월일</p>
              <p>- 단체회원: 단체명, 담당자명, 사업자등록번호(해당시)</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. 개인정보의 보유 및 이용기간</h3>
              <p>- 회원탈퇴 시까지</p>
              <p>- 관계법령에 따른 보존의무가 있는 경우 해당 기간까지</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. 개인정보 제공 거부권</h3>
              <p>귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.</p>
              <p>다만, 필수항목에 대한 동의를 거부할 경우 서비스 이용이 제한될 수 있습니다.</p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => handleConsent(false)}
            className="flex-1"
          >
            동의하지 않음
          </Button>
          <Button
            onClick={() => handleConsent(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            동의합니다
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyConsentModal;
