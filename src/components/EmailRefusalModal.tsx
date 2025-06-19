
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MailX } from "lucide-react";

interface EmailRefusalModalProps {
  children: React.ReactNode;
}

const EmailRefusalModal = ({ children }: EmailRefusalModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-black">
            <MailX className="text-red-600" />
            이메일무단수신거부
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 text-sm leading-relaxed text-black">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="font-semibold text-red-800 mb-2">무단 이메일 수집 금지</p>
              <p>
                본 사단법인 컴유니티 홈페이지에 게시된 이메일주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 개인정보보호법에 의해 형사처벌됨을 유념하시기 바랍니다.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="font-semibold text-yellow-800 mb-2">처벌 규정</p>
              <p>
                이메일을 기술적 장치를 사용하여 무단으로 수집, 판매, 유통하거나 이를 이용한 자는 개인정보보호법 제75조에 의하여 5천만원 이하의 벌금형에 처해집니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-3">개인정보보호법 제22조(개인정보의 수집ㆍ이용 동의 등)</h3>
              
              <div className="space-y-4">
                <p>
                  개인정보처리자는 이 법에 따른 개인정보의 처리에 대하여 정보주체(제5항에 따른 법정대리인을 포함한다. 이하 이 조에서 같다)의 동의를 받을 때에는 각각의 동의 사항을 구분하여 정보주체가 이를 명확하게 인지할 수 있도록 알리고 각각 동의를 받아야 한다.
                </p>
                
                <p>
                  개인정보처리자는 제15조제1항제1호, 제17조제1항제1호, 제23조제1호 및 제24조제1항제1호에 따라 개인정보의 처리에 대하여 정보주체의 동의를 받을 때에는 정보주체와의 계약 체결 등을 위하여 정보주체의 동의 없이 처리할 수 있는 개인정보와 정보주체의 동의가 필요한 개인정보를 구분하여야 한다. 이 경우 동의 없이 처리할 수 있는 개인정보라는 입증책임은 개인정보처리자가 부담한다.
                </p>
                
                <p>
                  개인정보처리자는 정보주체에게 재화나 서비스를 홍보하거나 판매를 권유하기 위하여 개인정보의 처리에 대한 동의를 받으려는 때에는 정보주체가 이를 명확하게 인지할 수 있도록 알리고 동의를 받아야 한다.
                </p>
                
                <p>
                  개인정보처리자는 정보주체가 제2항에 따라 선택적으로 동의할 수 있는 사항을 동의하지 아니하거나 제3항 및 제18조제2항제1호에 따른 동의를 하지 아니한다는 이유로 정보주체에게 재화 또는 서비스의 제공을 거부하여서는 아니 된다.
                </p>
                
                <p>
                  개인정보처리자는 만 14세 미만 아동의 개인정보를 처리하기 위하여 이 법에 따른 동의를 받아야 할 때에는 그 법정대리인의 동의를 받아야 한다. 이 경우 법정대리인의 동의를 받기 위하여 필요한 최소한의 정보는 법정대리인의 동의 없이 해당 아동으로부터 직접 수집할 수 있다.
                </p>
                
                <p>
                  제1항부터 제5항까지에서 규정한 사항 외에 정보주체의 동의를 받는 세부적인 방법 및 제5항에 따른 최소한의 정보의 내용에 관하여 필요한 사항은 개인정보의 수집매체 등을 고려하여 대통령령으로 정한다.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EmailRefusalModal;
