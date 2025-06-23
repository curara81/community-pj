
import { useEffect } from 'react';
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const About = () => {
  useEffect(() => {
    document.title = "소개 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <IntroSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
