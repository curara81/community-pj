
import { useEffect } from 'react';
import Header from "@/components/Header";
import CoreBusinessSection from "@/components/CoreBusinessSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Business = () => {
  useEffect(() => {
    document.title = "핵심사업 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <CoreBusinessSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Business;
