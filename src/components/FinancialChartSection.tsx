
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { incomeData, expenditureData, incomeColors, expenditureColors } from "@/utils/financialData";

const CustomTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white border rounded-lg shadow-lg p-2">
        <p className="font-medium">{data.name}</p>
        <p className="text-blue-600">금액: -</p>
      </div>
    );
  }
  return null;
};

const FinancialChartSection = () => {
  return (
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
                content={<CustomTooltipContent />}
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
              <span className="font-semibold">-%</span>
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
                content={<CustomTooltipContent />}
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
              <span className="font-semibold">-%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialChartSection;
