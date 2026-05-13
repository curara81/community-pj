import { useParams, Link, Navigate } from "react-router-dom";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import { Download, FileText, ChevronLeft } from "lucide-react";
import { notices } from "./Notices";

const NoticeDetail = () => {
  const { id } = useParams();
  const notice = notices.find((n) => String(n.id) === id);

  if (!notice) return <Navigate to="/notices" replace />;

  const attachmentUrl = (() => {
    if (!notice.attachment || typeof window === "undefined") return "";

    const previewToken = new URLSearchParams(window.location.search).get("__lovable_token");
    if (!previewToken) return notice.attachment.url;

    const url = new URL(notice.attachment.url, window.location.origin);
    url.searchParams.set("__lovable_token", previewToken);
    return `${url.pathname}${url.search}${url.hash}`;
  })();

  return (
    <div className="min-h-screen">
      <SimpleHeader showBanner={false} />
      <SEOHead
        title={`${notice.title} - 사단법인 컴유니티`}
        description={notice.content.slice(0, 150)}
        canonicalUrl={`https://www.comm-unity.or.kr/notices/${notice.id}`}
      />

      <main className="bg-background py-12 md:py-20 min-h-[60vh]">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            to="/notices"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft size={16} /> 목록으로
          </Link>

          <article className="border-t-2 border-foreground">
            <header className="py-6 border-b border-border">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {notice.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>글쓴이: {notice.author}</span>
                <span>작성날짜: {notice.date}</span>
              </div>
            </header>

            <div className="py-8 text-foreground leading-relaxed whitespace-pre-line">
              {notice.content}
            </div>

            {notice.attachment && (
              <div className="border-t border-border pt-6 pb-8">
                <p className="text-sm font-semibold text-foreground mb-3">첨부파일</p>
                <a
                  href={attachmentUrl}
                  download={notice.attachment.downloadName ?? notice.attachment.name}
                  type="application/pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted/40 border border-border rounded-md hover:bg-accent transition-colors text-sm"
                >
                  <FileText size={16} className="text-primary" />
                  <span className="text-foreground">{notice.attachment.name}</span>
                  <Download size={16} className="text-muted-foreground" />
                </a>
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NoticeDetail;
