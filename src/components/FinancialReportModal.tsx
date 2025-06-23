
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import FinancialChartSection from "./FinancialChartSection";
import FinancialIncomeTable from "./FinancialIncomeTable";
import FinancialExpenditureTable from "./FinancialExpenditureTable";

interface FinancialReportModalProps {
  children: React.ReactNode;
}

const FinancialReportModal = ({ children }: FinancialReportModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(true)
      })}
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-center mb-8">
            <div className="text-slate-700 text-lg leading-relaxed font-medium max-w-4xl mx-auto px-4">
              사단법인 컴유니티(서울시 등록)는 '돌봄을 통해 사회를 하나로 연결하는 것'을 사명으로, 
              난민, 장애인, 노약자, 무주택 취약계층 등 연약한 이웃들에게 
              따뜻한 손길과 실질적인 도움을 전하고 있습니다.
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* 파이차트 섹션 */}
          <FinancialChartSection />

          {/* 수입 세부 테이블 */}
          <FinancialIncomeTable />

          {/* 지출 세부 테이블 */}
          <FinancialExpenditureTable />

          <div className="text-center text-sm text-slate-500 mt-6 italic">
            *위의 사단법인 컴유니티 2024년 결산은 현금주의(예산 회계)로 작성한 것으로 재무제표 및 결산서와 상이함.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialReportModal;
