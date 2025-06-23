
import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import AboutModal from "./AboutModal";

const IntroSection = memo(() => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            사단법인 <span className="text-amber-700">컴유니티</span>는…
          </h2>
          
          <div className="care-card rounded-2xl p-8 md:p-12 shadow-sm hover-lift">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
              컴유니티(Comm.Unity)는 <strong className="text-amber-700">난민사역과 돌봄의 사각지대</strong>에 놓인 이웃들과 함께하기 위해 설립된 비영리 사단법인입니다.
              <br /><br />
              2025년, 우리는 <strong className="text-blue-700">'돌봄을 통해 사회를 하나로 연결하는 것'</strong>을 사명으로 시작합니다. 난민, 장애인, 노약자, 무주택 취약계층 등 우리 사회의 가장 연약한 이웃들에게 따뜻한 손길과 실제적인 도움을 전하며, 다음 세대가 사랑과 배려, 나눔의 가치를 자연스럽게 배울 수 있도록 다양한 프로그램을 준비하고 있습니다.
              <br /><br />
              컴유니티는 모든 이웃을 존중하고, 조건 없이 품으며, 서로의 아픔에 귀 기울이는 마음으로 사회의 통합을 추구합니다. 소외되고 힘든 이웃을 외면하지 않고, 누구에게나 한결같은 온정과 진심을 전하는 따뜻한 공동체를 지향합니다. 우리는 어느 한쪽만을 위한 돌봄이 아니라, 모두가 함께 어울려 살아가는 행복한 사회를 꿈꿉니다.
              <br /><br />
              컴유니티가 바라보는 세상은, 누구도 홀로 남겨지지 않고, 누구도 외면당하지 않는 곳입니다. 연약한 이웃에게 다가가 손을 내밀고, 함께 걸으며, 서로가 서로에게 위로와 희망이 되어주는 사회. 우리가 실천하는 작은 사랑과 나눔이 모여, 더 따뜻하고 아름다운 세상을 만들어가기를 소망합니다.
              <br /><br />
              <strong className="text-amber-700">컴유니티는 사랑이 머무는 곳, 그리고 그 사랑이 세상을 변화시키는 힘이 된다고 믿습니다.</strong>
            </p>
            
            <AboutModal>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                더 알아보기
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
