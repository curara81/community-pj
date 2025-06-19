
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

interface PrivacyModalProps {
  children: React.ReactNode;
}

const PrivacyModal = ({ children }: PrivacyModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-black">
            <Shield className="text-blue-600" />
            개인정보처리방침
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 text-sm leading-relaxed text-black">
            <div>
              <p className="mb-4">
                사단법인 컴유니티(이하 "회사")는 「개인정보 보호법」 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">1. 개인정보의 처리 목적</h3>
              <p className="mb-2">
                회사는 다음의 목적을 위해 개인정보를 처리합니다. 처리한 개인정보는 아래 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경될 시에는 별도의 동의를 받는 등 필요한 조치를 이행합니다.
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>회원가입 및 본인확인, 서비스 제공 및 관리, 소셜 로그인(OAuth) 연동, 문의 및 민원처리, 고지사항 전달 등</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">2. 처리하는 개인정보 항목</h3>
              <p className="mb-2">회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>필수항목: 이메일 주소, 비밀번호, (소셜 로그인 시) 소셜 서비스 고유 식별자, 이름(해당 시)</li>
                <li>선택항목: 휴대폰 번호, 프로필 사진 등(해당 시)</li>
                <li>자동수집항목: 접속 IP, 쿠키, 서비스 이용 기록 등</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">3. 개인정보의 처리 및 보유 기간</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>회원 탈퇴 시 또는 동의 받은 보유 기간 경과 시 지체 없이 파기합니다.</li>
                <li>단, 관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안 별도 보관 후 파기합니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">4. 개인정보의 제3자 제공</h3>
              <p>
                회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
                다만, 이용자가 동의하거나 법령에 따라 필요한 경우에만 최소 범위 내에서 제공합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">5. 개인정보처리의 위탁</h3>
              <p>
                회사는 서비스 향상을 위해 개인정보 처리 업무를 외부에 위탁할 수 있습니다.
                이 경우 위탁받는 자, 위탁 업무 내용, 관리·감독 방안 등을 이용자에게 고지하고 동의를 받습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">6. 개인정보의 파기 절차 및 방법</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>파기 절차: 보유 기간 경과, 처리 목적 달성 등 파기사유 발생 시 개인정보를 선정하여 파기합니다.</li>
                <li>파기 방법: 전자적 파일은 복구 불가능한 방법으로, 종이 문서는 분쇄 또는 소각하여 파기합니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">7. 정보주체와 법정대리인의 권리·의무 및 행사방법</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>이용자(정보주체)는 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구를 할 수 있습니다.</li>
                <li>만 14세 미만 아동의 개인정보는 법정대리인의 동의가 필요하며, 권리행사는 법정대리인을 통해서도 가능합니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">8. 개인정보의 안전성 확보조치</h3>
              <p className="mb-2">회사는 개인정보가 분실, 도난, 유출, 위조, 변조, 훼손되지 않도록 다음과 같은 조치를 취합니다.</p>
              <ul className="list-disc list-inside ml-4">
                <li>접근권한 관리, 암호화 저장, 백신 소프트웨어 운영, 접속기록 보관, 물리적 접근통제 등</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">9. 개인정보 자동 수집 장치의 설치·운영 및 거부</h3>
              <ul className="list-disc list-inside ml-4">
                <li>서비스 이용 과정에서 쿠키 등 자동수집장치를 사용할 수 있으며, 이용자는 브라우저 설정을 통해 거부할 수 있습니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">10. 개인정보 보호책임자 및 고충처리 부서</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>개인정보 보호책임자: 이름/직위/연락처/이메일</li>
                <li>개인정보 관련 문의, 열람, 정정, 삭제, 처리정지 등은 위 연락처로 요청하실 수 있습니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">11. 권익침해 구제방법</h3>
              <p className="mb-2">개인정보침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다.</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
                <li>대검찰청 사이버수사과 (www.spo.go.kr / 02-3480-3573)</li>
                <li>경찰청 사이버수사국 (cyberbureau.police.go.kr / 국번없이 182)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">12. 개인정보처리방침의 변경</h3>
              <ul className="list-disc list-inside ml-4">
                <li>본 방침은 시행일로부터 적용되며, 법령·정책 또는 회사 내부 방침에 따라 변경될 수 있습니다. 변경 시 홈페이지 공지사항을 통해 안내합니다.</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyModal;
