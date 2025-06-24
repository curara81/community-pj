
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import CoreBusinessSection from "@/components/CoreBusinessSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Business = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "컴유니티 사업안내",
    "description": "난민 지원, 취약계층 돌봄, 자립준비청년 교육 사업",
    "provider": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    },
    "serviceType": ["난민 지원", "취약계층 돌봄", "자립준비청년 교육"]
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="사업안내 - Comm.Unity"
        description="난민 지원, 취약계층 돌봄, 자립준비청년 교육 사업을 소개합니다"
        keywords="난민지원, 취약계층돌봄, 자립준비청년, 교육사업, 사회복지"
        structuredData={structuredData}
      />
      <SimpleHeader />
      <CoreBusinessSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Business;
