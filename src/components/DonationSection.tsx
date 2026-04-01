
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
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
            🙌 {t("함께 시작해주세요", "Start Together With Us")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            {t("아직 시작 단계지만, 우리가 함께 만들 수 있는 변화는 무궁무진합니다. 여러분의 작은 참여가 누군가에게는 인생의 터닝포인트가 됩니다.", "Though we're still in the beginning stages, the changes we can create together are limitless. Your small participation becomes a turning point in someone's life.")}
          </p>
          
          <div className="bg-accent-lighter/60 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-2">
              💳 {t("계좌 안내", "Account Information")}
            </h3>
            <p className="text-base text-muted-foreground font-medium">
              {t("하나은행 218-910044-94704", "Hana Bank 218-910044-94704")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("(예금주: 사단법인 컴유니티)", "(Account Holder: Comm.Unity)")}
            </p>
          </div>
          
          <Button 
            onClick={handleDonationClick}
            variant="accent"
            size="lg"
            className="px-6 py-3 text-base font-semibold rounded-full hover-lift"
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
