
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
    "description": "다문화 가정과 취약계층을 위한 후원에 참여하세요",
    "recipient": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="후원하기 - 사단법인 컴유니티(Comm-Unity)"
        description="다문화 가정과 취약계층을 위한 후원에 참여하세요. 투명한 사용내역을 공개합니다."
        keywords="후원, 기부, 다문화가정후원, 취약계층지원, 투명한기부"
        ogImage="https://www.comm-unity.or.kr/lovable-uploads/b6f0bddb-3fc4-415c-8b5a-75b9b5c743cb.png"
        canonicalUrl="https://www.comm-unity.or.kr/donation"
        structuredData={structuredData}
        pageType="article"
        breadcrumbs={[
          { name: "홈", url: "https://www.comm-unity.or.kr/" },
          { name: "후원하기", url: "https://www.comm-unity.or.kr/donation" }
        ]}
      />
      <SimpleHeader />
      <DonationSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Donation;
