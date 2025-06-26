
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { incomeDetails, totalIncome } from "@/utils/financialData";

const FinancialIncomeTable = () => {
  return (
    <div>
      <div className="bg-blue-600 text-white p-4 text-center font-bold text-lg mb-4 rounded-t-lg">
        2024년 수입
      </div>
      <div className="text-right text-sm mb-3 text-gray-600">(단위:원)</div>
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="text-center text-blue-800 font-semibold border-b">구분</TableHead>
            <TableHead className="text-center text-blue-800 font-semibold border-b">금액</TableHead>
            <TableHead className="text-center text-blue-800 font-semibold border-b">세부내용</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomeDetails.map((item, index) => (
            <TableRow key={index} className="hover:bg-blue-25">
              <TableCell className="font-medium text-center text-gray-800 border-b">{item.category}</TableCell>
              <TableCell className="text-center text-gray-800 border-b font-mono">{item.amount}</TableCell>
              <TableCell className="text-gray-700 border-b text-sm">{item.detail}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-blue-100">
            <TableCell className="font-bold text-center text-blue-800 border-b">총계</TableCell>
            <TableCell className="font-bold text-center text-blue-800 border-b font-mono">{totalIncome}</TableCell>
            <TableCell className="border-b"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FinancialIncomeTable;
