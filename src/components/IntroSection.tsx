
import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import AboutModal from "./AboutModal";
import { useLanguage } from "@/contexts/LanguageContext";

const IntroSection = memo(() => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-8">
            {t('사단법인', 'Incorporated Foundation')} <span className="text-amber-700">{t('컴유니티', 'Comm.Unity')}</span>{t('는…', ' is...')}
          </h2>
          
          <div className="care-card rounded-2xl p-8 md:p-12 shadow-sm hover-lift">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
              {t('컴유니티(Comm.Unity)는', 'Comm.Unity is a')} <br className="block md:hidden" />
              <strong className="text-amber-700">{t('난민사역과 돌봄의 사각지대', 'refugee ministry and care blind spots')}</strong>{t('에 놓인', ' that are placed in')} <br className="block md:hidden" />
              {t('이웃들과 함께하기 위해 설립된', 'established to be with neighbors')} <br className="block md:hidden" />
              {t('비영리 사단법인입니다.', 'non-profit corporation.')}
              <br /><br />
              {t('2025년, 우리는', '2025, we are')} <strong className="text-blue-700">{t('"돌봄을 통해 사회를 하나로 연결하는 것"', '"connecting society as one through care"')}</strong>{t('을 사명으로 시작합니다.', ' as our mission.')} <br />
              {t('난민, 장애인, 노약자, 무주택 취약계층 등 우리 사회의 가장 연약한 이웃들에게', 'To the most vulnerable neighbors in our society, including refugees, people with disabilities, the elderly, and homeless vulnerable groups,')} <br />
              {t('따뜻한 손길과 실제적인 도움을 전하며, 다음 세대가 사랑과 배려, 나눔의 가치를', 'we deliver warm hands and practical help, and ensure that the next generation can naturally learn the values of love, care, and sharing')} <br />
              {t('자연스럽게 배울 수 있도록 다양한 프로그램을 준비하고 있습니다.', 'through various programs we are preparing.')}
              <br /><br />
              {t('컴유니티는 모든 이웃을 존중하고, 조건 없이 품으며, 서로의 아픔에 귀 기울이는 마음으로 사회의 통합을 추구합니다. 소외되고 힘든 이웃을 외면하지 않고, 누구에게나 한결같은 온정과 진심을 전하는 따뜻한 공동체를 지향합니다. 우리는 어느 한쪽만을 위한 돌봄이 아니라, 모두가 함께 어울려 살아가는 행복한 사회를 꿈꿉니다.', 'Comm.Unity pursues social integration with a heart that respects all neighbors, embraces them unconditionally, and listens to each other\'s pain. We strive for a warm community that does not turn away from marginalized and struggling neighbors, and delivers consistent warmth and sincerity to everyone. We dream of a happy society where everyone lives together in harmony, not care for just one side.')}
              <br /><br />
              {t('컴유니티가 바라보는 세상은, 누구도 홀로 남겨지지 않고, 누구도 외면당하지 않는 곳입니다.', 'The world that Comm.Unity envisions is a place where no one is left alone and no one is ignored.')}
              <br />
              {t('연약한 이웃에게 다가가 손을 내밀고, 함께 걸으며, 서로가 서로에게 위로와 희망이 되어주는 사회. 우리가 실천하는 작은 사랑과 나눔이 모여, 더 따뜻하고 아름다운 세상을 만들어가기를 소망합니다.', 'A society where we reach out to vulnerable neighbors, walk together, and become comfort and hope for each other. We hope that the small love and sharing we practice will come together to create a warmer and more beautiful world.')}
              <br /><br />
              <strong className="text-amber-700">{t('컴유니티는 사랑이 머무는 곳, 그리고 그 사랑이 세상을 변화시키는 힘이 된다고 믿습니다.', 'Comm.Unity believes that it is a place where love stays, and that love becomes the power to change the world.')}</strong>
            </p>
            
            <AboutModal>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                {t('더 알아보기', 'Learn More')}
              </Button>
            </AboutModal>
          </div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;
