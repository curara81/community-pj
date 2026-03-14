
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Copyright = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "저작권정책 - 사단법인 컴유니티",
    "description": "사단법인 컴유니티의 저작권정책입니다.",
  };

  return (
    <div className="min-h-screen">
      <SimpleHeader showBanner={false} />
      <SEOHead
        title="저작권정책 - 사단법인 컴유니티(Comm-Unity)"
        description="사단법인 컴유니티의 저작권정책입니다. 웹사이트 콘텐츠의 저작권 보호에 관한 사항을 안내합니다."
        keywords="저작권정책, 저작권, 사단법인 컴유니티"
        canonicalUrl="https://www.comm-unity.or.kr/copyright"
        structuredData={structuredData}
      />
      
      <main className="bg-background py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 border-b-2 border-primary/30 pb-4">
              저작권정책
            </h1>

            <div className="space-y-6 mt-8">
              <section className="mb-10">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  사단법인 컴유니티(이하 컴유니티) 웹사이트에서 제공하는 모든 콘텐츠, 즉 웹문서, 첨부파일, DB정보 등은 저작권법에 의하여 보호받는 저작물로써, 별도의 저작권 표시 또는 다른 출처를 명시한 경우를 제외하고는 원칙적으로 컴유니티에 저작권이 있습니다.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  따라서 웹사이트에서 제공하는 콘텐츠를 무단 복제, 배포하는 경우에는 「저작권법」 제136조에 의한 저작재산권 침해죄에 해당함을 유념하시기 바랍니다.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  웹사이트에서 제공하는 콘텐츠로 수익을 얻거나 이에 상응하는 혜택을 누리고자 하는 경우에는 컴유니티와 사전에 별도의 협의를 하거나 허락을 득하여야 하며, 협의 또는 허락을 얻어 자료의 내용을 게재하는 경우에도 출처가 컴유니티임을 반드시 명시하여야 합니다.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  컴유니티의 콘텐츠를 적법한 절차에 따라 다른 인터넷 사이트에 게재하는 경우에도 단순한 오류 정정 이외에 내용의 무단변경을 금지하며, 이를 위반할 때에는 형사 처분을 받을 수 있습니다.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  다른 인터넷 사이트에서 컴유니티 홈페이지로 링크하는 경우에도 링크 사실을 컴유니티에 통지하여야 합니다.
                </p>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Copyright;
