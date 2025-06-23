
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import IntroSection from "@/components/IntroSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const About = () => {
  useEffect(() => {
    document.title = "소개 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <IntroSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
