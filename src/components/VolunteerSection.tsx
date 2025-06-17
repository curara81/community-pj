
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VolunteerSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            🙋 함께할 동역자를 찾습니다
          </h2>
          
          <Card className="care-card hover-lift">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                컴유니티의 활동은 지금 막 시작되려 합니다.
                <br />
                <strong className="text-amber-700">난민사역, 돌봄, 상담, 행정, 교육</strong> 등 다양한 영역에서의 동참이 필요합니다.
                <br />
                자원봉사나 프로그램 참여를 원하신다면 지금 미리 신청해주세요.
              </p>
              
              <Button 
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl font-semibold rounded-full hover-lift shadow-lg"
              >
                🙋‍♀️ 참여 신청하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
