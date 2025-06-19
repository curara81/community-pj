
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
            { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop', alt: '난민 가족과의 만남' },
            { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop', alt: '한국어 교육 현장' },
            { src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop', alt: '문화적응 프로그램' },
            { src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop', alt: '생활용품 지원' }
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
            * 실제 활동 사진들로 업데이트될 예정입니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoGalleryModal;
