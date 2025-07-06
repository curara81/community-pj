
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const DonationSection = () => {
  const { t } = useLanguage();
  const handleDonationClick = () => {
    window.open("https://link.donationbox.co.kr/donationBoxList.jsp?campaignuid=J9B2CMgACb", "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              🤲 {t("함께 시작해주세요", "Start Together With Us")}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="hidden md:block">{t("아직 시작 단계지만, 우리가 함께 만들 수 있는 변화는 무궁무진합니다.", "Though we're still in the beginning stages, the changes we can create together are limitless.")}
              <br />
              {t("여러분의 작은 참여가 누군가에게는 인생의 터닝포인트가 됩니다.", "Your small participation becomes a turning point in someone's life.")}
              <br />
              {t("정기후원 또는 일시후원을 통해 함께해주세요.", "Please join us through regular or one-time donations.")}</span>
              <span className="md:hidden">{t("아직 시작 단계지만, 우리가 함께 만들 수 있는 변화는 무궁무진합니다.", "Though we're still in the beginning stages, the changes we can create together are limitless.")}
              <br />
              {t("여러분의 작은 참여가 누군가에게는", "Your small participation becomes")}<br />{t("인생의 터닝포인트가 됩니다.", "a turning point in someone's life.")}
              <br />
              {t("정기후원 또는 일시후원을 통해", "Please join us through regular")}<br />{t("함께해주세요.", "or one-time donations.")}</span>
            </p>
          </div>
          
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 hover-lift">
            <CardContent className="p-8 md:p-12">
              <div className="bg-gradient-to-r from-blue-100 to-stone-100 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  💳 {t("계좌 안내", "Account Information")}
                </h3>
                <p className="text-xl text-center text-gray-700 font-medium">
                  {t("하나은행 218-910044-94704", "Hana Bank 218-910044-94704")}
                </p>
                <p className="text-lg text-center text-gray-600 mt-2">
                  {t("(예금주: 사단법인 컴유니티)", "(Account Holder: Comm.Unity)")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleDonationClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift helping-hand-shadow"
                >
                  💝 {t("정기 후원하기", "Regular Donation")}
                </Button>
                <Button 
                  onClick={handleDonationClick}
                  variant="outline"
                  size="lg"
                  className="border-2 border-stone-500 text-stone-700 hover:bg-stone-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-full hover-lift"
                >
                  💙 {t("일시 후원하기", "One-time Donation")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
