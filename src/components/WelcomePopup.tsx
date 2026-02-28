import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

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
          <div className="space-y-5">
            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
              📢 기부금영수증 안내
            </h2>

            {/* Description */}
            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
              <p className="text-center">
                사단법인 컴유니티는<br />
                <strong>2025년도 기부금영수증 (연말정산용)</strong>을 국세청 연말정산 간소화 서비스를 통해 제공합니다.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p>✔ <strong>2026년 1월 15일</strong>부터 조회 가능합니다.</p>
                <p>✔ 국세청 홈택스 → 연말정산 간소화 서비스에서 확인하실 수 있습니다.</p>
                <p>✔ 자세한 이용 방법은 홈페이지 상단의 <strong>'국세청' 바로가기 버튼</strong>을 참고해 주세요.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-amber-800">
                  ⚠️ 기부금영수증 발급을 위해 사전에 안내드린 <strong>개인정보 등록(구글폼 제출)</strong>이 완료되어야 합니다.
                </p>
                <p className="text-amber-700 text-sm mt-2">
                  개인정보가 등록되지 않은 경우 기부금영수증 발급이 불가할 수 있습니다.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">📞 문의</p>
              <div className="space-y-1">
                <p><strong>홍지윤 간사</strong></p>
                <p>T. 010-9160-7544</p>
                <p>Email. comm@comm-unity.or.kr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Don't show today checkbox */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-between">
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
