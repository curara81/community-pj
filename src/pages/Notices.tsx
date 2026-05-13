import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Notices = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "공지사항 - 사단법인 컴유니티",
    "description": "사단법인 컴유니티의 공지사항입니다.",
  };

  return (
    <div className="min-h-screen">
      <SimpleHeader showBanner={false} />
      <SEOHead
        title="공지사항 - 사단법인 컴유니티(Comm-Unity)"
        description="사단법인 컴유니티의 공지사항을 확인하세요."
        keywords="공지사항, 사단법인 컴유니티, 알림"
        canonicalUrl="https://www.comm-unity.or.kr/notices"
        structuredData={structuredData}
      />

      <main className="bg-background py-12 md:py-20 min-h-[60vh]">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 border-b-2 border-primary/30 pb-4">
              공지사항
            </h1>

            <section className="mt-8">
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <p className="text-muted-foreground text-lg">
                  등록된 공지사항이 없습니다.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  새로운 소식이 있을 때 이곳에 게시됩니다.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Notices;
