
import { useEffect } from 'react';
import Header from "@/components/Header";
import VolunteerSection from "@/components/VolunteerSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Volunteer = () => {
  useEffect(() => {
    document.title = "참여신청 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <VolunteerSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Volunteer;
