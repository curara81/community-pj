
import { useEffect } from 'react';
import Header from "@/components/Header";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Donation = () => {
  useEffect(() => {
    document.title = "후원하기 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <DonationSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Donation;
