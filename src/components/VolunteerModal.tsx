
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVolunteerForm } from '@/hooks/useVolunteerForm';
import VolunteerFormFields from './volunteer/VolunteerFormFields';
import VolunteerInterestCheckboxes from './volunteer/VolunteerInterestCheckboxes';
import { useLanguage } from "@/contexts/LanguageContext";

interface VolunteerModalProps {
  children: React.ReactNode;
}

const VolunteerModal = ({ children }: VolunteerModalProps) => {
  const { t } = useLanguage();
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
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            🙋‍♀️ {t("참여 신청하기", "Apply to Volunteer")}
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
            variant="success"
            className="w-full font-semibold disabled:opacity-50"
          >
            {isSubmitting ? t('신청 중...', 'Submitting...') : t('신청하기', 'Submit Application')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;
