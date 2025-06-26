
// 2024년 수입 데이터
export const incomeData = [
  { name: "후원 회비", value: 35, percentage: "35%" },
  { name: "기부금/물품", value: 25, percentage: "25%" },
  { name: "운영비", value: 15, percentage: "15%" },
  { name: "보조금", value: 10, percentage: "10%" },
  { name: "기타수입", value: 8, percentage: "8%" },
  { name: "이월사업비", value: 4, percentage: "4%" },
  { name: "사업수입", value: 2, percentage: "2%" },
  { name: "기타 사업", value: 1, percentage: "1%" }
];

// 2024년 지출 데이터
export const expenditureData = [
  { name: "사업비", value: 70, percentage: "70%" },
  { name: "운영비", value: 25, percentage: "25%" },
  { name: "기타 사업", value: 5, percentage: "5%" }
];

// 파이차트 색상
export const incomeColors = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#F97316", "#06B6D4", "#84CC16"];
export const expenditureColors = ["#6B7280", "#9CA3AF", "#D1D5DB"];

// 총합계
export const totalIncome = "-";
export const totalExpenditure = "-";

// 수입 세부 내역
export const incomeDetails = [
  { category: "후원회비", amount: "-", detail: "사업 후원 정기 남부 회비" },
  { category: "기부금/물품", amount: "-", detail: "사업 후원 일시 기부금 및 기부물품" },
  { category: "보조금", amount: "-", detail: "자치체 보조금" },
  { category: "기타수입", amount: "-", detail: "" },
  { category: "이월사업비", amount: "-", detail: "2024년 사업 준비비" }
];

// 지출 세부 내역
export const expenditureDetails = [
  { category: "난민 정착 지원 사업", amount: "-", detail: "임시 주거 지원, 한국어·문화적응 교육, 취업 연계, 법률상담, 자녀교육 등" },
  { category: "취약계층 돌봄 사업", amount: "-", detail: "재가 방문 돌봄, 정서지원, 생활편의, 간병관리, 사회활동 지원" },
  { category: "교육 및 자립 지원 사업", amount: "-", detail: "직업기술교육, 금융·디지털 교육, 창업·멘토링, 장학금 등" },
  { category: "모금관리비", amount: "-", detail: "모금기획, 모금행사, 관련 운영 관리비" },
  { category: "회원관리비", amount: "-", detail: "후원회원 대상 우편 발송, 시스템 유지 관리비" },
  { category: "일반관리비", amount: "-", detail: "연수·인력사업, 행정사무국 운영사업" },
  { category: "기타사업", amount: "-", detail: "" }
];
