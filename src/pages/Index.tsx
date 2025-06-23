
import { useEffect } from 'react';
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import CoreBusinessSection from "@/components/CoreBusinessSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import DonationSection from "@/components/DonationSection";
import VolunteerSection from "@/components/VolunteerSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    document.title = "Comm.Unity - 돌봄으로 하나 되는 사회";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <IntroSection />
      <CoreBusinessSection />
      <PhotoGallerySection />
      <DonationSection />
      <VolunteerSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
