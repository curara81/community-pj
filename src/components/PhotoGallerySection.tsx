import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PhotoGalleryModal from "./PhotoGalleryModal";
import { useLanguage } from "@/contexts/LanguageContext";

const PhotoGallerySection = () => {
  const { t } = useLanguage();
  
  const galleries = [
    {
      title: t("다문화 가정 정착 지원", "Multicultural Family Settlement Support"),
      caption: t("다문화 가정과 함께한 따뜻한 순간", "Warm moments with multicultural families"),
      image: "/lovable-uploads/6c7cb959-8222-4e92-baa8-29e03b733f22.png",
      category: "refugee"
    },
    {
      title: t("취약계층 돌봄", "Vulnerable Population Care"),
      caption: t("이웃과 나눈 소중한 시간", "Precious time shared with neighbors"),
      image: "/lovable-uploads/bc6c631d-7b67-49aa-8492-4eec1abd239c.png",
      category: "care"
    },
    {
      title: t("교육 및 자립 지원", "Education & Independence Support"),
      caption: t("희망을 키워가는 교육 현장", "Education scenes growing hope"),
      image: "/lovable-uploads/c86c2b10-f19b-45c7-986a-e69b150e1b85.png",
      category: "education"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
              📷 {t("함께한 소중한 순간들", "Precious Moments Together")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
              {t("아직 시작 단계이지만, 그동안 함께했던 의미있는 활동들을 통해 우리가 만들어갈 미래를 상상해보세요.", "Though we're still in the beginning stages, through the meaningful activities we've shared together, imagine the future we will create.")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {galleries.map((gallery, index) => (
              <Card 
                key={index} 
                className="bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="overflow-hidden">
                    <img 
                      src={gallery.image} 
                      alt={gallery.title}
                      width={400}
                      height={220}
                      loading="lazy"
                      className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-foreground mb-1">
                      {gallery.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light mb-4">
                      {gallery.caption}
                    </p>
                    <PhotoGalleryModal category={gallery.category}>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="w-full text-sm border-muted-foreground/30 text-muted-foreground hover:text-foreground"
                      >
                        {t("사진 더보기", "View More Photos")}
                      </Button>
                    </PhotoGalleryModal>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
