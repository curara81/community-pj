import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const WelcomePopup = lazy(() => import("@/components/WelcomePopup"));
const CoreBusinessSection = lazy(() => import("@/components/CoreBusinessSection"));
const PhotoGallerySection = lazy(() => import("@/components/PhotoGallerySection"));
const DonationSection = lazy(() => import("@/components/DonationSection"));
const VolunteerSection = lazy(() => import("@/components/VolunteerSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.comm-unity.or.kr/#organization",
    "name": "사단법인 컴유니티",
    "alternateName": "Comm.Unity",
    "description": "다문화 가정과 취약계층을 위한 돌봄, 구호, 봉사 활동을 하는 비영리 단체",
    "url": "https://www.comm-unity.or.kr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.comm-unity.or.kr/lovable-uploads/64193635-1583-49bf-b99d-0f5aafcfcea9.png",
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
      "다문화 가정 지원",
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
        description="사단법인 컴유니티(Comm-Unity)는 다문화 가정, 취약계층, 자립준비청년을 위한 돌봄과 교육 활동을 하는 비영리 단체입니다."
        keywords="사단법인 컴유니티, 컴유니티, Comm.Unity, 다문화가정, 취약계층, 돌봄, 구호, 봉사, 비영리단체, 후원, 자원봉사"
        ogImage="https://www.comm-unity.or.kr/lovable-uploads/64193635-1583-49bf-b99d-0f5aafcfcea9.png"
        canonicalUrl="https://www.comm-unity.or.kr/"
        structuredData={structuredData}
        pageType="website"
        breadcrumbs={[{ name: "홈", url: "https://www.comm-unity.or.kr/" }]}
      />
      <Header />
      <IntroSection />
      <Suspense fallback={null}>
        <WelcomePopup />
        <CoreBusinessSection />
        <PhotoGallerySection />
        <DonationSection />
        <VolunteerSection />
        <FAQSection />
        <NewsletterSection />
        <ScrollToTop />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
