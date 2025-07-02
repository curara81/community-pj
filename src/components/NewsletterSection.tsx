
import React, { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import NewsletterModal from "./NewsletterModal";
import { sendNewsletterEmail } from '@/utils/emailService';

const NewsletterSection = memo(() => {
  const [email, setEmail] = useState('');

  const handleQuickSignup = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      sendNewsletterEmail(email);
      alert('뉴스레터 신청이 완료되었습니다! 이메일 클라이언트가 열립니다.');
      setEmail('');
    }
  }, [email]);

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
            📮 <span className="hidden md:inline">소식을 가장 먼저 받아보세요</span>
            <span className="md:hidden">소식을 가장 먼저<br />받아보세요</span>
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            <span className="hidden md:block">뉴스레터를 신청하시고 컴유니티의 준비과정부터 함께해요.</span>
            <span className="md:hidden">뉴스레터를 신청하시고 컴유니티의<br />준비과정부터 함께해요.</span>
          </p>
          
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 hover-lift mb-8">
            <CardContent className="p-8">
              <form onSubmit={handleQuickSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="이메일 주소를 입력해주세요"
                  className="flex-1 px-4 py-3 text-lg border-2 border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400 rounded-xl bg-white"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-xl hover-lift whitespace-nowrap"
                >
                  빠른 신청
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
                상세 신청하기
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
              문의사항이 있으시면 언제든 연락주세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = 'NewsletterSection';

export default NewsletterSection;
