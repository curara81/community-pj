import { Button } from "@/components/ui/button";
import VolunteerModal from "./VolunteerModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2 } from "lucide-react";

const VolunteerSection = () => {
  const { t } = useLanguage();

  const items = [
    t('번역 및 통역 지원', 'Translation and interpretation support'),
    t('생활 상담 및 멘토링', 'Life counseling and mentoring'),
    t('교육 프로그램 운영', 'Educational program operation'),
    t('행정 업무 지원', 'Administrative support'),
    t('기타 자원봉사 활동', 'Other volunteer activities'),
  ];
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
            🙋 {t('함께할 동역자를 찾습니다', 'We are looking for partners to join us')}
          </h2>
          <div className="h-6 md:h-8" />
          
          <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: '#e8f6f5' }}>
            <h3 className="text-lg font-bold text-foreground mb-2">
              🤝 {t('당신의 마음과 시간이 필요합니다', 'We need your heart and time')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 font-light">
              {t('다문화 가정, 취약계층과 함께하는 활동에 여러분의 동참이 필요합니다.', 'We need your participation in activities with multicultural families and vulnerable groups.')}
            </p>
            
            <ul className="space-y-3 mb-8">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#83c5be' }} />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
            
            <VolunteerModal>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 text-sm font-semibold rounded-lg"
              >
                🙋 {t('자원봉사 신청하기', 'Apply for Volunteering')}
              </Button>
            </VolunteerModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
