
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import AuthButton from "./AuthButton";

const SimpleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSeoulClick = () => {
    window.open("https://www.seoul.go.kr/main/index.jsp", "_blank");
  };

  const handleTaxOfficeClick = () => {
    window.open("https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3", "_blank");
  };

  const handleWhistleblowerClick = () => {
    window.open("https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=13386&cntntsId=109155", "_blank");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-20 bg-white shadow-sm border-b p-3 md:p-6">
      <div className="container mx-auto">
        {/* 첫 번째 줄: 좌측 로고 버튼들과 우측 로그인 버튼 */}
        <div className="flex flex-wrap justify-between items-center gap-2 md:gap-3 mb-4">
          {/* 좌측: 로고 버튼들 */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSeoulClick}
              className="!border-2 !border-blue-500 !bg-white hover:!bg-white !w-[140px] sm:!w-[160px] lg:!w-[180px] !h-[40px] sm:!h-[45px] lg:!h-[50px] flex items-center justify-center"
              title="서울특별시"
            >
              <img 
                src="/lovable-uploads/fe395779-15a3-4abb-a0f3-eef3cfafaa75.png" 
                alt="서울특별시" 
                className="max-w-[120px] sm:max-w-[140px] lg:max-w-[160px] max-h-[25px] sm:max-h-[30px] lg:max-h-[35px] object-contain"
              />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleTaxOfficeClick}
              className="!border-2 !border-green-500 !bg-white hover:!bg-white !w-[140px] sm:!w-[160px] lg:!w-[180px] !h-[40px] sm:!h-[45px] lg:!h-[50px] flex items-center justify-center"
              title="국세청"
            >
              <img 
                src="/lovable-uploads/c9701e84-86de-4b52-9d0b-8566f5649005.png" 
                alt="국세청" 
                className="max-w-[140px] sm:max-w-[160px] lg:max-w-[180px] max-h-[35px] sm:max-h-[40px] lg:max-h-[45px] object-contain"
              />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleWhistleblowerClick}
              className="!border-2 !border-red-500 !text-red-700 !bg-white hover:!bg-white !w-[140px] sm:!w-[160px] lg:!w-[180px] !h-[40px] sm:!h-[45px] lg:!h-[50px] flex items-center justify-center text-sm sm:text-base font-semibold"
            >
              공익위반 신고
            </Button>
            {/* 모바일에서만 납부자 조회 서비스 버튼을 공익위반신고 옆에 배치 */}
            <div className="block md:hidden">
              <AuthButton />
            </div>
          </div>
          
          {/* 우측: 로그인 버튼 (데스크탑에서만 표시) */}
          <div className="hidden md:flex items-center gap-3">
            <AuthButton />
          </div>
        </div>
        
        {/* 두 번째 줄: 네비게이션 메뉴와 모바일 메뉴 버튼 */}
        <div className="flex flex-wrap items-center justify-between">
          {/* 데스크탑 네비게이션 메뉴 */}
          <div className="hidden xl:flex flex-wrap gap-4 2xl:gap-6 order-1">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              홈
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              단체소개
            </Link>
            <Link to="/business" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              사업안내
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              스토리
            </Link>
            <Link to="/donation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              후원하기
            </Link>
            <Link to="/volunteer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              동참하기
            </Link>
            <Link to="/newsletter" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              소식받기
            </Link>
            <Link to="/financial-report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm 2xl:text-base whitespace-nowrap">
              재정보고
            </Link>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="xl:hidden ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="xl:hidden mt-4 bg-white border-t pt-4 pb-8">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              단체소개
            </Link>
            <Link 
              to="/business" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              사업안내
            </Link>
            <Link 
              to="/gallery" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              스토리
            </Link>
            <Link 
              to="/donation" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              후원하기
            </Link>
            <Link 
              to="/volunteer" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              동참하기
            </Link>
            <Link 
              to="/newsletter" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              소식받기
            </Link>
            <Link 
              to="/financial-report" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              재정보고
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SimpleHeader;
