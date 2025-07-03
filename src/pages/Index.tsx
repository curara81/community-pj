
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import CoreBusinessSection from "@/components/CoreBusinessSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import DonationSection from "@/components/DonationSection";
import VolunteerSection from "@/components/VolunteerSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "http://www.comm-unity.or.kr/#organization",
    "name": "사단법인 컴유니티",
    "alternateName": "Comm.Unity",
    "description": "난민사역과 취약계층을 위한 돌봄, 구호, 봉사 활동을 하는 비영리 단체",
    "url": "http://www.comm-unity.or.kr",
    "logo": {
      "@type": "ImageObject",
      "url": "http://www.comm-unity.or.kr/lovable-uploads/64193635-1583-49bf-b99d-0f5aafcfcea9.png",
      "width": 512,
      "height": 512
    },
    "foundingDate": "2025",
    "organizationType": "비영리법인",
    "legalName": "사단법인 컴유니티",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressRegion": "대한민국"
    },
    "areaServed": {
      "@type": "Country",
      "name": "대한민국"
    },
    "knowsAbout": [
      "난민 지원",
      "취약계층 돌봄",
      "자립준비청년 교육",
      "사회복지",
      "구호활동",
      "자원봉사"
    ],
    "mission": "돌봄을 통해 사회를 하나로 연결하는 것",
    "slogan": "돌봄으로 하나 되는 사회"
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="사단법인 컴유니티(Comm-Unity) - 돌봄으로 하나 되는 사회"
        description="컴유니티는 난민, 취약계층, 자립준비청년 돌봄과 교육으로 따뜻한 사회를 만듭니다."
        keywords="사단법인 컴유니티, 컴유니티, Comm.Unity, 난민사역, 취약계층, 돌봄, 구호, 봉사, 비영리단체, 후원, 자원봉사"
        ogImage="http://www.comm-unity.or.kr/lovable-uploads/64193635-1583-49bf-b99d-0f5aafcfcea9.png"
        canonicalUrl="http://www.comm-unity.or.kr/"
        structuredData={structuredData}
        pageType="website"
      />
      <Header />
      <IntroSection />
      <CoreBusinessSection />
      <PhotoGallerySection />
      <DonationSection />
      <VolunteerSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
