
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
            { src: '/lovable-uploads/bc6c631d-7b67-49aa-8492-4eec1abd239c.png', alt: '취약계층 연탄 나눔' },
            { src: '/lovable-uploads/f052105c-77b6-4fe0-b81b-e5e40dcc038f.png', alt: '취약계층 연탄 나눔' },
            { src: '/lovable-uploads/97c8f0c7-4e36-4617-b48f-b980c27d1cf4.png', alt: '어르신 식사 지원' },
            { src: '/lovable-uploads/4ac0706c-155b-40db-8ad1-a60f2ceebae1.png', alt: '생필품 전달 및 나눔' },
            { src: '/lovable-uploads/b66ec126-f790-449b-854a-e7fc31a5db96.png', alt: '취약계층 연탄 나눔' },
            { src: '/lovable-uploads/420703c5-510f-4bc3-ae30-ee1e49dd6086.png', alt: '어르신들과의 레크리에이션' },
            { src: '/lovable-uploads/e74317dd-114a-4e80-8393-577f58f50bb9.png', alt: '명절 조이박스 나눔' },
            { src: '/lovable-uploads/0e1f6939-95ba-4ea3-b2d7-ba2242d6148f.png', alt: '취약계층 아동 돌봄' },
            { src: '/lovable-uploads/e2acd34b-8e18-4e5a-a655-17fd4ffdf8db.png', alt: '취약계층 생필품 나눔' },
            { src: '/lovable-uploads/34cd007b-6574-4508-a331-8750997db9d1.png', alt: '취약계층 어르신 돌봄' }
          ]
        };
      case 'education':
        return {
          title: '📚 교육 및 자립 지원 활동',
          photos: [
            { src: '/lovable-uploads/f69d0d4c-5186-4bd0-a56a-c7bef1da42b7.png', alt: '학생들과 함께하는 교육 프로그램' },
            { src: '/lovable-uploads/c86c2b10-f19b-45c7-986a-e69b150e1b85.png', alt: '아동 미술 및 창의성 교육' },
            { src: '/lovable-uploads/6eb84c0d-d1d6-4ea3-a35f-53a3eb6c9eb9.png', alt: '아동 학습 지원 및 돌봄' },
            { src: '/lovable-uploads/a60983e8-d1a2-45e8-adc2-9bb1f7d98021.png', alt: '아동 체험 활동 및 놀이 교육' },
            { src: '/lovable-uploads/8842a1bc-4462-414d-9e25-eea7ba5c6369.png', alt: '교실 수업 및 학습 지도' },
            { src: '/lovable-uploads/5918fc70-cf00-4756-819d-24dfb3e1176c.png', alt: '대학교 강의 및 교육 지원' },
            { src: '/lovable-uploads/1e783146-1401-4ce0-8de9-b0e7bc66ea25.png', alt: '아동 학습 활동 및 참여 수업' },
            { src: '/lovable-uploads/0b2b0831-ebee-4f53-b71c-3036f7b9a0d8.png', alt: '청소년 교육 및 진로 지도' },
            { src: '/lovable-uploads/b01a4943-74c8-4571-b05d-2c27f34d049d.png', alt: '소그룹 멘토링 및 토론' },
            { src: '/lovable-uploads/2f014a4f-71bd-4a30-b550-9b73d17b4b97.png', alt: '교육 현장 및 학습 환경' }
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
                className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
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
