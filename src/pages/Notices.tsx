import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  content: string;
  attachment?: { name: string; url: string };
}

export const notices: Notice[] = [
  {
    id: 1,
    title: "2025년 기부금 모금액 및 활용실적",
    author: "관리자",
    date: "2026-05-13",
    likes: 0,
    content: `25년 기부금 모금액 및 활용실적 명세서입니다.
함께 해주신 모든 후원자 분들께 감사의 말씀을 전합니다.`,
    attachment: {
      name: "기부금품의 모집 및 지출 명세서_사단법인 컴유니티.pdf",
      url: "/notices/기부금품의모집및지출명세서_사단법인_컴유니티.pdf",
    },
  },
];

const Notices = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notices;
    return notices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [search]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "공지사항 - 사단법인 컴유니티",
    description: "사단법인 컴유니티의 공지사항입니다.",
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
        <div className="container mx-auto px-6 max-w-6xl">
          {/* 상단: 타이틀 + 검색 */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              공지사항 <span className="text-primary text-xl">{notices.length}</span>
            </h1>
            <div className="relative w-full sm:w-72">
              <Input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          {/* 표 (데스크톱) */}
          <div className="hidden md:block border-t-2 border-foreground">
            <div className="grid grid-cols-12 px-4 py-3 text-sm font-semibold text-muted-foreground border-b border-border">
              <div className="col-span-1">No</div>
              <div className="col-span-7">제목</div>
              <div className="col-span-2">글쓴이</div>
              <div className="col-span-2">작성날짜</div>
            </div>
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                등록된 공지사항이 없습니다.
              </div>
            ) : (
              filtered.map((n) => (
                <Link
                  key={n.id}
                  to={`/notices/${n.id}`}
                  className="grid grid-cols-12 px-4 py-4 text-sm border-b border-border hover:bg-muted/40 transition-colors"
                >
                  <div className="col-span-1 text-muted-foreground">{n.id}</div>
                  <div className="col-span-7 text-foreground font-medium">{n.title}</div>
                  <div className="col-span-2 text-muted-foreground">{n.author}</div>
                  <div className="col-span-2 text-muted-foreground">{n.date}</div>
                </Link>
              ))
            )}
          </div>

          {/* 모바일 리스트 */}
          <div className="md:hidden border-t-2 border-foreground">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                등록된 공지사항이 없습니다.
              </div>
            ) : (
              filtered.map((n) => (
                <Link
                  key={n.id}
                  to={`/notices/${n.id}`}
                  className="block px-2 py-4 border-b border-border hover:bg-muted/40 transition-colors"
                >
                  <p className="text-foreground font-medium mb-1">{n.title}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{n.author}</span>
                    <span>{n.date}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Notices;
