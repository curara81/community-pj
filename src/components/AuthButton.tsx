
import { Button } from "@/components/ui/button";

const AuthButton = () => {
  const handleDonationHistory = () => {
    window.open("https://link.donationbox.co.kr/userPaymentsLogin.jsp?uid=5H4nnMENSe", "_blank");
  };

  return (
    <Button
      onClick={handleDonationHistory}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      납부자 조회 서비스
    </Button>
  );
};

export default AuthButton;
