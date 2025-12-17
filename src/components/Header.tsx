import React, { memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Languages, Heart, Flower2 } from "lucide-react";
import VolunteerModal from "./VolunteerModal";
import AuthButton from "./AuthButton";
import { useLanguage } from "@/contexts/LanguageContext";


const Header = memo(() => {
  const { language, toggleLanguage, t } = useLanguage();

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
          {/* 모바일 레이아웃 */}
          <div className="block md:hidden">
            {/* 첫 번째 줄: 서울특별시, 국세청 */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSeoulClick}
                className="!border-2 !border-accent !bg-background hover:!bg-accent-lighter !w-[140px] !h-[40px] flex items-center justify-center"
                title="서울특별시"
              >
                <img 
                  src="/lovable-uploads/fe395779-15a3-4abb-a0f3-eef3cfafaa75.png" 
                  alt="서울특별시" 
                  className="max-w-[120px] max-h-[25px] object-contain"
                />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleTaxOfficeClick}
                className="!border-2 !border-success !bg-background hover:!bg-success-lighter !w-[140px] !h-[40px] flex items-center justify-center"
                title="국세청"
              >
                <img 
                  src="/lovable-uploads/c9701e84-86de-4b52-9d0b-8566f5649005.png" 
                  alt="국세청" 
                  className="max-w-[140px] max-h-[35px] object-contain"
                />
              </Button>
            </div>
            
            {/* 두 번째 줄: 공익위반 신고, 납부자 조회 서비스, EN */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleWhistleblowerClick}
                className="!border-2 !border-destructive !text-destructive !bg-background hover:!bg-destructive hover:!text-destructive-foreground !w-[140px] !h-[40px] flex items-center justify-center text-sm font-semibold"
              >
                {t('공익위반 신고', 'Report Violation')}
              </Button>
              <Button
                onClick={() => window.open("https://link.donationbox.co.kr/userPaymentsLogin.jsp?uid=5H4nnMENSe", "_blank")}
                variant="outline"
                size="sm"
                className="!border-2 !border-accent !text-accent !bg-background hover:!bg-accent hover:!text-accent-foreground !w-[140px] !h-[40px] flex items-center justify-center text-sm font-semibold"
              >
                납부자 조회 서비스
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="!border-2 !border-secondary !text-secondary !bg-background hover:!bg-secondary hover:!text-secondary-foreground !w-[60px] !h-[40px] flex items-center justify-center"
              >
                <Languages size={14} />
                <span className="ml-1 text-xs">{language === 'ko' ? 'EN' : '한글'}</span>
              </Button>
            </div>
          </div>

          {/* 데스크탑 레이아웃 */}
          <div className="hidden md:flex justify-between items-center gap-2 md:gap-3 mb-4">
            {/* 좌측: 로고 버튼들 */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSeoulClick}
                className="!border-2 !border-accent !bg-background hover:!bg-accent-lighter !w-[160px] lg:!w-[180px] !h-[45px] lg:!h-[50px] flex items-center justify-center"
                title="서울특별시"
              >
                <img 
                  src="/lovable-uploads/fe395779-15a3-4abb-a0f3-eef3cfafaa75.png" 
                  alt="서울특별시" 
                  className="max-w-[140px] lg:max-w-[160px] max-h-[30px] lg:max-h-[35px] object-contain"
                />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleTaxOfficeClick}
                className="!border-2 !border-success !bg-background hover:!bg-success-lighter !w-[160px] lg:!w-[180px] !h-[45px] lg:!h-[50px] flex items-center justify-center"
                title="국세청"
              >
                <img 
                  src="/lovable-uploads/c9701e84-86de-4b52-9d0b-8566f5649005.png" 
                  alt="국세청" 
                  className="max-w-[160px] lg:max-w-[180px] max-h-[40px] lg:max-h-[45px] object-contain"
                />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleWhistleblowerClick}
                className="!border-2 !border-destructive !text-destructive !bg-background hover:!bg-destructive hover:!text-destructive-foreground !w-[160px] lg:!w-[180px] !h-[45px] lg:!h-[50px] flex items-center justify-center text-base sm:text-lg font-semibold"
              >
                {t('공익위반 신고', 'Report Violation')}
              </Button>
            </div>
            
            {/* 우측: 언어 전환 버튼과 로그인 버튼 */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="!border-2 !border-secondary !text-secondary !bg-background hover:!bg-secondary hover:!text-secondary-foreground !h-[40px] flex items-center gap-2"
              >
                <Languages size={16} />
                {language === 'ko' ? 'EN' : '한글'}
              </Button>
              <AuthButton />
            </div>
          </div>
          
          {/* 두 번째 줄: Comm.Unity 로고 + 네비게이션 메뉴 */}
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3 lg:gap-6">
            {/* Comm.Unity 로고 */}
            <Link to="/" className="text-xl lg:text-2xl font-bold text-slate-800 whitespace-nowrap">
              Comm.Unity
            </Link>
            
            {/* 네비게이션 메뉴 */}
            <div className="flex flex-wrap justify-center gap-3 lg:gap-6">
              <Link to="/" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('홈', 'Home')}
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('단체소개', 'About Us')}
              </Link>
              <Link to="/business" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('사업안내', 'Programs')}
              </Link>
              <Link to="/gallery" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('스토리', 'Stories')}
              </Link>
              <Link to="/donation" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('후원하기', 'Donate')}
              </Link>
              <Link to="/volunteer" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('동참하기', 'Volunteer')}
              </Link>
              <Link to="/newsletter" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('소식받기', 'Newsletter')}
              </Link>
              <Link to="/financial-report" className="text-muted-foreground hover:text-accent font-medium transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('재정보고', 'Financial Report')}
              </Link>
            </div>
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
                src="/lovable-uploads/a8a64d27-d20f-4ce7-96ca-1c7063ad7838.png" 
                alt="돌봄으로 하나 되는 사회" 
                className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
              />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight px-4">
              <span className="block text-slate-800">{t('돌봄으로', 'Through Care,')}</span>
              <span className="block text-slate-800">{t('하나되는 사회,', 'United Society,')}</span>
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-orange-700 bg-clip-text text-transparent">Comm.Unity</span>
            </h1>
            
            <div className="space-y-6 mb-12 animate-slide-up px-4">
              <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-slate-700 font-semibold text-center">
                <span className="block">{t('난민과 취약계층에게', 'To refugees and')}</span>
                <span className="block">{t('희망과 돌봄을 전합니다.', 'vulnerable communities, we deliver hope and care.')}</span>
              </p>
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-slate-600 font-medium text-center">
                {t('함께 사는 사회, 함께 살아내는 연대.', 'A society where we live together, solidarity where we survive together.')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button 
                variant="accent"
                size="lg" 
                onClick={handleDonationClick}
                className="px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow w-full sm:w-auto min-w-[200px]"
              >
                <Heart className="w-5 h-5 mr-2" />
                {t('후원하기', 'Donate')}
              </Button>
              <VolunteerModal>
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-full hover-lift w-full sm:w-auto min-w-[200px] border-2 border-success text-success bg-background hover:bg-success-lighter"
                >
                  <Flower2 className="w-5 h-5 mr-2" />
                  {t('참여 신청하기', 'Apply to Volunteer')}
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
