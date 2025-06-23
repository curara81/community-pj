
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
    <nav className="sticky top-0 z-20 bg-white shadow-sm border-b p-6">
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
        
        {/* 중앙: 네비게이션 메뉴 (데스크탑) */}
        <div className="hidden lg:flex gap-6">
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
        
        {/* 우측: 모바일 메뉴 버튼과 인증 버튼 */}
        <div className="flex items-center gap-3">
          <AuthButton />
          
          {/* 모바일 메뉴 버튼 */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </div>
      </div>
      
      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-white border-t pt-4">
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
              소개
            </Link>
            <Link 
              to="/business" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              핵심사업
            </Link>
            <Link 
              to="/gallery" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              갤러리
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
              참여신청
            </Link>
            <Link 
              to="/newsletter" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              뉴스레터
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
