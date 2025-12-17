import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ExternalLink } from "lucide-react";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    const lastDismissed = localStorage.getItem("welcomePopupDismissed");
    const dismissedTime = lastDismissed ? parseInt(lastDismissed, 10) : 0;
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (now - dismissedTime > twentyFourHours) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (dontShowToday) {
      localStorage.setItem("welcomePopupDismissed", Date.now().toString());
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-white border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          <div className="space-y-4">
            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center">
              📢 2025년 기부금영수증 발급 안내
            </h2>

            {/* Description */}
            <div className="text-gray-700 text-sm leading-relaxed space-y-3">
              <p>
                저희 (사)컴유니티에서는 <strong>2025년도 기부금영수증 발급</strong>을 위하여 아래와 같이 후원자님의 개인정보를 구글폼에 입력해 주시면 국세청 연말정산 간소화 서비스 이용 및 전자기부금 영수증 조회가 가능합니다.
              </p>
              <p>
                부부인 경우는 대표자 1인으로 등록해주세요. <span className="text-red-600 font-medium">개인정보가 등록되지 않을 경우에는 2025년 기부금영수증 발급이 불가함을 안내드립니다.</span>
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <p className="font-medium">📋 방법은 아래와 같습니다:</p>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
                  <li>컴유니티가 문자로 보내드리는 개인 정보 제공을 위한 구글폼 작성 및 제출</li>
                  <li className="text-gray-500">(소득세법 제 160조의 3에 의거한 기부금영수증 발급을 위한 절차)</li>
                </ul>
              </div>

              <p className="text-center font-medium text-primary">
                📅 구글폼 작성 및 제출기한: <span className="underline">12/23(화)까지</span>
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => window.open("https://forms.gle/h3fY4v9FhXSrT6h46", "_blank")}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 text-base"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              구글폼 작성하기
            </Button>

            {/* Additional Info */}
            <div className="text-xs text-gray-500 space-y-1 bg-blue-50 p-3 rounded-lg">
              <p>✅ 2026년 1월 15일 이후 국세청 홈택스 사이트에서 연말정산 간소화 서비스로 기부금 영수증을 조회할 수 있습니다.</p>
            </div>

            {/* Contact Info */}
            <div className="text-xs text-gray-600 text-center border-t pt-3">
              <p>※ 궁금하신 점은 아래 연락처로 문의 바랍니다.</p>
              <p className="font-medium mt-1">홍지윤 간사 T. 010-9160-7544</p>
              <p>Email. comm@comm-unity.or.kr</p>
            </div>
          </div>
        </div>

        {/* Footer - Don't show today checkbox */}
        <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dontShowToday"
              checked={dontShowToday}
              onCheckedChange={(checked) => setDontShowToday(checked === true)}
            />
            <label
              htmlFor="dontShowToday"
              className="text-sm text-gray-600 cursor-pointer"
            >
              오늘 하루 열지 않기
            </label>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
          >
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
