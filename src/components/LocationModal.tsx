
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface LocationModalProps {
  children: React.ReactNode;
}

const LocationModal = ({ children }: LocationModalProps) => {
  const handleNaverMapClick = () => {
    window.open('https://naver.me/FgTe9esV', '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="text-blue-600" />
            찾아오시는 길
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">사단법인 컴유니티</h3>
            <p className="text-gray-700 mb-2">서울특별시 서초구 서초대로27길 15 3층</p>
            <p className="text-gray-600 text-sm">전화: 070-4667-2733</p>
          </div>
          
          <Button 
            onClick={handleNaverMapClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <ExternalLink className="mr-2" size={20} />
            네이버 지도에서 위치 확인하기
          </Button>
          
          <div className="text-sm text-gray-600">
            <p className="mb-2">🚇 <strong>지하철 이용시:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>2호선 서초역 하차</li>
              <li>3호선 남부터미널역 하차</li>
            </ul>
            
            <p className="mb-2 mt-4">🚌 <strong>버스 이용시:</strong></p>
            <p className="ml-4">서초역, 남부터미널 정류장 하차</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
