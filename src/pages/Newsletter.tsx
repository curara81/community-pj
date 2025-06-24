
import { useEffect } from 'react';
import SimpleHeader from "@/components/SimpleHeader";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Newsletter = () => {
  useEffect(() => {
    document.title = "소식받기 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Newsletter;
