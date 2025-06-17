
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AboutModalProps {
  children: React.ReactNode;
}

const AboutModal = ({ children }: AboutModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-700">
            사단법인 컴유니티 소개
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-amber-700">🎯 우리의 미션</h3>
            <p className="text-gray-700 leading-relaxed">
              컴유니티(Comm.Unity)는 난민사역과 돌봄의 사각지대에 놓인 이웃들과 함께하기 위해 설립된 비영리 사단법인입니다. 
              '돌봄을 통해 사회를 하나로 연결하는 것'을 사명으로 2025년부터 본격적인 활동을 시작합니다.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700">🎯 주요 대상</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>한국에 정착하는 난민들</li>
              <li>장애인 및 거동불편자</li>
              <li>독거노인 및 소외계층</li>
              <li>무주택 취약계층</li>
              <li>사각지대에 놓인 모든 이웃들</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-green-700">🌱 우리의 가치</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-700 mb-2">포용과 연대</h4>
                <p className="text-sm text-gray-600">서로 다른 배경을 가진 사람들이 함께 어우러지는 사회</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">실질적 도움</h4>
                <p className="text-sm text-gray-600">말뿐이 아닌 현실적이고 구체적인 지원</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">지속가능성</h4>
                <p className="text-sm text-gray-600">일회성이 아닌 지속적이고 체계적인 돌봄</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-700 mb-2">교육과 성장</h4>
                <p className="text-sm text-gray-600">다음세대가 건강한 사회적 가치를 배우도록</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">📋 조직 정보</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>단체명:</strong> 사단법인 컴유니티</p>
              <p><strong>고유번호:</strong> 130-82-19150</p>
              <p><strong>대표자:</strong> 박종렬</p>
              <p><strong>설립연도:</strong> 2025년</p>
              <p><strong>연락처:</strong> 070-4667-2733</p>
              <p><strong>이메일:</strong> comm@comm-unity.or.kr</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
