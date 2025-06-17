
import { Button } from "@/components/ui/button";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";

const Header = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-blue-50 overflow-hidden">
      {/* Background decoration - 따뜻하고 포용적인 분위기 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-yellow-200 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-warm leading-tight">
            🤝 돌봄으로 하나 되는 사회,
            <br />
            <span className="text-amber-700">Comm.Unity</span>
          </h1>
          
          <div className="space-y-4 mb-12 animate-slide-up">
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              난민과 취약계층에게 희망과 돌봄을 전합니다.
            </p>
            <p className="text-lg md:text-xl text-gray-600">
              함께 사는 사회, 함께 살아내는 연대.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <DonationModal>
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow"
              >
                💝 정기 후원하기
              </Button>
            </DonationModal>
            <VolunteerModal>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-500 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full hover-lift"
              >
                🙋‍♀️ 참여 신청하기
              </Button>
            </VolunteerModal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
