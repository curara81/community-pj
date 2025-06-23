
import React, { memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";
import AuthButton from "./AuthButton";

const Header = memo(() => {
  const handleSeoulClick = useCallback(() => {
    window.open("https://www.seoul.go.kr/main/index.jsp", "_blank");
  }, []);

  const handleTaxOfficeClick = useCallback(() => {
    window.open("https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3", "_blank");
  }, []);

  const handleWhistleblowerClick = useCallback(() => {
    window.open("https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=13386&cntntsId=109155", "_blank");
  }, []);

  return (
    <header className="relative min-h-screen flex flex-col">
      {/* 상단 네비게이션 */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* 좌측: 서울특별시, 국세청, 공익위반신고 버튼 */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSeoulClick}
              className="!border-2 !border-blue-500 hover:!bg-blue-50 !w-[180px] !h-[50px] flex items-center justify-center"
              title="서울특별시"
            >
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=160&h=35&fit=crop" 
                alt="서울특별시" 
                className="max-w-[160px] max-h-[35px] object-contain"
              />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleTaxOfficeClick}
              className="!border-2 !border-green-500 hover:!bg-green-50 !w-[180px] !h-[50px] flex items-center justify-center"
              title="국세청"
            >
              <img 
                src="/nts-logo.png" 
                alt="국세청" 
                className="max-w-[160px] max-h-[35px] object-contain"
              />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleWhistleblowerClick}
              className="!border-2 !border-red-500 !text-red-700 hover:!bg-red-50 !w-[180px] !h-[50px] flex items-center justify-center text-sm font-semibold"
            >
              📢 공익위반신고
            </Button>
          </div>
          
          {/* 중앙: 네비게이션 메뉴 */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              홈
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              소개
            </Link>
            <Link to="/business" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              핵심사업
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              갤러리
            </Link>
            <Link to="/donation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              후원하기
            </Link>
            <Link to="/volunteer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              참여신청
            </Link>
            <Link to="/newsletter" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              뉴스레터
            </Link>
            <Link to="/financial-report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              재정보고
            </Link>
          </div>
          
          {/* 우측: 인증 버튼 */}
          <AuthButton />
        </div>
      </nav>

      {/* 기존 헤더 콘텐츠 */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-blue-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full blur-lg"></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-yellow-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/lovable-uploads/97f02cb3-e112-40d1-8b4c-9d2a11e1c4a3.png" 
                alt="돌봄으로 하나 되는 사회" 
                className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent leading-tight">
              돌봄으로 하나 되는 사회,
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-orange-700 bg-clip-text text-transparent">Comm.Unity</span>
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
              <DonationModal donationType="regular">
                <Button 
                  size="lg" 
                  className="!bg-blue-600 hover:!bg-blue-700 !text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow"
                >
                  💝 정기 후원하기
                </Button>
              </DonationModal>
              <VolunteerModal>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="!border-2 !border-green-500 !text-green-700 hover:!bg-green-600 hover:!text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift"
                >
                  🙋‍♀️ 참여 신청하기
                </Button>
              </VolunteerModal>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
