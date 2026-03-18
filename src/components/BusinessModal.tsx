
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface BusinessModalProps {
  children: React.ReactNode;
}

const BusinessModal = ({ children }: BusinessModalProps) => {
  const { t } = useLanguage();
  const businesses = [
    {
      emoji: "🏠",
      title: t("다문화 가정 정착 지원 사업", "Multicultural Family Settlement Program"),
      description: t("한국에 정착하는 다문화 가정을 위한 종합적인 지원", "Comprehensive support for multicultural families settling in Korea"),
      details: [
        t("임시 주거 지원 및 주택 확보 도움", "Temporary housing support and housing assistance"),
        t("한국어 교육 및 문화적응 프로그램", "Korean language education and cultural adaptation programs"),
        t("취업 연계 및 직업 훈련", "Employment connection and vocational training"),
        t("법률 상담 및 행정업무 지원", "Legal consultation and administrative support"),
        t("자녀 교육 및 가족 통합 프로그램", "Children's education and family integration programs")
      ],
      color: "amber"
    },
    {
      emoji: "🤲",
      title: t("취약계층 돌봄 사업", "Vulnerable Population Care Program"),
      description: t("장애인, 노약자를 위한 생활돌봄 및 정서적 지원", "Life care and emotional support for disabled and elderly"),
      details: [
        t("재가 방문 돌봄 서비스", "Home visit care services"),
        t("말벗 및 정서적 지지 프로그램", "Companion and emotional support programs"),
        t("생활편의 지원 (장보기, 청소, 식사준비)", "Daily life assistance (grocery shopping, cleaning, meal preparation)"),
        t("의료진료 동행 및 건강관리", "Medical appointment accompaniment and health management"),
        t("사회활동 참여 지원", "Social activity participation support")
      ],
      color: "blue"
    },
    {
      emoji: "📚",
      title: t("교육 및 자립 지원 사업", "Education & Independence Support Program"),
      description: t("취약계층의 자립을 위한 교육과 역량강화", "Education and capacity building for independence of vulnerable groups"),
      details: [
        t("직업 기술 교육 및 자격증 취득 지원", "Vocational skills education and certification support"),
        t("금융 교육 및 생활 설계 프로그램", "Financial education and life planning programs"),
        t("디지털 리터러시 교육", "Digital literacy education"),
        t("창업 지원 및 멘토링", "Startup support and mentoring"),
        t("자녀 교육비 지원 및 장학 프로그램", "Children's education support and scholarship programs")
      ],
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber':
        return 'business-card-primary text-secondary';
      case 'blue':
        return 'business-card-accent text-accent';
      case 'green':
        return 'business-card-success text-success';
      default:
        return 'bg-muted border-muted-medium text-muted-foreground';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-muted border-muted-medium">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            📌 {t("컴유니티 주요 사업 소개", "Comm.Unity Main Programs")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {businesses.map((business, index) => (
            <Card key={index} className={`${getColorClasses(business.color)} border-2`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{business.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{business.title}</h3>
                    <p className="text-muted-foreground mb-4">{business.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">{t("주요 활동:", "Main Activities:")}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {business.details.map((detail, idx) => (
                          <li key={idx} className="text-muted-foreground">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="bg-gradient-to-r from-primary-lighter to-accent-lighter p-6 rounded-lg border border-muted-medium">
            <h3 className="text-lg font-semibold mb-3 text-center text-foreground">🚀 {t("2026년 목표", "2026 Goals")}</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{t("10+ (가정)", "10+ Families")}</div>
                <div className="text-sm text-muted-foreground">{t("난민 가정 지원", "Refugee Family Support")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{t("50+ (명)", "50+ People")}</div>
                <div className="text-sm text-muted-foreground">{t("취약계층 돌봄", "Vulnerable Population Care")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{t("100+ (명)", "100+ People")}</div>
                <div className="text-sm text-muted-foreground">{t("교육 프로그램 참여자", "Education Program Participants")}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessModal;
