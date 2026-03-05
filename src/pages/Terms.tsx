
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "이용약관 - 사단법인 컴유니티",
    "description": "사단법인 컴유니티 홈페이지 이용약관입니다.",
  };

  return (
    <div className="min-h-screen">
      <SimpleHeader showBanner={false} />
      <SEOHead
        title="이용약관 - 사단법인 컴유니티(Comm-Unity)"
        description="사단법인 컴유니티 홈페이지 이용약관입니다. 서비스 이용에 관한 권리, 의무 및 책임사항을 안내합니다."
        keywords="이용약관, 사단법인 컴유니티, 서비스 이용규정"
        canonicalUrl="https://www.comm-unity.or.kr/terms"
        structuredData={structuredData}
      />
      
      <main className="bg-background py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 border-b-2 border-primary/30 pb-4">
              이용약관
            </h1>

            {/* 제1조 */}
            <section className="mb-10 mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제1조 (목적)</h2>
              <p className="text-muted-foreground leading-relaxed">
                이 약관은 사단법인 컴유니티(이하 "컴유니티")가 운영하는 홈페이지(https://www.comm-unity.or.kr, 이하 "홈페이지")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 컴유니티와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            {/* 제2조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제2조 (정의)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>"홈페이지"란 컴유니티가 서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장을 말하며, 아울러 홈페이지를 운영하는 사업자의 의미로도 사용합니다.</li>
                <li>"이용자"란 홈페이지에 접속하여 이 약관에 따라 컴유니티가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>"회원"이란 홈페이지에 개인정보를 제공하여 회원등록을 한 자로서, 홈페이지의 정보를 지속적으로 제공받으며, 홈페이지가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                <li>"비회원"이란 회원에 가입하지 않고 홈페이지가 제공하는 서비스를 이용하는 자를 말합니다.</li>
              </ol>
            </section>

            {/* 제3조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제3조 (약관의 명시와 개정)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>컴유니티는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 홈페이지의 초기 서비스 화면에 게시합니다.</li>
                <li>컴유니티는 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                <li>컴유니티가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 홈페이지의 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</li>
                <li>이용자가 개정된 약관에 동의하지 않는 경우 이용자는 회원탈퇴(해지)를 요청할 수 있으며, 개정된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우 약관의 변경사항에 동의한 것으로 간주됩니다.</li>
              </ol>
            </section>

            {/* 제4조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제4조 (서비스의 제공 및 변경)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>
                  컴유니티는 다음과 같은 서비스를 제공합니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>컴유니티 활동 및 사업 소개</li>
                    <li>후원 및 기부 서비스</li>
                    <li>자원봉사 신청 및 안내</li>
                    <li>뉴스레터 및 소식 제공</li>
                    <li>갤러리 및 활동보고</li>
                    <li>기타 컴유니티가 정하는 서비스</li>
                  </ul>
                </li>
                <li>컴유니티는 서비스의 내용을 변경하는 경우 그 변경 내용을 홈페이지에 게시합니다.</li>
              </ol>
            </section>

            {/* 제5조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제5조 (서비스의 중단)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>컴유니티는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                <li>제1항에 의한 서비스 중단의 경우에는 홈페이지에 사전 통지합니다. 다만, 컴유니티가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.</li>
              </ol>
            </section>

            {/* 제6조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제6조 (회원가입)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>이용자는 컴유니티가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</li>
                <li>
                  컴유니티는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>기타 회원으로 등록하는 것이 컴유니티의 운영에 현저히 지장을 초래하는 것으로 인정되는 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* 제7조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제7조 (회원 탈퇴 및 자격 상실 등)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>회원은 컴유니티에 언제든지 탈퇴를 요청할 수 있으며 컴유니티는 즉시 회원탈퇴를 처리합니다.</li>
                <li>
                  회원이 다음 각 호의 사유에 해당하는 경우, 컴유니티는 회원자격을 제한 및 정지시킬 수 있습니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                    <li>다른 사람의 홈페이지 이용을 방해하거나 그 정보를 도용하는 등 질서를 위협하는 경우</li>
                    <li>홈페이지를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* 제8조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제8조 (이용자의 의무)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">이용자는 다음 행위를 하여서는 안 됩니다.</p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>홈페이지에 게시된 정보의 변경</li>
                <li>컴유니티가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>컴유니티 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>컴유니티 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 홈페이지에 공개 또는 게시하는 행위</li>
              </ol>
            </section>

            {/* 제9조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제9조 (저작권의 귀속 및 이용제한)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>홈페이지가 작성한 저작물에 대한 저작권 기타 지적재산권은 컴유니티에 귀속합니다.</li>
                <li>이용자는 홈페이지를 이용함으로써 얻은 정보를 컴유니티의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
              </ol>
            </section>

            {/* 제10조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제10조 (분쟁해결)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>컴유니티는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
                <li>컴유니티는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보합니다.</li>
              </ol>
            </section>

            {/* 제11조 */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">제11조 (재판권 및 준거법)</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>컴유니티와 이용자 간에 발생한 분쟁에 관한 소송은 서울중앙지방법원을 관할 법원으로 합니다.</li>
                <li>컴유니티와 이용자 간에 제기된 소송에는 대한민국법을 적용합니다.</li>
              </ol>
            </section>

            {/* 부칙 */}
            <section className="border-t border-border pt-6">
              <h2 className="text-xl font-bold text-foreground mb-2">부칙</h2>
              <p className="text-muted-foreground">
                이 약관은 2025년 3월 5일부터 시행됩니다.
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

export default Terms;
