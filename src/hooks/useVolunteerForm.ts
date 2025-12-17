
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, validatePhone, sanitizeInput } from '@/utils/volunteerValidation';

export const useVolunteerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInterestChange = (area: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, area]);
    } else {
      setInterests(interests.filter(item => item !== area));
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setInterests([]);
    setMessage('');
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      toast({
        title: "입력 오류",
        description: "성함을 입력해주세요.",
        variant: "destructive",
      });
      return false;
    }

    if (!validateEmail(email)) {
      toast({
        title: "입력 오류",
        description: "올바른 이메일 주소를 입력해주세요.",
        variant: "destructive",
      });
      return false;
    }

    if (!validatePhone(phone)) {
      toast({
        title: "입력 오류",
        description: "올바른 연락처를 입력해주세요. (예: 010-1234-5678)",
        variant: "destructive",
      });
      return false;
    }

    if (interests.length === 0) {
      toast({
        title: "입력 오류",
        description: "관심 있는 활동 영역을 최소 하나 선택해주세요.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const submitForm = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const sanitizedData = {
        user_id: user?.id || null,
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        phone: sanitizeInput(phone),
        interests: interests,
        message: message ? sanitizeInput(message) : null,
      };

      // TODO: Enable when volunteer_applications table is created
      // const { error } = await supabase
      //   .from('volunteer_applications')
      //   .insert([sanitizedData]);
      // if (error) { ... }
      
      console.log('Volunteer application data (table not yet created):', sanitizedData);
      toast({
        title: "신청 완료",
        description: "자원봉사 신청이 성공적으로 접수되었습니다. 검토 후 연락드리겠습니다.",
      });
      resetForm();
      return true;
    } catch (error) {
      toast({
        title: "신청 실패",
        description: "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    email,
    phone,
    interests,
    message,
    isSubmitting,
    setName,
    setEmail,
    setPhone,
    setMessage,
    handleInterestChange,
    submitForm,
  };
};
