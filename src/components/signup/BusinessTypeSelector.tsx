
import { Button } from "@/components/ui/button";

interface BusinessTypeSelectorProps {
  onSelectBusiness: () => void;
  onSelectNonBusiness: () => void;
  onBack: () => void;
  onNext: () => void;
}

const BusinessTypeSelector = ({ onSelectBusiness, onSelectNonBusiness, onBack, onNext }: BusinessTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div 
          onClick={onSelectBusiness}
          className="border-2 border-slate-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-y-2">
            <div className="w-6 h-6 text-slate-400 mr-3">
              📋
            </div>
            <div>
              <div className="font-medium text-gray-700">사업자 회원가입</div>
              <div className="text-sm text-gray-500">사업자등록번호가 있는 단체</div>
            </div>
          </div>
        </div>
        
        <div 
          onClick={onSelectNonBusiness}
          className="border-2 border-slate-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-y-2">
            <div className="w-6 h-6 text-slate-400 mr-3">
              🤝
            </div>
            <div>
              <div className="font-medium text-gray-700">비사업자 회원가입</div>
              <div className="text-sm text-gray-500">비영리단체, 동호회, 커뮤니티 등</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          이전
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-slate-600 hover:bg-slate-700 text-white"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default BusinessTypeSelector;
