
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface VolunteerModalProps {
  children: React.ReactNode;
}

const VolunteerModal = ({ children }: VolunteerModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const volunteerAreas = [
    '난민사역',
    '돌봄 서비스',
    '상담',
    '행정업무',
    '교육',
    '번역',
    '의료지원',
    '기타'
  ];

  const handleInterestChange = (area: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, area]);
    } else {
      setInterests(interests.filter(item => item !== area));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('자원봉사 신청:', { name, email, phone, interests, message });
    alert('자원봉사 신청이 접수되었습니다. 담당자가 연락드리겠습니다.');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-stone-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-blue-800">
            🙋‍♀️ 참여 신청하기
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">성함</label>
            <Input
              type="text"
              placeholder="성함을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-stone-300 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">이메일</label>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-stone-300 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">연락처</label>
            <Input
              type="tel"
              placeholder="연락처를 입력해주세요"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border-stone-300 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">관심 있는 활동 영역 (복수선택 가능)</label>
            <div className="grid grid-cols-2 gap-2">
              {volunteerAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={interests.includes(area)}
                    onCheckedChange={(checked) => handleInterestChange(area, checked as boolean)}
                  />
                  <label htmlFor={area} className="text-sm text-stone-700">{area}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">자기소개 및 참여 동기</label>
            <Textarea
              placeholder="간단한 자기소개와 참여하고 싶은 이유를 적어주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white border-stone-300 focus:border-blue-500"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            신청하기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;
