
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PhotoGalleryModal from "./PhotoGalleryModal";

const PhotoGallerySection = () => {
  const galleries = [
    {
      title: "난민 정착 지원",
      description: "한국에 거주중인 난민들과 함께한 따뜻한 순간들",
      image: "/lovable-uploads/6c7cb959-8222-4e92-baa8-29e03b733f22.png",
      category: "refugee"
    },
    {
      title: "취약계층 돌봄",
      description: "도움이 필요한 취약계층 이웃들과 나눈 소중한 시간들",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
      category: "care"
    },
    {
      title: "교육 및 자립 지원",
      description: "새로운 희망을 키워가는 다음세대의 교육 현장의 모습들",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      category: "education"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📸 함께한 소중한 순간들
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            아직 시작 단계이지만, 그동안 함께했던 의미있는 활동들을 통해 
            <br />
            우리가 만들어갈 미래를 상상해보세요.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleries.map((gallery, index) => (
            <Card 
              key={index} 
              className="hover-lift bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={gallery.image} 
                    alt={gallery.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {gallery.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {gallery.description}
                  </p>
                  <PhotoGalleryModal category={gallery.category}>
                    <Button 
                      variant="outline"
                      className="w-full border-amber-500 text-amber-700 hover:bg-amber-50"
                    >
                      사진 더보기
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
