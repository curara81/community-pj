
import { Button } from "@/components/ui/button";

const AuthButton = () => {
  const handleDonationHistory = () => {
    window.open("https://link.donationbox.co.kr/userPaymentsLogin.jsp?uid=5H4nnMENSe", "_blank");
  };

  return (
    <Button
      onClick={handleDonationHistory}
      variant="outline"
      size="sm"
      className="!border-2 !border-accent !text-accent !bg-background hover:!bg-accent hover:!text-accent-foreground !w-[140px] sm:!w-[160px] lg:!w-[180px] !h-[40px] sm:!h-[45px] lg:!h-[50px] flex items-center justify-center text-sm sm:text-base font-semibold"
    >
      납부자 조회 서비스
    </Button>
  );
};

export default AuthButton;
