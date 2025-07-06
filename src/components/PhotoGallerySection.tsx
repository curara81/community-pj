
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PhotoGalleryModal from "./PhotoGalleryModal";
import { useLanguage } from "@/contexts/LanguageContext";

const PhotoGallerySection = () => {
  const { t } = useLanguage();
  
  const galleries = [
    {
      title: t("난민 정착 지원", "Refugee Settlement Support"),
      description: t("한국에 거주중인 난민들과\n함께한 따뜻한 순간들", "Warm moments shared with\nrefugees living in Korea"),
      image: "/lovable-uploads/6c7cb959-8222-4e92-baa8-29e03b733f22.png",
      category: "refugee"
    },
    {
      title: t("취약계층 돌봄", "Vulnerable Population Care"),
      description: t("도움이 필요한 취약계층 이웃들과 나눈\n소중한 시간들", "Precious moments shared with\nvulnerable neighbors in need"),
      image: "/lovable-uploads/bc6c631d-7b67-49aa-8492-4eec1abd239c.png",
      category: "care"
    },
    {
      title: t("교육 및 자립 지원", "Education & Independence Support"),
      description: t("새로운 희망을 키워가는\n다음세대의 교육 현장의 모습들", "Educational scenes of the next generation\ngrowing new hope"),
      image: "/lovable-uploads/c86c2b10-f19b-45c7-986a-e69b150e1b85.png",
      category: "education"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📸 <span className="hidden md:inline">{t("함께한 소중한 순간들", "Precious Moments Together")}</span>
            <span className="md:hidden">{t("함께한", "Precious")}<br />{t("소중한 순간들", "Moments Together")}</span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <span className="hidden md:block">{t("아직 시작 단계이지만, 그동안 함께했던 의미있는 활동들을 통해", "Though we're still in the beginning stages, through the meaningful activities we've shared together")} 
            <br />
            {t("우리가 만들어갈 미래를 상상해보세요.", "imagine the future we will create together.")}</span>
            <span className="md:hidden">{t("아직 시작 단계이지만, 그동안 함께했던", "Though we're still in the beginning stages,")}<br />{t("의미있는 활동들을 통해", "through meaningful activities")}<br />{t("우리가 만들어갈 미래를 상상해보세요.", "imagine the future we will create.")}</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleries.map((gallery, index) => (
            <Card 
              key={index} 
              className="hover-lift bg-white shadow-md hover:shadow-xl transition-all duration-300 border-0"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={gallery.image} 
                    alt={gallery.title}
                    width={400}
                    height={192}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {gallery.title}
                  </h3>
                  <p className="text-gray-600 mb-4 whitespace-pre-line">
                    <span className="hidden md:block">{gallery.description.replace('\n', ' ')}</span>
                    <span className="md:hidden">{gallery.description}</span>
                  </p>
                  <PhotoGalleryModal category={gallery.category}>
                    <Button 
                      variant="outline"
                      className="w-full border-amber-500 text-amber-700 hover:bg-amber-50"
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
    </section>
  );
};

export default PhotoGallerySection;
