
import { Button } from "@/components/ui/button";

const IntroSection = () => {
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
              2025년, 우리는 <strong className="text-blue-700">'돌봄을 통해 사회를 하나로 연결하는 것'</strong>을 사명으로 시작합니다.
              <br /><br />
              난민, 장애인, 노약자, 무주택 취약계층에게 실제적인 도움을 전하고, 다음세대가 건강한 사회적 가치를 배우도록 준비하고 있습니다.
            </p>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              더 알아보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
