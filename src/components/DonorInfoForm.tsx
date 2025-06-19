
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface DonorInfoFormProps {
  name: string;
  email: string;
  phone: string;
  isUnder14: boolean;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onUnder14Change: (isUnder14: boolean) => void;
}

const DonorInfoForm = ({
  name,
  email,
  phone,
  isUnder14,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onUnder14Change
}: DonorInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-stone-800">기본정보</h4>
      
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-sm font-medium text-stone-700">성함 *</label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="under14"
              checked={isUnder14}
              onCheckedChange={(checked) => onUnder14Change(checked as boolean)}
            />
            <label htmlFor="under14" className="text-xs text-stone-600">
              만 14세 미만
            </label>
          </div>
        </div>
        <Input
          type="text"
          placeholder="성함을 입력해주세요"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-white border-stone-300 focus:border-blue-500 placeholder:text-stone-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">휴대폰번호 *</label>
        <Input
          type="tel"
          placeholder="휴대폰번호를 입력해주세요"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="bg-white border-stone-300 focus:border-blue-500 placeholder:text-stone-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">이메일 *</label>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="bg-white border-stone-300 focus:border-blue-500 placeholder:text-stone-500"
          required
        />
      </div>

      {isUnder14 && (
        <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            ※ 만 14세 미만 어린이는 법정보호자의 동의 절차가 필요합니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorInfoForm;
