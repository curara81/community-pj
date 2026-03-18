
import SimpleHeader from "@/components/SimpleHeader";
import IntroSection from "@/components/IntroSection";
import CEOMessageSection from "@/components/CEOMessageSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "단체소개 - 사단법인 컴유니티",
    "description": "컴유니티 단체 소개, 비전, 미션을 확인하세요",
    "mainEntity": {
      "@type": "Organization",
      "name": "사단법인 컴유니티",
      "alternateName": "Comm.Unity",
      "description": "다문화 가정과 취약계층을 위한 돌봄 서비스 제공 단체"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="단체소개 - 사단법인 컴유니티(Comm-Unity)"
        description="컴유니티 단체 소개, 비전, 미션을 확인하세요. 다문화 가정과 취약계층을 위한 돌봄 서비스를 제공하는 비영리 단체입니다."
        keywords="사단법인 컴유니티, 단체소개, 비전, 미션, 다문화가정지원단체, 취약계층지원"
        ogImage="https://www.comm-unity.or.kr/lovable-uploads/97f02cb3-e112-40d1-8b4c-9d2a11e1c4a3.png"
        canonicalUrl="https://www.comm-unity.or.kr/about"
        structuredData={structuredData}
        pageType="profile"
        breadcrumbs={[
          { name: "홈", url: "https://www.comm-unity.or.kr/" },
          { name: "단체소개", url: "https://www.comm-unity.or.kr/about" }
        ]}
      />
      <SimpleHeader />
      <IntroSection />
      <CEOMessageSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
