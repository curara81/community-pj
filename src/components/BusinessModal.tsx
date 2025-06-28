
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface BusinessModalProps {
  children: React.ReactNode;
}

const BusinessModal = ({ children }: BusinessModalProps) => {
  const businesses = [
    {
      emoji: "🏠",
      title: "난민 정착 지원 사업",
      description: "한국에 정착하는 난민들을 위한 종합적인 지원",
      details: [
        "임시 주거 지원 및 주택 확보 도움",
        "한국어 교육 및 문화적응 프로그램",
        "취업 연계 및 직업 훈련",
        "법률 상담 및 행정업무 지원",
        "자녀 교육 및 가족 통합 프로그램"
      ],
      color: "amber"
    },
    {
      emoji: "🤲",
      title: "취약계층 돌봄 사업",
      description: "장애인, 노약자를 위한 생활돌봄 및 정서적 지원",
      details: [
        "재가 방문 돌봄 서비스",
        "말벗 및 정서적 지지 프로그램",
        "생활편의 지원 (장보기, 청소, 식사준비)",
        "의료진료 동행 및 건강관리",
        "사회활동 참여 지원"
      ],
      color: "blue"
    },
    {
      emoji: "📚",
      title: "교육 및 자립 지원 사업",
      description: "취약계층의 자립을 위한 교육과 역량강화",
      details: [
        "직업 기술 교육 및 자격증 취득 지원",
        "금융 교육 및 생활 설계 프로그램",
        "디지털 리터러시 교육",
        "창업 지원 및 멘토링",
        "자녀 교육비 지원 및 장학 프로그램"
      ],
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 border-amber-200 text-amber-800';
      case 'blue':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'green':
        return 'bg-green-100 border-green-200 text-green-800';
      default:
        return 'bg-stone-100 border-stone-200 text-stone-800';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-stone-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-800">
            📌 컴유니티 주요 사업 소개
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
                    <p className="text-stone-700 mb-4">{business.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">주요 활동:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {business.details.map((detail, idx) => (
                          <li key={idx} className="text-stone-600">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="bg-gradient-to-r from-amber-100 to-blue-100 p-6 rounded-lg border border-stone-200">
            <h3 className="text-lg font-semibold mb-3 text-center text-stone-800">🚀 2025년 목표</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-700">10+ (가정)</div>
                <div className="text-sm text-stone-600">난민 가정 지원</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">50+ (명)</div>
                <div className="text-sm text-stone-600">취약계층 돌봄</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">100+ (명)</div>
                <div className="text-sm text-stone-600">교육 프로그램 참여자</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessModal;
