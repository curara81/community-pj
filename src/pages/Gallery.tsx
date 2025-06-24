
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Gallery = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "컴유니티 스토리",
    "description": "컴유니티의 활동 모습과 이야기를 사진으로 만나보세요",
    "creator": {
      "@type": "Organization",
      "name": "사단법인 컴유니티"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="스토리 - Comm.Unity"
        description="컴유니티의 활동 모습과 이야기를 사진으로 만나보세요"
        keywords="컴유니티 스토리, 활동사진, 갤러리, 봉사활동, 난민지원 현장"
        structuredData={structuredData}
      />
      <SimpleHeader />
      <PhotoGallerySection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;
