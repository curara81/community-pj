
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BusinessModal from "./BusinessModal";
import { useLanguage } from "@/contexts/LanguageContext";

const CoreBusinessSection = () => {
  const { t } = useLanguage();
  
  const businesses = [
    {
      emoji: "🏠",
      title: t("난민 정착 지원", "Refugee Settlement Support"),
      description: t("한국에 거주중인 난민들을 위한\n주거, 언어, 문화적응 지원", "Housing, language, and cultural adaptation\nsupport for refugees in Korea"),
      gradient: "from-amber-100 to-orange-100"
    },
    {
      emoji: "🤲",
      title: t("취약계층 돌봄", "Vulnerable Population Care"),
      description: t("장애인, 노약자를 위한 생활돌봄\n및 정서적 지원 프로그램", "Life care and emotional support\nprograms for disabled and elderly"),
      gradient: "from-blue-100 to-indigo-100"
    },
    {
      emoji: "📚",
      title: t("교육 및 자립 지원", "Education & Independence Support"),
      description: t("취약계층의 자립을 위한 직업교육,\n생활교육 및 멘토링", "Vocational education, life education\nand mentoring for independence"),
      gradient: "from-green-100 to-emerald-100"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📌 <span className="hidden md:inline">{t("우리의 주요 활동은", "Our main activities are")}<br />{t("이렇게 준비되고 있습니다", "being prepared like this")}</span>
            <span className="md:hidden">{t("우리의 주요 활동은", "Our main activities are")}<br />{t("이렇게 준비되고", "being prepared")}<br />{t("있습니다", "like this")}</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {businesses.map((business, index) => (
            <Card 
              key={index} 
              className={`hover-lift care-card bg-gradient-to-br ${business.gradient} border-0 shadow-md hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6">{business.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {business.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {business.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <BusinessModal>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl hover-lift helping-hand-shadow"
            >
              {t("각 사업 자세히 보기", "View Details of Each Program")}
            </Button>
          </BusinessModal>
        </div>
      </div>
    </section>
  );
};

export default CoreBusinessSection;
