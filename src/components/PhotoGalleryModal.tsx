
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PhotoGalleryModalProps {
  children: React.ReactNode;
  category: string;
}

const PhotoGalleryModal = ({ children, category }: PhotoGalleryModalProps) => {
  const getGalleryData = (cat: string) => {
    switch (cat) {
      case 'refugee':
        return {
          title: '🏠 난민 정착 지원 활동',
          photos: [
            { src: '/lovable-uploads/6c7cb959-8222-4e92-baa8-29e03b733f22.png', alt: '난민 가족들과 함께한 체육 활동' },
            { src: '/lovable-uploads/ba281f05-fcd1-489e-85ee-b1e611646af5.png', alt: '아이들과 함께하는 축구 시간' },
            { src: '/lovable-uploads/0e8ad49c-5e2a-419b-bd12-c2aeb5d3b337.png', alt: '한국어 교육 및 학습 지원' },
            { src: '/lovable-uploads/3c36539a-1308-456a-b8aa-e4dfc3fc190d.png', alt: '수학 교육 프로그램' },
            { src: '/lovable-uploads/8c3fcc5b-6337-4184-b0d0-60095b851ba1.png', alt: '개별 학습 지도' },
            { src: '/lovable-uploads/e434365c-8e31-439c-bc89-081f5d107fea.png', alt: '생일파티 및 문화 교류' },
            { src: '/lovable-uploads/2413879a-9d4d-4ff9-ae09-106e6d42996a.png', alt: '크리스마스 선물 나눔' },
            { src: '/lovable-uploads/8315089d-a0b2-478b-9596-7ea3be4f933c.png', alt: '숙소 방문 및 생활 지원' },
            { src: '/lovable-uploads/dc46daf3-d1bc-4415-9e5f-4b01d374429a.png', alt: '생필품 전달 및 상담' },
            { src: '/lovable-uploads/86c70a35-0487-4161-8b97-b9f3042f47ab.png', alt: '야외 활동 및 체육 지도' }
          ]
        };
      case 'care':
        return {
          title: '🤲 취약계층 돌봄 활동',
          photos: [
            { src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop', alt: '어르신 돌봄 서비스' },
            { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop', alt: '장애인 지원 활동' },
            { src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop', alt: '생활 지원' },
            { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop', alt: '정서적 지원' }
          ]
        };
      case 'education':
        return {
          title: '📚 교육 및 자립 지원 활동',
          photos: [
            { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop', alt: '직업 교육 현장' },
            { src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop', alt: '생활 교육' },
            { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop', alt: '멘토링 프로그램' },
            { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop', alt: '자립 지원' }
          ]
        };
      default:
        return { title: '', photos: [] };
    }
  };

  const galleryData = getGalleryData(category);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-stone-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-stone-800">
            {galleryData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4">
          {galleryData.photos.map((photo, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-stone-100 p-4 rounded-lg border border-stone-200 mt-4">
          <p className="text-sm text-stone-800 text-center">
            * 컴유니티의 실제 활동 사진들입니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoGalleryModal;
