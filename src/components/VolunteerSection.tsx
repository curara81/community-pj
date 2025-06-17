
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
          
          <Card className="bg-gradient-to-br from-peach-50 to-mint-50 border-0 shadow-lg hover-lift">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                컴유니티의 활동은 지금 막 시작되려 합니다.
                <br />
                <strong className="text-mint-700">건축, 간병, 상담, 행정, 교육</strong> 등 다양한 영역에서의 동참이 필요합니다.
                <br />
                자원봉사나 프로그램 참여를 원하신다면 지금 미리 신청해주세요.
              </p>
              
              <Button 
                size="lg"
                className="bg-peach-500 hover:bg-peach-600 text-white px-8 py-4 text-xl font-semibold rounded-xl hover-lift shadow-lg"
              >
                참여 신청하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
