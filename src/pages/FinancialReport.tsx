
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import FinancialChartSection from "@/components/FinancialChartSection";
import FinancialIncomeTable from "@/components/FinancialIncomeTable";
import FinancialExpenditureTable from "@/components/FinancialExpenditureTable";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const FinancialReport = () => {
  useEffect(() => {
    document.title = "재정보고 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
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
