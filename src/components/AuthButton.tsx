
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
      className="!border-2 !border-accent !text-accent !bg-background hover:!bg-accent hover:!text-accent-foreground !h-[36px] !px-3 flex items-center justify-center text-xs font-semibold"
    >
      납부자 조회
    </Button>
  );
};

export default AuthButton;
