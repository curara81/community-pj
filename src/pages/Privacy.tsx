
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Privacy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "개인정보처리방침 - 사단법인 컴유니티",
    "description": "사단법인 컴유니티의 개인정보처리방침입니다.",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="개인정보처리방침 - 사단법인 컴유니티(Comm-Unity)"
        description="사단법인 컴유니티의 개인정보처리방침입니다. 개인정보의 수집, 이용, 보유, 파기 등에 관한 사항을 안내합니다."
        keywords="개인정보처리방침, 개인정보보호, 사단법인 컴유니티, 프라이버시"
        canonicalUrl="https://www.comm-unity.or.kr/privacy"
        structuredData={structuredData}
      />
      <SimpleHeader />
      <main className="bg-background py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 border-b-2 border-primary/30 pb-4">
              개인정보처리방침
            </h1>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-8">
              사단법인 컴유니티(이하 "컴유니티")는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              컴유니티는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
            </p>

            {/* 1조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">1. 수집하는 개인정보 항목</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 후원, 자원봉사, 상담 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">수집항목</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
                <li>성명, 주민등록번호, 로그인ID, 비밀번호, 전화번호, 주소, 이메일, 직업, 회사명, 부서, 직책, 회사전화번호, 가입동기</li>
                <li>서비스 이용 과정에서 자동 생성·수집되는 정보: 접속 로그기록, 서비스 이용기록</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mb-2">수집방법</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>홈페이지(회원가입, 상담문의), 서면신청서, 전화상담</li>
              </ul>
            </section>

            {/* 2조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">2. 개인정보의 수집 및 이용목적</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">기부금 관리</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
                <li>기부금 출금 및 기부금영수증 발행</li>
                <li>기부 내역 관리</li>
                <li>기부금사용 보고 및 행사참여 안내</li>
                <li>회원공지, 뉴스레터, 콘텐츠 제공</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mb-2">회원 관리</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
                <li>본인 확인 및 식별</li>
                <li>기부 등 참여내역 및 회원정보 관리</li>
                <li>가입 및 탈퇴 의사 확인</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mb-2">활동 분석 및 서비스 개선</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>기부문화 활성화를 위한 성향 분석 및 통계</li>
                <li>접속 빈도 파악을 통한 서비스 개선</li>
              </ul>
            </section>

            {/* 3조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                원칙적으로 개인정보의 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>보존 항목: 기부결제정보</li>
                <li>보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                <li>보존 기간: 5년 (기부금영수증 발행 관련)</li>
              </ul>
            </section>

            {/* 4조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">4. 개인정보의 파기절차 및 방법</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 원칙적으로 개인정보의 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">파기절차</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
                <li>회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
                <li>별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유 이외의 다른 목적으로 이용되지 않습니다.</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mb-2">파기방법</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
              </ul>
            </section>

            {/* 5조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">5. 개인정보 제공</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                <li>안전행정부 및 소속청 소관 비영리법인의 감독에 관한 규칙(민법 제37조에 따른 검사·감독)</li>
                <li>결산 관련 서류(공익법인의 설립·운영에 관한 법률 제12조)</li>
                <li>외부회계감사 의무(공익법인의 설립·운영에 관한 법률 제4조)</li>
                <li>결산서류 공시 의무(공익법인의 설립·운영에 관한 법률 제4조의2)</li>
                <li>기부금영수증 발급내역 작성·보관 의무 및 제출 의무(소득세법 제160조의3 제2항, 법인세법 제112조의2 제2항)</li>
              </ul>
            </section>

            {/* 6조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">6. 수집한 개인정보의 위탁</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
              </p>

              <div className="bg-muted/50 rounded-lg p-5 mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">회원서비스 위탁</h3>
                <p className="text-muted-foreground mb-1"><strong>개인정보를 제공받는 자:</strong> (주)휴먼소프트웨어</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>제공받는 자의 개인정보 이용목적: 회원DB관리 및 기부금 결제정보 관리 / 문자 및 이메일 발송</li>
                  <li>제공하는 개인정보 항목: 회원정보, 기부금 결제정보</li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-5 mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">기부결제 승인·정산 위탁</h3>
                <p className="text-muted-foreground mb-1"><strong>개인정보를 제공받는 자:</strong> 금융결제원</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-3">
                  <li>제공받는 자의 개인정보 이용목적: CMS 방식의 기부결제 승인·정산</li>
                  <li>제공하는 개인정보 항목: 은행명, 계좌번호, 이름, 주민등록번호, 후원금액</li>
                </ul>
                <p className="text-muted-foreground mb-1"><strong>개인정보를 제공받는 자:</strong> (주)나이스페이</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>제공받는 자의 개인정보 이용목적: 신용카드/휴대폰 방식의 기부결제 승인·정산</li>
                  <li>제공하는 개인정보 항목: 카드명, 카드번호, 휴대전화번호</li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">기부금영수증·연간보고서 발송 위탁</h3>
                <p className="text-muted-foreground mb-1"><strong>개인정보를 제공받는 자:</strong> 우체국</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>제공받는 자의 개인정보 이용목적: 대량 우편물 발송</li>
                  <li>제공하는 개인정보 항목: 성명, 주소</li>
                </ul>
              </div>
            </section>

            {/* 7조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">7. 이용자 및 법정대리인의 권리와 그 행사방법</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 또는 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수 있습니다.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>이용자의 개인정보 조회·수정을 위해서는 '개인정보변경'(또는 '회원정보수정' 등)을 통해 본인 확인 절차를 거쳐 직접 열람, 정정, 또는 탈퇴가 가능합니다.</li>
                <li>혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</li>
                <li>이용자가 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.</li>
                <li>컴유니티는 이용자 또는 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "3. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</li>
              </ul>
            </section>

            {/* 8조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">8. 개인정보 자동수집 장치의 설치·운영 및 그 거부에 관한 사항</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 이용자들의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)' 등을 운용합니다.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">쿠키 사용 목적</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
                <li>회원과 비회원의 접속 빈도나 방문 시간 등을 분석</li>
                <li>이용자의 취향과 관심분야를 파악하여 서비스 개선</li>
                <li>각종 이벤트 참여 정도 및 방문 회수 파악</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mb-2">쿠키의 설치·운영 및 거부</h3>
              <p className="text-muted-foreground leading-relaxed">
                이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
              </p>
            </section>

            {/* 9조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">9. 개인정보에 관한 민원서비스</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                컴유니티는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보관리책임자를 지정하고 있습니다.
              </p>

              <div className="bg-muted/50 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">개인정보관리책임자</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>성명: 심서윤</li>
                  <li>소속 및 직위: 컴유니티 매니저</li>
                  <li>전화번호: 070-4667-2733</li>
                  <li>이메일: comm@comm-unity.or.kr</li>
                </ul>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                귀하께서는 컴유니티의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자에게 신고하실 수 있습니다. 컴유니티는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>개인정보침해신고센터 (www.1336.or.kr / 118)</li>
                <li>정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)</li>
                <li>대검찰청 인터넷범죄수사센터 (icic.sppo.go.kr / 02-3480-3600)</li>
                <li>경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)</li>
              </ul>
            </section>

            {/* 부칙 */}
            <section className="border-t border-border pt-6">
              <h2 className="text-xl font-bold text-foreground mb-2">부칙</h2>
              <p className="text-muted-foreground">
                이 개인정보처리방침은 2025년 3월 5일부터 시행됩니다.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Privacy;
