
import { Checkbox } from "@/components/ui/checkbox";
import { VOLUNTEER_AREAS } from "@/constants/volunteerAreas";

interface VolunteerInterestCheckboxesProps {
  interests: string[];
  onInterestChange: (area: string, checked: boolean) => void;
}

const VolunteerInterestCheckboxes = ({ interests, onInterestChange }: VolunteerInterestCheckboxesProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-stone-700">
        관심 있는 활동 영역 <span className="text-red-500">*</span>
        <span className="text-xs text-gray-500 ml-1">(복수선택 가능)</span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {VOLUNTEER_AREAS.map((area) => (
          <div key={area} className="flex items-center space-x-2">
            <Checkbox
              id={area}
              checked={interests.includes(area)}
              onCheckedChange={(checked) => onInterestChange(area, checked as boolean)}
              className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black w-5 h-5"
            />
            <label htmlFor={area} className="text-sm text-black font-bold">{area}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerInterestCheckboxes;
