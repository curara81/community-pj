
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
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            사단법인 컴유니티(서울시 등록)는 '돌봄을 통해 사회를 하나로 연결하는 것'을 사명으로, 난민, 장애인, 노약자, 무주택 취약계층 등 연약한 이웃들에게 따뜻한 손길과 실질적인 도움을 전하고 있습니다.<br />
            모든 이웃을 존중하고 포용하며, 누구도 소외되지 않는 따뜻한 공동체를 지향합니다.<br />
            작은 사랑과 나눔이 모여 모두가 함께 행복한 사회를 만들어가길 소망합니다.<br />
            컴유니티는 사랑이 머무는 곳이며, 그 사랑이 세상을 변화시키는 힘이 된다고 믿습니다.
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* 파이차트 섹션 */}
          <FinancialChartSection />

          {/* 수입 세부 테이블 */}
          <FinancialIncomeTable />

          {/* 지출 세부 테이블 */}
          <FinancialExpenditureTable />

          <div className="text-center text-sm text-gray-600 mt-6">
            *위의 사단법인 컴유니티 2024년 결산은 현금주의(예산 회계)로 작성한 것으로 재무제표 및 결산서와 상이함.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialReportModal;
