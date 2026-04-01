
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BusinessModal from "./BusinessModal";
import { useLanguage } from "@/contexts/LanguageContext";

const CoreBusinessSection = () => {
  const { t } = useLanguage();
  
  const businesses = [
    {
      emoji: "🏠",
      title: t("다문화 가정 정착 지원", "Multicultural Family Settlement Support"),
      description: t("한국에 거주중인 다문화 가정을 위한 주거, 언어, 문화적응 지원", "Housing, language, and cultural adaptation support for multicultural families in Korea"),
    },
    {
      emoji: "🤲",
      title: t("취약계층 돌봄", "Vulnerable Population Care"),
      description: t("장애인, 노약자를 위한 생활돌봄 및 정서적 지원 프로그램", "Life care and emotional support programs for disabled and elderly"),
    },
    {
      emoji: "📚",
      title: t("다음세대 교육 및 지원", "Next Generation Education & Support"),
      description: t("아동·청소년의 건강한 가치관 확립과 미래 사회를 이끌어갈 차세대 리더 육성", "Establishing healthy values for children and youth, and nurturing next-generation leaders for the future"),
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
            📌 {t("우리의 주요 활동은 이렇게 준비되고 있습니다", "Our main activities are being prepared like this")}
          </h2>
          <div className="h-8 md:h-12" />
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {businesses.map((business, index) => (
              <Card 
                key={index} 
                className="bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 text-left">
                  <div className="text-4xl mb-4">{business.emoji}</div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {business.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                    {business.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <BusinessModal>
              <Button 
                variant="donate"
                size="lg"
                className="px-6 py-3 text-base font-semibold rounded-full hover-lift"
              >
                {t("각 사업 자세히 보기", "View Details of Each Program")}
              </Button>
            </BusinessModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBusinessSection;
