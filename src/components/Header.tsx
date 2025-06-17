
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-mint-50 via-ivory-50 to-peach-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-mint-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-peach-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-ivory-300 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            🤝 돌봄으로 하나 되는 사회,
            <br />
            <span className="text-mint-700">Comm.Unity</span>
          </h1>
          
          <div className="space-y-4 mb-12 animate-slide-up">
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              주거와 돌봄이 무너진 곳에 다시 희망을 짓습니다.
            </p>
            <p className="text-lg md:text-xl text-gray-600">
              함께 사는 사회, 함께 살아내는 연대.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              size="lg" 
              className="bg-mint-600 hover:bg-mint-700 text-white px-8 py-4 text-lg font-semibold rounded-xl hover-lift shadow-lg"
            >
              정기 후원하기
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-mint-600 text-mint-700 hover:bg-mint-50 px-8 py-4 text-lg font-semibold rounded-xl hover-lift"
            >
              참여 신청하기
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
