import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if popup was dismissed today
    const lastDismissed = localStorage.getItem("welcomePopupDismissed");
    const today = new Date().toDateString();
    
    if (lastDismissed !== today) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDontShowToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem("welcomePopupDismissed", today);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white border-0 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          <div className="text-center space-y-4">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/64193635-1583-49bf-b99d-0f5aafcfcea9.png" 
                alt="Comm.Unity" 
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800">
              컴유니티에 오신 것을<br />환영합니다!
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              돌봄으로 하나 되는 사회,<br />
              난민과 취약계층에게 희망과 돌봄을 전합니다.
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleClose}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
            >
              둘러보기
            </Button>
          </div>
        </div>

        {/* Footer - Don't show today */}
        <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
          <button
            onClick={handleDontShowToday}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
