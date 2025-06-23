
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface VolunteerFormFieldsProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onMessageChange: (value: string) => void;
}

const VolunteerFormFields = ({
  name,
  email,
  phone,
  message,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onMessageChange
}: VolunteerFormFieldsProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">
          성함 <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="성함을 입력해주세요"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
          maxLength={50}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">
          이메일 <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
          maxLength={100}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">
          연락처 <span className="text-red-500">*</span>
        </label>
        <Input
          type="tel"
          placeholder="010-1234-5678"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
          maxLength={20}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-stone-700">자기소개 및 참여 동기</label>
        <Textarea
          placeholder="간단한 자기소개와 참여하고 싶은 이유를 적어주세요"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
          maxLength={500}
          rows={4}
        />
      </div>
    </>
  );
};

export default VolunteerFormFields;
