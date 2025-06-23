
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { expenditureDetails, totalExpenditure } from "@/utils/financialData";

const FinancialExpenditureTable = () => {
  return (
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
  );
};

export default FinancialExpenditureTable;
