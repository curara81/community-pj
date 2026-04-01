import React, { memo, useCallback, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Languages, Heart, Flower2, Menu, X } from "lucide-react";
import VolunteerModal from "./VolunteerModal";
import DonationHistoryModal from "./DonationHistoryModal";
import AuthButton from "./AuthButton";
import { useLanguage } from "@/contexts/LanguageContext";


const Header = memo(() => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDonationHistoryOpen, setIsDonationHistoryOpen] = useState(false);

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
    window.open("https://online.mrm.or.kr/jp40Mng", "_blank");
  }, []);

  return (
    <header className="relative min-h-screen flex flex-col">
      {/* 상단 네비게이션 */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-3 md:p-6">
        <div className="container mx-auto">
          {/* 모바일 레이아웃 */}
          <div className="block md:hidden">
            {/* 모바일 상단: 외부 링크 버튼 + 햄버거 */}
            <div className="flex items-center justify-between gap-1 mb-2">
              <div className="flex flex-wrap gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSeoulClick}
                  className="!border !border-accent !bg-background !w-[100px] !h-[32px] flex items-center justify-center !p-0"
                  title="서울특별시"
                >
                  <img 
                    src="/lovable-uploads/fe395779-15a3-4abb-a0f3-eef3cfafaa75.png" 
                    alt="서울특별시" 
                    className="max-w-[80px] max-h-[20px] object-contain"
                  />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTaxOfficeClick}
                  className="!border !border-success !bg-background !w-[100px] !h-[32px] flex items-center justify-center !p-0"
                  title="국세청"
                >
                  <img 
                    src="/lovable-uploads/c9701e84-86de-4b52-9d0b-8566f5649005.png" 
                    alt="국세청" 
                    className="max-w-[90px] max-h-[24px] object-contain"
                  />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleWhistleblowerClick}
                  className="!border !border-destructive !text-destructive !bg-background !w-[80px] !h-[32px] flex items-center justify-center !text-[10px] font-semibold !p-0"
                >
                  공익위반 신고
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="!w-[36px] !h-[32px] !p-0 flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </div>
            
            {/* 모바일 햄버거 드롭다운 메뉴 */}
            {isMobileMenuOpen && (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-3 mb-2 animate-fade-in">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Link to="/" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('홈', 'Home')}
                  </Link>
                  <Link to="/about" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('단체소개', 'About Us')}
                  </Link>
                  <Link to="/business" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('사업안내', 'Programs')}
                  </Link>
                  <Link to="/gallery" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('스토리', 'Stories')}
                  </Link>
                  <Link to="/donation" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('후원하기', 'Donate')}
                  </Link>
                  <Link to="/volunteer" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('동참하기', 'Volunteer')}
                  </Link>
                  <Link to="/newsletter" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('소식받기', 'Newsletter')}
                  </Link>
                  <Link to="/financial-report" className="text-sm text-foreground hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('재정보고', 'Financial Report')}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLanguage}
                    className="!border !border-secondary !text-secondary !bg-background !px-2 !h-[28px] text-[10px]"
                  >
                    <Languages size={12} />
                    <span className="ml-1">{language === 'ko' ? 'EN' : '한글'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://mrmweb.hsit.co.kr/v2/?server=skiZ1MMB3nSXnYx5MK2cQw==&action=info", "_blank")}
                    className="!border !border-accent !text-accent !bg-background !px-2 !h-[28px] text-[10px] font-semibold"
                  >
                    <Heart size={12} />
                    <span className="ml-1">{t('나의 후원', 'My Donations')}</span>
                  </Button>
                  <Button
                    onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSffGIBu7bfcnmBXzVPNvdvBydJg7mdz4I6SP1xguNu8KNVY_Q/viewform", "_blank")}
                    variant="outline"
                    size="sm"
                    className="!border !border-success !text-success !bg-background !px-2 !h-[28px] text-[10px] font-semibold"
                  >
                    기부금 영수증
                  </Button>
                </div>
              </div>
            )}
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="!border-2 !border-secondary !text-secondary !bg-background hover:!bg-secondary hover:!text-secondary-foreground !h-[36px] !px-3 flex items-center gap-1 text-xs"
              >
                <Languages size={14} />
                {language === 'ko' ? 'EN' : '한글'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://mrmweb.hsit.co.kr/v2/?server=skiZ1MMB3nSXnYx5MK2cQw==&action=info", "_blank")}
                className="!border-2 !border-accent !text-accent !bg-background hover:!bg-accent hover:!text-accent-foreground !h-[36px] !px-3 flex items-center gap-1 text-xs font-semibold"
              >
                <Heart size={14} />
                {t('나의 후원', 'My Donations')}
              </Button>
              <Button
                onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSffGIBu7bfcnmBXzVPNvdvBydJg7mdz4I6SP1xguNu8KNVY_Q/viewform", "_blank")}
                variant="outline"
                size="sm"
                className="!border-2 !border-success !text-success !bg-background hover:!bg-success hover:!text-success-foreground !h-[36px] !px-3 flex items-center justify-center text-xs font-semibold"
              >
                기부금 영수증
              </Button>
            </div>
          </div>
          
          {/* 두 번째 줄: Comm.Unity 로고 + 네비게이션 메뉴 */}
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3 lg:gap-6">
            {/* Comm.Unity 로고 */}
            <Link to="/" className="text-xl lg:text-2xl font-bold text-slate-800 whitespace-nowrap">
              Comm.Unity
            </Link>
            
            {/* 네비게이션 메뉴 */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 lg:gap-6">
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
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-blue-50 overflow-hidden pt-32 md:pt-40 lg:pt-8">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full blur-lg"></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-yellow-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-4 md:mb-6 mt-8 md:mt-12 lg:mt-16">
              <img 
                src="/lovable-uploads/a8a64d27-d20f-4ce7-96ca-1c7063ad7838.png" 
                alt="돌봄으로 하나 되는 사회" 
                className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
                width={192}
                height={192}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-4">
              <span className="text-slate-800">{t('돌봄으로 하나되는 사회,', 'Through Care, United Society,')}</span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-orange-700 bg-clip-text text-transparent">Comm.Unity</span>
            </h1>
            
            <div className="mb-8 md:mb-10 animate-slide-up px-4">
              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light text-center leading-relaxed">
                {t('다문화 가정과 취약계층에게 희망과 돌봄을 전합니다.', 'We deliver hope and care to multicultural families and vulnerable communities.')}
                <br />
                {t('함께 사는 사회, 함께 살아내는 연대.', 'A society where we live together, solidarity where we survive together.')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button 
                size="lg" 
                onClick={handleDonationClick}
                className="px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow w-full sm:w-auto min-w-[200px] text-white"
                style={{ backgroundColor: '#f08300' }}
              >
                <Heart className="w-5 h-5 mr-2" />
                {t('후원하기', 'Donate')}
              </Button>
              <VolunteerModal>
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-full hover-lift w-full sm:w-auto min-w-[200px] border-2 text-white"
                  style={{ backgroundColor: '#83c5be', borderColor: '#83c5be' }}
                >
                  <Flower2 className="w-5 h-5 mr-2" />
                  {t('참여 신청하기', 'Apply to Volunteer')}
                </Button>
              </VolunteerModal>
            </div>
          </div>
        </div>
      </div>
      <DonationHistoryModal open={isDonationHistoryOpen} onOpenChange={setIsDonationHistoryOpen} />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
