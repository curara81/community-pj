
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Location = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "찾아오시는 길 - 사단법인 컴유니티",
    "description": "사단법인 컴유니티 오시는 길 안내입니다.",
  };

  const handleNaverMapClick = () => {
    window.open('https://naver.me/FgTe9esV', '_blank');
  };

  return (
    <div className="min-h-screen">
      <SimpleHeader showBanner={false} />
      <SEOHead
        title="찾아오시는 길 - 사단법인 컴유니티(Comm-Unity)"
        description="사단법인 컴유니티 오시는 길 안내입니다. 서울특별시 서초구 서초대로27길 15 3층."
        keywords="찾아오시는 길, 오시는 길, 사단법인 컴유니티, 위치"
        canonicalUrl="https://www.comm-unity.or.kr/location"
        structuredData={structuredData}
      />
      
      <main className="bg-background py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 border-b-2 border-primary/30 pb-4">
              찾아오시는 길
            </h1>

            <section className="mb-10 mt-8">
              <div className="bg-muted/50 p-6 rounded-lg mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">사단법인 컴유니티</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">서울특별시 서초구 서초대로27길 15 3층</p>
                <p className="text-muted-foreground">전화: 070-4667-2733</p>
              </div>

              <Button 
                onClick={handleNaverMapClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white mb-8"
                size="lg"
              >
                <ExternalLink className="mr-2" size={20} />
                네이버 지도에서 위치 확인하기
              </Button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">🚇 지하철 이용시</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>7호선 내방역 하차</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">🚌 버스 이용시</h3>
                  <p className="text-muted-foreground">내방역, 방배열린문화센터.가야치과병원 하차</p>
                </div>
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

export default Location;
