
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import VolunteerSection from "@/components/VolunteerSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Volunteer = () => {
  useEffect(() => {
    document.title = "동참하기 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <VolunteerSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Volunteer;
