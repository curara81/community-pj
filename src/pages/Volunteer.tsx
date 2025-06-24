
import SimpleHeader from "@/components/SimpleHeader";
import VolunteerSection from "@/components/VolunteerSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Volunteer = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VolunteerAction",
    "name": "컴유니티 동참하기",
    "description": "자원봉사로 따뜻한 사회 만들기에 동참하세요",
    "organization": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="동참하기 - 사단법인 컴유니티(Comm-Unity)"
        description="자원봉사로 따뜻한 사회 만들기에 동참하세요. 난민사역, 돌봄, 상담, 교육 등 다양한 영역에서 함께할 수 있습니다."
        keywords="자원봉사, 봉사활동, 동참하기, 난민봉사, 취약계층봉사, 자원봉사자모집"
        ogImage="http://www.comm-unity.or.kr/lovable-uploads/dea4eab4-d07d-4996-99e9-e9004be8dbb2.png"
        canonicalUrl="http://www.comm-unity.or.kr/volunteer"
        structuredData={structuredData}
        pageType="article"
      />
      <SimpleHeader />
      <VolunteerSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Volunteer;
