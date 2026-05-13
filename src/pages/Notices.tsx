import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const notices = [
  {
    id: 1,
    title: "2025년 기부금 모금액 및 활용실적",
    date: "2025-12-31",
    content: `25년 기부금 모금액 및 활용실적 명세서입니다.

올 한 해도 함께 해주신 모든 후원자 분들께 감사의 말씀을 전합니다.`,
    attachment: {
      name: "기부금품의 모집 및 지출 명세서_사단법인 컴유니티.pdf",
      url: "/notices/기부금품의모집및지출명세서_사단법인_컴유니티.pdf",
    },
  },
];

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

            <section className="mt-8 space-y-6">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-muted/40 border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      {notice.title}
                    </h2>
                    <span className="text-sm text-muted-foreground">{notice.date}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-5">
                    {notice.content}
                  </p>
                  {notice.attachment && (
                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground mb-2">첨부파일</p>
                      <a
                        href={notice.attachment.url}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-md hover:bg-accent transition-colors text-sm"
                      >
                        <FileText size={16} className="text-primary" />
                        <span className="text-foreground">{notice.attachment.name}</span>
                        <Download size={16} className="text-muted-foreground" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
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
