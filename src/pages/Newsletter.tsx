
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Newsletter = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "컴유니티 소식받기",
    "description": "컴유니티의 최신 소식과 활동 정보를 받아보세요",
    "publisher": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="소식받기 - Comm.Unity"
        description="컴유니티의 최신 소식과 활동 정보를 받아보세요"
        keywords="뉴스레터, 소식, 이메일구독, 컴유니티소식, 활동정보"
        structuredData={structuredData}
      />
      <SimpleHeader />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Newsletter;
