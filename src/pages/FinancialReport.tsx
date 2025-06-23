
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
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              연간 기부금 모금액 및 활용실적
            </h1>
            <div className="text-slate-700 text-lg leading-relaxed font-medium max-w-4xl mx-auto px-4">
              사단법인 컴유니티(서울시 등록)는 '돌봄을 통해 사회를 하나로 연결하는 것'을 사명으로, 
              난민, 장애인, 노약자, 무주택 취약계층 등 연약한 이웃들에게 
              따뜻한 손길과 실질적인 도움을 전하고 있습니다.
            </div>
          </div>

          <div className="space-y-16">
            {/* 파이차트 섹션 */}
            <FinancialChartSection />

            {/* 수입 세부 테이블 */}
            <FinancialIncomeTable />

            {/* 지출 세부 테이블 */}
            <FinancialExpenditureTable />

            <div className="text-center text-sm text-slate-500 mt-8 italic">
              *위의 사단법인 컴유니티 2024년 결산은 현금주의(예산 회계)로 작성한 것으로 재무제표 및 결산서와 상이함.
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
