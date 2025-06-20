
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsModal = ({ open, onOpenChange }: TermsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            이용약관
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-96 px-4">
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-bold text-base mb-2">제1장 총칙</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">제1조 (목적)</h4>
                <p>이 약관은 사단법인 컴유니티(이하 "법인"이라 합니다)가 운영하는 홈페이지(이하 "사이트")에서 제공하는 모든 서비스(이하 "서비스")의 이용 조건 및 절차, 이용자와 법인의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-1">제2조 (약관의 효력과 변경)</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>이 약관은 사이트에 게시하거나 기타의 방법으로 공지함으로써 효력을 발생합니다.</li>
                  <li>법인은 필요하다고 인정되는 경우 이 약관을 개정할 수 있으며, 변경된 약관은 사이트 내에 공지함으로써 효력을 발생합니다.</li>
                  <li>회원이 변경된 약관에 동의하지 아니하는 경우, 회원은 회원탈퇴를 요청할 수 있으며, 변경 공지 후에도 계속 서비스를 이용할 경우 약관 변경에 동의한 것으로 간주합니다.</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">제2장 이용계약 및 회원관리</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">제3조 (회원의 정의 및 가입)</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>"회원"이라 함은 사이트에 개인정보를 제공하여 회원등록을 한 자로서, 지속적으로 법인의 정보를 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                  <li>회원가입은 본 약관에 동의하고, 법인이 요구하는 정보를 정확히 기입하여 신청함으로써 완료됩니다.</li>
                </ol>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-1">제4조 (회원자격의 제한 및 상실)</h4>
                <p className="mb-2">다음 각 호에 해당하는 경우, 법인은 회원자격을 제한하거나 상실시킬 수 있습니다.</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>타인의 명의를 도용하여 신청한 경우</li>
                  <li>허위 정보를 기재하거나 법인이 요구하는 정보를 누락한 경우</li>
                  <li>사회의 안녕질서 또는 미풍양속을 저해하는 목적으로 신청한 경우</li>
                  <li>기타 법인이 정한 이용신청 기준에 부합하지 않는 경우</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">제3장 서비스 이용</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">제5조 (서비스의 제공 및 이용)</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>법인은 회원에게 사이트를 통한 다양한 서비스를 제공합니다.</li>
                  <li>회원은 서비스 이용 시 관계법령, 본 약관 및 법인의 안내를 준수해야 합니다.</li>
                </ol>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-1">제6조 (서비스의 변경 및 중단)</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>법인은 운영상, 기술상의 필요에 따라 제공하는 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.</li>
                  <li>서비스 중단 시 법인은 사전에 공지하며, 불가피하게 사전 공지가 어려운 경우 사후에 공지할 수 있습니다.</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">제4장 의무 및 책임</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">제7조 (회원의 의무)</h4>
                <p className="mb-2">회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다.</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>타인의 명예를 훼손하거나 모욕하는 행위</li>
                  <li>저작권 등 타인의 권리를 침해하는 행위</li>
                  <li>불법적인 정보를 게시하거나 유포하는 행위</li>
                  <li>서비스 운영을 방해하는 행위</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-1">제8조 (법인의 면책)</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>천재지변 또는 이에 준하는 불가항력으로 인해 서비스를 제공할 수 없는 경우, 법인은 책임을 지지 않습니다.</li>
                  <li>회원의 귀책사유로 인한 서비스 이용의 장애에 대해서도 법인은 책임을 지지 않습니다.</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">제5장 기타</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">제9조 (분쟁의 해결)</h4>
                <p>서비스 이용과 관련하여 법인과 회원 사이에 분쟁이 발생한 경우, 쌍방은 원만한 해결을 위해 성실히 협의해야 하며, 협의가 이루어지지 않을 경우 관할법원에 소를 제기할 수 있습니다.</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-1">제10조 (관련법령의 준용)</h4>
                <p>이 약관에 명시되지 않은 사항은 관련 법령 및 법인의 정책에 따릅니다.</p>
              </div>
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

export default TermsModal;
