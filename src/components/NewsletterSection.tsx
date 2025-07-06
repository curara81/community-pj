
import React, { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import NewsletterModal from "./NewsletterModal";
import { sendNewsletterEmail } from '@/utils/emailService';
import { useLanguage } from "@/contexts/LanguageContext";

const NewsletterSection = memo(() => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleQuickSignup = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      sendNewsletterEmail(email);
      alert(t('뉴스레터 신청이 완료되었습니다! 이메일 클라이언트가 열립니다.', 'Newsletter subscription complete! Email client will open.'));
      setEmail('');
    }
  }, [email, t]);

  const handleContactUs = useCallback(() => {
    window.location.href = 'mailto:comm@comm-unity.or.kr';
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📮 <span className="hidden md:inline">{t("소식을 가장 먼저 받아보세요", "Be the First to Receive Our News")}</span>
            <span className="md:hidden">{t("소식을 가장 먼저", "Be the First")}<br />{t("받아보세요", "to Receive Our News")}</span>
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            <span className="hidden md:block">{t("뉴스레터를 신청하시고 컴유니티의 준비과정부터 함께해요.", "Subscribe to our newsletter and join Comm.Unity from the preparation stage.")}</span>
            <span className="md:hidden">{t("뉴스레터를 신청하시고 컴유니티의", "Subscribe to our newsletter")}<br />{t("준비과정부터 함께해요.", "and join us from the start.")}</span>
          </p>
          
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 hover-lift mb-8">
            <CardContent className="p-8">
              <form onSubmit={handleQuickSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder={t("이메일 주소를 입력해주세요", "Enter your email address")}
                  className="flex-1 px-4 py-3 text-lg border-2 border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400 rounded-xl bg-white"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-xl hover-lift whitespace-nowrap"
                >
                  {t("빠른 신청", "Quick Apply")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mb-12">
            <NewsletterModal>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white px-6 py-3 text-lg font-semibold rounded-xl"
              >
                {t("상세 신청하기", "Detailed Application")}
              </Button>
            </NewsletterModal>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-600 font-medium">Contact Us</p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-400 text-gray-600 hover:bg-gray-500 hover:text-white px-6 py-3 rounded-full hover-lift"
              onClick={handleContactUs}
            >
              <Mail size={20} className="mr-2" />
              comm@comm-unity.or.kr
            </Button>
            <p className="text-sm text-gray-500">
              {t("문의사항이 있으시면 언제든 연락주세요", "Please contact us anytime if you have any questions")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = 'NewsletterSection';

export default NewsletterSection;
