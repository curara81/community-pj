import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart } from "lucide-react";

const DONATION_URL = "https://online.mrm.or.kr/jp40Mng";

const DonationSection = () => {
  const { t } = useLanguage();
  const handleDonationClick = () => {
    window.open(DONATION_URL, "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            🙌 {t("함께 시작해주세요", "Start Together With Us")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 font-light leading-relaxed">
            {t("여러분의 작은 참여가 누군가에게는 인생의 터닝포인트가 됩니다.", "Your small participation becomes a turning point in someone's life.")}
          </p>
          
          <div className="rounded-2xl p-8 md:p-10 mb-8" style={{ backgroundColor: '#fdefde' }}>
            <h3 className="text-lg font-bold text-foreground mb-3">
              💳 {t("계좌 안내", "Account Information")}
            </h3>
            <p className="text-base text-foreground font-medium">
              {t("하나은행 218-910044-94704", "Hana Bank 218-910044-94704")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("(예금주: 사단법인 컴유니티)", "(Account Holder: Comm.Unity)")}
            </p>
          </div>
          
          <Button 
            onClick={handleDonationClick}
            className="text-white px-8 py-3 text-sm font-semibold rounded-full"
            style={{ backgroundColor: '#f08300' }}
          >
            <Heart className="w-4 h-4 mr-2" />
            {t("후원하기", "Donate")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
