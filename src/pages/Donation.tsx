
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Donation = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    "name": "컴유니티 후원하기",
    "description": "난민과 취약계층을 위한 후원에 참여하세요",
    "recipient": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="후원하기 - Comm.Unity"
        description="난민과 취약계층을 위한 후원에 참여하세요"
        keywords="후원, 기부, 난민후원, 취약계층지원, 정기후원, 일시후원"
        structuredData={structuredData}
      />
      <SimpleHeader />
      <DonationSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Donation;
