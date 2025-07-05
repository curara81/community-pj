
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VolunteerModal from "./VolunteerModal";
import { useLanguage } from "@/contexts/LanguageContext";

const VolunteerSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            🙋‍♀️ <span className="hidden md:inline">{t('함께할 동역자를 찾습니다', 'We are looking for partners to join us')}</span>
            <span className="md:hidden">{t('함께할 동역자를', 'Partners to join us')}<br />{t('찾습니다', 'We are looking for')}</span>
          </h2>
          
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 hover-lift mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  <span className="hidden md:block">{t('컴유니티의 활동은 지금 막 시작되려 합니다.', "Comm.Unity's activities are just about to begin.")}</span>
                  <span className="md:hidden">{t('컴유니티의 활동은', "Comm.Unity's activities")}<br />{t('지금 막 시작되려 합니다.', 'are just about to begin.')}</span>
                </p>
                
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    🤝 {t('당신의 마음과 시간이 필요합니다', 'We need your heart and time')}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 mb-4">
                    <span className="hidden md:block">{t('난민, 취약계층과 함께하는 활동에 여러분의 동참이 필요합니다.', 'We need your participation in activities with refugees and vulnerable groups.')}</span>
                    <span className="md:hidden">{t('난민, 취약계층과 함께하는', 'Activities with refugees')}<br />{t('활동에 여러분의 동참이', 'and vulnerable groups')}<br />{t('필요합니다.', 'need your participation.')}</span>
                  </p>
                  <ul className="text-left text-gray-600 space-y-2 max-w-2xl mx-auto">
                    <li>✨ {t('번역 및 통역 지원', 'Translation and interpretation support')}</li>
                    <li>✨ {t('생활 상담 및 멘토링', 'Life counseling and mentoring')}</li>
                    <li>✨ {t('교육 프로그램 운영', 'Educational program operation')}</li>
                    <li>✨ {t('행정 업무 지원', 'Administrative support')}</li>
                    <li>✨ {t('기타 자원봉사 활동', 'Other volunteer activities')}</li>
                  </ul>
                </div>
                
                <VolunteerModal>
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow"
                  >
                    🙋‍♀️ {t('자원봉사 신청하기', 'Apply for Volunteering')}
                  </Button>
                </VolunteerModal>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
