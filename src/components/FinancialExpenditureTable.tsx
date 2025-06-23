
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { expenditureDetails, totalExpenditure } from "@/utils/financialData";

const FinancialExpenditureTable = () => {
  return (
    <div>
      <div className="bg-amber-700 text-white p-3 text-center font-bold text-lg mb-4">
        2024 지출
      </div>
      <div className="text-right text-sm mb-2 text-slate-600">(단위:원)</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-slate-700 font-semibold">구분</TableHead>
            <TableHead className="text-center text-slate-700 font-semibold">2024년 결산</TableHead>
            <TableHead className="text-center text-slate-700 font-semibold">세부내용 및 주요 활동 예시</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenditureDetails.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center text-slate-700">{item.category}</TableCell>
              <TableCell className="text-center text-slate-700">{item.amount.toLocaleString()}</TableCell>
              <TableCell className="text-slate-600">{item.detail}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-blue-50">
            <TableCell className="font-bold text-center text-blue-700">소계</TableCell>
            <TableCell className="font-bold text-center text-blue-700">{totalExpenditure.toLocaleString()}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FinancialExpenditureTable;
