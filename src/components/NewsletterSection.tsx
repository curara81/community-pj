
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📮 소식을 가장 먼저 받아보세요
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            뉴스레터를 신청하시고 컴유니티의 준비과정부터 함께해요.
          </p>
          
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 hover-lift mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="이메일 주소를 입력해주세요"
                  className="flex-1 px-4 py-3 text-lg border-2 border-amber-200 focus:border-amber-500 rounded-xl"
                />
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg font-semibold rounded-xl hover-lift whitespace-nowrap"
                >
                  신청하기
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-600 font-medium">SNS에서도 만나요</p>
            <div className="flex justify-center gap-6">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-pink-400 text-pink-600 hover:bg-pink-400 hover:text-white p-3 rounded-full hover-lift"
              >
                <Instagram size={24} />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white p-3 rounded-full hover-lift"
              >
                <Facebook size={24} />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              인스타그램 / 페이스북 / 카카오채널 (준비중)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
