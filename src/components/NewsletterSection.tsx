
import React, { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-accent-lighter/40">
      <div className="container mx-auto px-6 max-w-xl text-center">
        <Mail className="w-7 h-7 text-accent mx-auto mb-1" />
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {t("소식을 가장 먼저 받아보세요", "Be the First to Receive Our News")}
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          {t("뉴스레터를 신청하시고 컴유니티의 준비과정부터 함께해요.", "Subscribe to our newsletter and join Comm.Unity from the preparation stage.")}
        </p>

        <form onSubmit={handleQuickSignup} className="flex gap-2 bg-white rounded-xl shadow-sm border border-muted-medium p-2 mb-4">
          <Input
            type="email"
            placeholder={t("이메일 주소를 입력해주세요", "Enter your email address")}
            className="flex-1 border-0 shadow-none focus-visible:ring-0 text-sm"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-5 text-sm font-medium rounded-lg whitespace-nowrap"
          >
            {t("빠른 신청", "Quick Apply")}
          </Button>
        </form>

        <NewsletterModal>
          <Button
            variant="outline"
            size="sm"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs rounded-lg"
          >
            {t("상세 신청하기", "Detailed Application")}
          </Button>
        </NewsletterModal>
      </div>
    </section>
  );
});

NewsletterSection.displayName = 'NewsletterSection';

export default NewsletterSection;
