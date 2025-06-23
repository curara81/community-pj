
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { expenditureDetails, totalExpenditure } from "@/utils/financialData";

const FinancialExpenditureTable = () => {
  return (
    <div>
      <div className="bg-green-600 text-white p-4 text-center font-bold text-lg mb-4 rounded-t-lg">
        2024 지출
      </div>
      <div className="text-right text-sm mb-3 text-gray-600">(단위:원)</div>
      <Table>
        <TableHeader>
          <TableRow className="bg-green-50">
            <TableHead className="text-center text-green-800 font-semibold border-b">구분</TableHead>
            <TableHead className="text-center text-green-800 font-semibold border-b">2024년 결산</TableHead>
            <TableHead className="text-center text-green-800 font-semibold border-b">세부내용 및 주요 활동 예시</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenditureDetails.map((item, index) => (
            <TableRow key={index} className="hover:bg-green-25">
              <TableCell className="font-medium text-center text-gray-800 border-b">{item.category}</TableCell>
              <TableCell className="text-center text-gray-800 border-b font-mono">{item.amount.toLocaleString()}</TableCell>
              <TableCell className="text-gray-700 border-b text-sm">{item.detail}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-green-100">
            <TableCell className="font-bold text-center text-green-800 border-b">소계</TableCell>
            <TableCell className="font-bold text-center text-green-800 border-b font-mono">{totalExpenditure.toLocaleString()}</TableCell>
            <TableCell className="border-b"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FinancialExpenditureTable;
