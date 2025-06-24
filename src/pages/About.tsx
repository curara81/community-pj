
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import IntroSection from "@/components/IntroSection";
import CEOMessageSection from "@/components/CEOMessageSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const About = () => {
  useEffect(() => {
    document.title = "단체소개 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <IntroSection />
      <CEOMessageSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
