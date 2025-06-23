
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VolunteerModalProps {
  children: React.ReactNode;
}

const VolunteerModal = ({ children }: VolunteerModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

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

  // Input validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Korean phone number validation
    const phoneRegex = /^(?:\+82|0)?(?:10|11|16|17|18|19)-?\d{3,4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  const handleInterestChange = (area: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, area]);
    } else {
      setInterests(interests.filter(item => item !== area));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comprehensive input validation
    if (!name.trim()) {
      toast({
        title: "입력 오류",
        description: "성함을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "입력 오류",
        description: "올바른 이메일 주소를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhone(phone)) {
      toast({
        title: "입력 오류",
        description: "올바른 연락처를 입력해주세요. (예: 010-1234-5678)",
        variant: "destructive",
      });
      return;
    }

    if (interests.length === 0) {
      toast({
        title: "입력 오류",
        description: "관심 있는 활동 영역을 최소 하나 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user (optional for volunteer applications)
      const { data: { user } } = await supabase.auth.getUser();

      // Sanitize inputs
      const sanitizedData = {
        user_id: user?.id || null,
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        phone: sanitizeInput(phone),
        interests: interests,
        message: message ? sanitizeInput(message) : null,
      };

      const { error } = await supabase
        .from('volunteer_applications')
        .insert([sanitizedData]);

      if (error) {
        console.error('Volunteer application error:', error);
        toast({
          title: "신청 실패",
          description: "자원봉사 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "신청 완료",
          description: "자원봉사 신청이 성공적으로 접수되었습니다. 검토 후 연락드리겠습니다.",
        });
        
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setInterests([]);
        setMessage('');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "신청 실패",
        description: "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-stone-50 border-slate-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-blue-800">
            🙋‍♀️ 참여 신청하기
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">
              성함 <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="성함을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
              maxLength={50}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">
              이메일 <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
              maxLength={100}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">
              연락처 <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
              maxLength={20}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">
              관심 있는 활동 영역 <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-1">(복수선택 가능)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {volunteerAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={interests.includes(area)}
                    onCheckedChange={(checked) => handleInterestChange(area, checked as boolean)}
                    className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black w-5 h-5"
                  />
                  <label htmlFor={area} className="text-sm text-black font-bold">{area}</label>
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
              className="bg-white border-slate-300 focus:border-slate-500 focus-visible:ring-slate-400"
              maxLength={500}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full !bg-green-600 hover:!bg-green-700 !text-white font-semibold disabled:opacity-50"
          >
            {isSubmitting ? '신청 중...' : '신청하기'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;
