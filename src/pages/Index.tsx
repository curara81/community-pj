
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import CoreBusinessSection from "@/components/CoreBusinessSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import DonationSection from "@/components/DonationSection";
import VolunteerSection from "@/components/VolunteerSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
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
    </div>
  );
};

export default Index;
