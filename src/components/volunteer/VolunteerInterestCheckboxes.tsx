
import { Checkbox } from "@/components/ui/checkbox";
import { VOLUNTEER_AREAS } from "@/constants/volunteerAreas";
import { useLanguage } from "@/contexts/LanguageContext";

interface VolunteerInterestCheckboxesProps {
  interests: string[];
  onInterestChange: (area: string, checked: boolean) => void;
}

const VolunteerInterestCheckboxes = ({ interests, onInterestChange }: VolunteerInterestCheckboxesProps) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-stone-700">
        {t("관심 있는 활동 영역", "Areas of Interest")} <span className="text-red-500">*</span>
        <span className="text-xs text-gray-500 ml-1">{t("(복수선택 가능)", "(Multiple selections allowed)")}</span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {VOLUNTEER_AREAS.map((area) => (
          <div key={area.ko} className="flex items-center space-x-2">
            <Checkbox
              id={area.ko}
              checked={interests.includes(area.ko)}
              onCheckedChange={(checked) => onInterestChange(area.ko, checked as boolean)}
              className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black w-5 h-5"
            />
            <label htmlFor={area.ko} className="text-sm text-black font-bold">{t(area.ko, area.en)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerInterestCheckboxes;
