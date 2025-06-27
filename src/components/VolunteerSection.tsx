
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VolunteerModal from "./VolunteerModal";

const VolunteerSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            🙋‍♀️ <span className="hidden md:inline">함께할 동역자를 찾습니다</span>
            <span className="md:hidden">함께할 동역자를<br />찾습니다</span>
          </h2>
          
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 hover-lift mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  <span className="hidden md:block">컴유니티의 활동은 지금 막 시작되려 합니다.</span>
                  <span className="md:hidden">컴유니티의 활동은<br />지금 막 시작되려 합니다.</span>
                </p>
                
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    🤝 당신의 마음과 시간이 필요합니다
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    <span className="hidden md:block">난민, 취약계층과 함께하는 활동에 여러분의 동참이 필요합니다.</span>
                    <span className="md:hidden">난민, 취약계층과 함께하는 활동에<br />여러분의<br />동참이<br />필요합니다.</span>
                  </p>
                  <ul className="text-left text-gray-600 space-y-2 max-w-2xl mx-auto">
                    <li>✨ 번역 및 통역 지원</li>
                    <li>✨ 생활 상담 및 멘토링</li>
                    <li>✨ 교육 프로그램 운영</li>
                    <li>✨ 행정 업무 지원</li>
                    <li>✨ 기타 자원봉사 활동</li>
                  </ul>
                </div>
                
                <VolunteerModal>
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow"
                  >
                    🙋‍♀️ 자원봉사 신청하기
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
