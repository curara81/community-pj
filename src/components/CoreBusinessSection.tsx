
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CoreBusinessSection = () => {
  const businesses = [
    {
      emoji: "📦",
      title: "주거환경 개선",
      description: "주거 취약계층을 위한 집수리 및 환경개선",
      gradient: "from-mint-100 to-mint-200"
    },
    {
      emoji: "🧓",
      title: "노약자 돌봄",
      description: "고립된 노인을 위한 정서적·생활 돌봄 프로그램",
      gradient: "from-peach-100 to-peach-200"
    },
    {
      emoji: "🌱",
      title: "리더십 교육",
      description: "다음세대 리더를 위한 가치기반 교육 및 캠프 운영",
      gradient: "from-ivory-100 to-ivory-200"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📌 우리의 주요 활동은 이렇게 준비되고 있습니다
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {businesses.map((business, index) => (
            <Card 
              key={index} 
              className={`hover-lift bg-gradient-to-br ${business.gradient} border-0 shadow-md hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6">{business.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {business.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {business.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-mint-600 hover:bg-mint-700 text-white px-8 py-4 text-lg font-semibold rounded-xl hover-lift shadow-lg"
          >
            각 사업 자세히 보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoreBusinessSection;
