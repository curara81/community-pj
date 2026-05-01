// 참고: 네이버 검색 API는 브라우저 직접 호출 시 CORS로 막힙니다.
// 본 함수는 향후 프록시(Supabase Edge Function 등) 연결을 위한 자리표시자입니다.
// 현재 버전은 AI 응답에 포함된 한국 유통사 정보로 충분히 동작하며,
// 추가 검색이 필요할 때 이 함수를 확장하세요.

export interface NaverSearchItem {
  title: string;
  link: string;
  description: string;
}

export async function searchNaver(
  _query: string,
  _clientId?: string,
  _clientSecret?: string
): Promise<NaverSearchItem[]> {
  return [];
}
