
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";
import AuthButton from "./AuthButton";

const SimpleHeader = () => {
  const handleSeoulClick = () => {
    window.open("https://www.seoul.go.kr/main/index.jsp", "_blank");
  };

  const handleTaxOfficeClick = () => {
    window.open("https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3", "_blank");
  };

  const handleWhistleblowerClick = () => {
    window.open("https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=13386&cntntsId=109155", "_blank");
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
            className="!border-2 !border-blue-500 !text-blue-700 hover:!bg-blue-50 px-4 py-2 text-sm font-semibold rounded-full"
          >
            🏛️ 서울특별시
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleTaxOfficeClick}
            className="!border-2 !border-green-500 !text-green-700 hover:!bg-green-50 px-4 py-2 text-sm font-semibold rounded-full"
          >
            🏛️ 국세청
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleWhistleblowerClick}
            className="!border-2 !border-red-500 !text-red-700 hover:!bg-red-50 px-4 py-2 text-sm font-semibold rounded-full"
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
  );
};

export default SimpleHeader;
