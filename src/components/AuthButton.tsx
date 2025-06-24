
import { Button } from "@/components/ui/button";

const AuthButton = () => {
  const handleDonationHistory = () => {
    window.open("https://link.donationbox.co.kr/userPaymentsLogin.jsp?uid=cS5wf7XV59", "_blank");
  };

  return (
    <Button
      onClick={handleDonationHistory}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      후원내역 조회
    </Button>
  );
};

export default AuthButton;
