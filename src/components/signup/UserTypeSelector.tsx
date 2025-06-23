
import { Button } from "@/components/ui/button";

interface UserTypeSelectorProps {
  onSelectIndividual: () => void;
  onSelectBusiness: () => void;
  onBack: () => void;
  onNext: () => void;
}

const UserTypeSelector = ({ onSelectIndividual, onSelectBusiness, onBack, onNext }: UserTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={onSelectIndividual}
          className="border-2 border-slate-400 rounded-lg p-6 cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            </div>
            <span className="font-medium text-gray-700">개인 회원가입</span>
          </div>
        </div>
        
        <div 
          onClick={onSelectBusiness}
          className="border-2 border-slate-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 text-slate-400">
              🏢
            </div>
            <span className="font-medium text-gray-700">단체 회원가입</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          취소
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

export default UserTypeSelector;
