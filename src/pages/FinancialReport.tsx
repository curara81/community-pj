
import SimpleHeader from "@/components/SimpleHeader";
import FinancialChartSection from "@/components/FinancialChartSection";
import FinancialIncomeTable from "@/components/FinancialIncomeTable";
import FinancialExpenditureTable from "@/components/FinancialExpenditureTable";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const FinancialReport = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": "사단법인 컴유니티 재정보고",
    "description": "투명한 기부금 사용내역과 재정 현황을 공개합니다",
    "publisher": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="재정보고 - 사단법인 컴유니티(Comm-Unity)"
        description="투명한 기부금 사용내역과 재정 현황을 공개합니다. 연간 기부금 모금액 및 활용실적을 확인하세요."
        keywords="재정보고, 기부금사용내역, 투명경영, 회계공시, 모금실적, 사용실적"
        ogImage="http://www.comm-unity.or.kr/lovable-uploads/97f02cb3-e112-40d1-8b4c-9d2a11e1c4a3.png"
        canonicalUrl="http://www.comm-unity.or.kr/financial-report"
        structuredData={structuredData}
        pageType="article"
      />
      <SimpleHeader />
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            연간 기부금 모금액 및 활용실적
          </h1>
          
          {/* 차트 섹션 */}
          <div className="mb-16">
            <FinancialChartSection />
          </div>
          
          {/* 표 섹션 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <FinancialIncomeTable />
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <FinancialExpenditureTable />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FinancialReport;
