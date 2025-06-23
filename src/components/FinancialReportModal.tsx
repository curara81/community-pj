
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FinancialReportModalProps {
  children: React.ReactNode;
}

const FinancialReportModal = ({ children }: FinancialReportModalProps) => {
  const [open, setOpen] = useState(false);

  // 2024년 수입 데이터
  const incomeData = [
    { name: "후원 회비", value: 136214954814, percentage: 53.1 },
    { name: "기부금/물품", value: 98509489688, percentage: 38.4 },
    { name: "운영비", value: 26205268300, percentage: 10.2 },
    { name: "보조금", value: 9758019234, percentage: 3.8 },
    { name: "기타수입", value: 2470641487, percentage: 1.0 },
    { name: "이월사업비", value: 9376156031, percentage: 3.6 },
    { name: "사업수입", value: 213460855, percentage: 0.1 },
    { name: "기타 사업", value: 778052832, percentage: 0.3 }
  ];

  // 2024년 지출 데이터
  const expenditureData = [
    { name: "사업비", value: 227509813409, percentage: 89.5 },
    { name: "운영비", value: 26205268300, percentage: 10.2 },
    { name: "기타 사업", value: 778052832, percentage: 0.3 }
  ];

  // 파이차트 색상
  const incomeColors = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#F97316", "#06B6D4", "#84CC16"];
  const expenditureColors = ["#6B7280", "#9CA3AF", "#D1D5DB"];

  // 총합계
  const totalIncome = 256542722109;
  const totalExpenditure = 31010774342;

  // 수입 세부 내역
  const incomeDetails = [
    { category: "후원 회비", amount: 136214954814, detail: "국내, 해외 등 사업 후원 정기 남부 회비" },
    { category: "기부금/물품", amount: 98509489688, detail: "국내, 해외 등 사업 후원 일시 기부금 및 기부물품" },
    { category: "보조금", amount: 9758019234, detail: "자치체 보조금 및 KOICA(한국국제협력단) 등 보조금" },
    { category: "사업수입", amount: 213460855, detail: "프로그램 이용 수입" },
    { category: "기타수입", amount: 2470641487, detail: "수익사업(임대) 수입 및 잡수입(이자 수입 등)" },
    { category: "이월사업비", amount: 9376156031, detail: "2024년 사업 준비비" }
  ];

  // 지출 세부 내역
  const expenditureDetails = [
    { category: "위기가정아동지원", amount: 13629196714, detail: "지역사회 빈곤·위기가정아동 발굴을 통한 사례관리와 주거, 교육비 등 지원" },
    { category: "아동건강지원", amount: 597094790, detail: "저소득가정 위한 제증 아동에 대한 조식 지원, 지역사회 물품 배분 등 지원" },
    { category: "미래성장지원", amount: 7587163620, detail: "미래 사회에 필요한 역량 지원을 위한 희망나눔프로그램, GN창학지원사업, 미래성장 프로그램 등 지원" },
    { category: "지역사회복지지원", amount: 2453722818, detail: "봉사자 및 자원 내 전문가 조직화 등 지역사회 협력 체계 구축을 통한 사업" },
    { category: "사회개발교육사업", amount: 3999101227, detail: "사회개발교육, 세계시민교육 프로그램 연구 개발 및 보급, 실행" }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(true)
      })}
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            사단법인 컴유니티 인더네셔날(외교부 등록)은 국내전문봉사지사업, 국제개발협력사업을 수행하며,<br />
            나눔 문화 확산을 위한 캠페인을 통해 더불어 사는 세상을 만들어가고 있습니다.
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* 통계 정보 */}
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">*국내 : 4개 권역본부, 11개 사업본부, 3개 지부</p>
            <p className="text-lg font-semibold">*해외 : 42개 해외 사업국, 20개 사업장</p>
          </div>

          {/* 파이차트 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 2024 수입 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">2024 수입</h3>
              <div className="h-80">
                <ChartContainer
                  config={{
                    value: { label: "금액" }
                  }}
                >
                  <PieChart>
                    <Pie
                      data={incomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={incomeColors[index % incomeColors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="mt-4 space-y-1 text-sm">
                {incomeData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: incomeColors[index % incomeColors.length] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2024 지출 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">2024 지출</h3>
              <div className="h-80">
                <ChartContainer
                  config={{
                    value: { label: "금액" }
                  }}
                >
                  <PieChart>
                    <Pie
                      data={expenditureData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {expenditureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={expenditureColors[index % expenditureColors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="mt-4 space-y-1 text-sm">
                {expenditureData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: expenditureColors[index % expenditureColors.length] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 수입 세부 테이블 */}
          <div>
            <div className="bg-amber-700 text-white p-3 text-center font-bold text-lg mb-4">
              2024 수입
            </div>
            <div className="text-right text-sm mb-2">(단위:원)</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">구분</TableHead>
                  <TableHead className="text-center">2024년 결산</TableHead>
                  <TableHead className="text-center">세부내용</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">{item.category}</TableCell>
                    <TableCell className="text-center">{item.amount.toLocaleString()}</TableCell>
                    <TableCell>{item.detail}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-blue-50">
                  <TableCell className="font-bold text-center text-blue-600">총계</TableCell>
                  <TableCell className="font-bold text-center text-blue-600">{totalIncome.toLocaleString()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* 지출 세부 테이블 */}
          <div>
            <div className="bg-amber-700 text-white p-3 text-center font-bold text-lg mb-4">
              2024 지출
            </div>
            <div className="text-right text-sm mb-2">(단위:원)</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">구분</TableHead>
                  <TableHead className="text-center">2024년 결산</TableHead>
                  <TableHead className="text-center">세부내용</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenditureDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">{item.category}</TableCell>
                    <TableCell className="text-center">{item.amount.toLocaleString()}</TableCell>
                    <TableCell>{item.detail}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-blue-50">
                  <TableCell className="font-bold text-center text-blue-600">소계</TableCell>
                  <TableCell className="font-bold text-center text-blue-600">{totalExpenditure.toLocaleString()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            *위의 사단법인 컴유니티 인더네셔날 2024년 결산은 현금주의(예산 회계)로 작성한 것으로 재무제표 및 결산서와 상이함.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialReportModal;
