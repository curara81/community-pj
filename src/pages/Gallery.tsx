
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Gallery = () => {
  useEffect(() => {
    document.title = "갤러리 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <PhotoGallerySection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;
