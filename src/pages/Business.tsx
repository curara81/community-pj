
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import CoreBusinessSection from "@/components/CoreBusinessSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Business = () => {
  useEffect(() => {
    document.title = "사업안내 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <CoreBusinessSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Business;
