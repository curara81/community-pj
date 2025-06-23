
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Donation = () => {
  useEffect(() => {
    document.title = "후원하기 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <DonationSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Donation;
