
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copyright } from "lucide-react";

interface CopyrightModalProps {
  children: React.ReactNode;
}

const CopyrightModal = ({ children }: CopyrightModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-black">
            <Copyright className="text-amber-600" />
            저작권정책
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 text-sm leading-relaxed text-black">
            <p>
              사단법인 컴유니티(이하 컴유니티) 웹사이트에서 제공하는 모든 콘텐츠, 즉 웹문서, 첨부파일, DB정보 등은 저작권법에 의하여 보호받는 저작물로써, 별도의 저작권 표시 또는 다른 출처를 명시한 경우를 제외하고는 원칙적으로 컴유니티에 저작권이 있습니다.
            </p>
            
            <p>
              따라서 웹사이트에서 제공하는 콘텐츠를 무단 복제, 배포하는 경우에는 「저작권법」 제136조에 의한 저작재산권 침해죄에 해당함을 유념하시기 바랍니다.
            </p>
            
            <p>
              웹사이트에서 제공하는 콘텐츠로 수익을 얻거나 이에 상응하는 혜택을 누리고자 하는 경우에는 컴유니티와 사전에 별도의 협의를 하거나 허락을 득하여야 하며, 협의 또는 허락을 얻어 자료의 내용을 게재하는 경우에도 출처가 컴유니티임을 반드시 명시하여야 합니다.
            </p>
            
            <p>
              컴유니티의 콘텐츠를 적법한 절차에 따라 다른 인터넷 사이트에 게재하는 경우에도 단순한 오류 정정 이외에 내용의 무단변경을 금지하며, 이를 위반할 때에는 형사 처분을 받을 수 있습니다.
            </p>
            
            <p>
              다른 인터넷 사이트에서 컴유니티 홈페이지로 링크하는 경우에도 링크 사실을 컴유니티에 통지하여야 합니다.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CopyrightModal;
