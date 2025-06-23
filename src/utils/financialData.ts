
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
  { category: "후원 회비", amount: 136214954814, detail: "국내, 해외 등 사업 후원 정기 남부 회비" },
  { category: "기부금/물품", amount: 98509489688, detail: "국내, 해외 등 사업 후원 일시 기부금 및 기부물품" },
  { category: "보조금", amount: 9758019234, detail: "자치체 보조금 및 KOICA(한국국제협력단) 등 보조금" },
  { category: "사업수입", amount: 213460855, detail: "프로그램 이용 수입" },
  { category: "기타수입", amount: 2470641487, detail: "수익사업(임대) 수입 및 잡수입(이자 수입 등)" },
  { category: "이월사업비", amount: 9376156031, detail: "2024년 사업 준비비" }
];

// 지출 세부 내역
export const expenditureDetails = [
  { category: "위기가정아동지원", amount: 13629196714, detail: "지역사회 빈곤·위기가정아동 발굴을 통한 사례관리와 주거, 교육비 등 지원" },
  { category: "아동건강지원", amount: 597094790, detail: "저소득가정 위한 제증 아동에 대한 조식 지원, 지역사회 물품 배분 등 지원" },
  { category: "미래성장지원", amount: 7587163620, detail: "미래 사회에 필요한 역량 지원을 위한 희망나눔프로그램, GN창학지원사업, 미래성장 프로그램 등 지원" },
  { category: "지역사회복지지원", amount: 2453722818, detail: "봉사자 및 자원 내 전문가 조직화 등 지역사회 협력 체계 구축을 통한 사업" },
  { category: "사회개발교육사업", amount: 3999101227, detail: "사회개발교육, 세계시민교육 프로그램 연구 개발 및 보급, 실행" }
];
