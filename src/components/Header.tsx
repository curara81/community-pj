import React, { memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import VolunteerModal from "./VolunteerModal";
import AuthButton from "./AuthButton";
import communityLogo from "@/assets/community-logo-optimized.webp";

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

  const handleDonationClick = useCallback(() => {
    window.open("https://link.donationbox.co.kr/donationBoxList.jsp?campaignuid=J9B2CMgACb", "_blank");
  }, []);

  return (
    <header className="relative min-h-screen flex flex-col">
      {/* 상단 네비게이션 */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-3 md:p-6">
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
                className="!border-2 !border-red-500 !text-red-700 !bg-white hover:!bg-white !w-[140px] sm:!w-[160px] lg:!w-[180px] !h-[40px] sm:!h-[45px] lg:!h-[50px] flex items-center justify-center text-base sm:text-lg font-semibold"
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
          
          {/* 두 번째 줄: 네비게이션 메뉴 */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              홈
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              단체소개
            </Link>
            <Link to="/business" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              사업안내
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              스토리
            </Link>
            <Link to="/donation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              후원하기
            </Link>
            <Link to="/volunteer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              동참하기
            </Link>
            <Link to="/newsletter" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              소식받기
            </Link>
            <Link to="/financial-report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
              재정보고
            </Link>
          </div>
        </div>
      </nav>

      {/* 기존 헤더 콘텐츠 */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-blue-50 overflow-hidden pt-40 md:pt-32 lg:pt-0">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full blur-lg"></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-yellow-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-6 md:mb-6 mt-8 md:mt-12 lg:mt-16">
              <img 
                src={communityLogo} 
                alt="돌봄으로 하나 되는 사회" 
                className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight px-4">
              <span className="block text-slate-800">돌봄으로</span>
              <span className="block text-slate-800">하나되는 사회,</span>
              <span className="text-blue-600">Comm.Unity</span>
            </h1>
            
            <div className="space-y-6 mb-12 animate-slide-up px-4">
              <p className="text-2xl md:text-3xl lg:text-4xl text-slate-700 font-semibold text-center">
                <span className="block">난민과 취약계층에게</span>
                <span className="block">희망과 돌봄을 전합니다.</span>
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 font-medium text-center">
                함께 사는 사회, 함께 살아내는 연대.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button 
                size="lg" 
                onClick={handleDonationClick}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow w-full sm:w-auto min-w-[200px]"
              >
                💝 후원하기
              </Button>
              <VolunteerModal>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="!border-2 !border-green-500 !text-green-700 hover:!bg-green-600 hover:!text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift w-full sm:w-auto min-w-[200px]"
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
