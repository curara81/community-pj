
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const fieldClass = "bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400";
  const labelClass = "block text-sm font-medium mb-2 text-stone-700";

  const fields = [
    {
      label: t("성함", "Name"),
      type: "text",
      placeholder: t("성함을 입력해주세요", "Enter your name"),
      value: name,
      onChange: onNameChange,
      maxLength: 50,
      required: true
    },
    {
      label: t("이메일", "Email"),
      type: "email",
      placeholder: t("이메일을 입력해주세요", "Enter your email"),
      value: email,
      onChange: onEmailChange,
      maxLength: 100,
      required: true
    },
    {
      label: t("연락처", "Phone"),
      type: "tel",
      placeholder: "010-1234-5678",
      value: phone,
      onChange: onPhoneChange,
      maxLength: 20,
      required: true
    }
  ];

  return (
    <>
      {fields.map((field) => (
        <div key={field.label}>
          <label className={labelClass}>
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className={fieldClass}
            maxLength={field.maxLength}
            required={field.required}
          />
        </div>
      ))}

      <div>
        <label className={labelClass}>{t("자기소개 및 참여 동기", "Self-introduction and motivation")}</label>
        <Textarea
          placeholder={t("예시: 안녕하세요. 저는 대학생입니다. 난민 분들과 취약계층을 도울 수 있는 봉사활동에 관심이 많아서 신청하게 되었습니다. 특히 한국어 교육이나 생활 정착 지원에 도움을 드리고 싶습니다.", "Example: Hello, I am a college student. I am very interested in volunteer work that can help refugees and vulnerable groups, so I applied. I would especially like to help with Korean language education and life settlement support.")}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className={fieldClass}
          maxLength={500}
          rows={4}
        />
      </div>
    </>
  );
};

export default VolunteerFormFields;
