
import { Button } from "@/components/ui/button";
import VolunteerModal from "./VolunteerModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";

const VolunteerSection = () => {
  const { t } = useLanguage();
  
  const activities = [
    t('번역 및 통역 지원', 'Translation and interpretation support'),
    t('생활 상담 및 멘토링', 'Life counseling and mentoring'),
    t('교육 프로그램 운영', 'Educational program operation'),
    t('행정 업무 지원', 'Administrative support'),
    t('기타 자원봉사 활동', 'Other volunteer activities'),
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-8">
            🙋 {t('함께할 동역자를 찾습니다', 'We are looking for partners to join us')}
          </h2>
          
          <div className="bg-success-lighter/60 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-2">
              🤝 {t('당신의 마음과 시간이 필요합니다', 'We need your heart and time')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('다문화 가정, 취약계층과 함께하는 활동에 여러분의 동참이 필요합니다.', 'We need your participation in activities with multicultural families and vulnerable groups.')}
            </p>
            
            <ul className="text-left max-w-sm mx-auto space-y-3">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
          
          <VolunteerModal>
            <Button 
              variant="outline"
              size="lg"
              className="px-6 py-3 text-base font-semibold rounded-full hover-lift border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              🙋 {t('자원봉사 신청하기', 'Apply for Volunteering')}
            </Button>
          </VolunteerModal>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
