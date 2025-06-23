
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVolunteerForm } from '@/hooks/useVolunteerForm';
import VolunteerFormFields from './volunteer/VolunteerFormFields';
import VolunteerInterestCheckboxes from './volunteer/VolunteerInterestCheckboxes';

interface VolunteerModalProps {
  children: React.ReactNode;
}

const VolunteerModal = ({ children }: VolunteerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
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
  } = useVolunteerForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      setIsOpen(false);
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
          <VolunteerFormFields
            name={name}
            email={email}
            phone={phone}
            message={message}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onMessageChange={setMessage}
          />

          <VolunteerInterestCheckboxes
            interests={interests}
            onInterestChange={handleInterestChange}
          />

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
