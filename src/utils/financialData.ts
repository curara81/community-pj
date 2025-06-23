
// 2024년 수입 데이터
export const incomeData = [
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
export const expenditureData = [
  { name: "사업비", value: 227509813409, percentage: 89.5 },
  { name: "운영비", value: 26205268300, percentage: 10.2 },
  { name: "기타 사업", value: 778052832, percentage: 0.3 }
];

// 파이차트 색상
export const incomeColors = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#F97316", "#06B6D4", "#84CC16"];
export const expenditureColors = ["#6B7280", "#9CA3AF", "#D1D5DB"];

// 총합계
export const totalIncome = 256542722109;
export const totalExpenditure = 31010774342;

// 수입 세부 내역
export const incomeDetails = [
  { category: "후원회비", amount: 136214954814, detail: "국내·해외 사업 후원 정기 남부 회비" },
  { category: "기부금/물품", amount: 98509489688, detail: "국내·해외 사업 후원 일시 기부금 및 기부물품" },
  { category: "보조금", amount: 9758019234, detail: "자치체 보조금" },
  { category: "기타수입", amount: 2470641487, detail: "수익사업(굿즈) 수입 및 잡수입(이자 수입 등)" },
  { category: "이월사업비", amount: 9376156031, detail: "2024년 사업 준비비" }
];

// 지출 세부 내역
export const expenditureDetails = [
  { category: "난민 정착 지원 사업", amount: 13629196714, detail: "임시 주거 지원, 한국어·문화적응 교육, 취업 연계, 법률상담, 자녀교육 등" },
  { category: "취약계층 돌봄 사업", amount: 7587163620, detail: "재가 방문 돌봄, 정서지원, 생활편의, 간병관리, 사회활동 지원" },
  { category: "교육 및 자립 지원 사업", amount: 3999101227, detail: "직업기술교육, 금융·디지털 교육, 창업·멘토링, 장학금 등" },
  { category: "모금관리비", amount: 2453722818, detail: "모금기획, 모금행사, 관련 운영 관리비" },
  { category: "회원관리비", amount: 597094790, detail: "후원회원 대상 우편 발송, 시스템 유지 관리비" },
  { category: "일반관리비", amount: 1966642341, detail: "연수·인력사업, 행정사무국 운영사업" },
  { category: "기타사업", amount: 778052832, detail: "수익사업(임대) 및 기타 잡지출 등" }
];
