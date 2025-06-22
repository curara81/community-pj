
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface DonorInfoFormProps {
  name: string;
  email: string;
  phone: string;
  isUnder14: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onUnder14Change: (value: boolean) => void;
}

const DonorInfoForm = ({
  name,
  email,
  phone,
  isUnder14,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onUnder14Change,
}: DonorInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-stone-800">후원자 정보</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">성함</label>
        <Input
          type="text"
          placeholder="성함을 입력해주세요"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-white border-stone-300 focus:border-stone-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">이메일</label>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="bg-white border-stone-300 focus:border-stone-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">연락처</label>
        <Input
          type="tel"
          placeholder="연락처를 입력해주세요"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="bg-white border-stone-300 focus:border-stone-500"
          required
        />
      </div>

      <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <Checkbox
          id="under14-donor"
          checked={isUnder14}
          onCheckedChange={(checked) => onUnder14Change(checked as boolean)}
          className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black w-5 h-5"
        />
        <label htmlFor="under14-donor" className="text-sm text-black font-bold">
          만 14세 미만입니다
        </label>
      </div>
    </div>
  );
};

export default DonorInfoForm;
