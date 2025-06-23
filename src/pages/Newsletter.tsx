
import { useEffect } from 'react';
import Header from "@/components/Header";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Newsletter = () => {
  useEffect(() => {
    document.title = "뉴스레터 - Comm.Unity";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Newsletter;
