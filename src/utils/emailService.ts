export const sendDonationEmail = (formData: {
  donationType: 'regular' | 'one-time';
  amount: string;
  name: string;
  email: string;
  phone: string;
  isUnder14: boolean;
  paymentMethod?: 'cms' | 'card';
  withdrawalDay?: string;
  bankName?: string;
  accountNumber?: string;
  cardHolderName?: string;
  cardHolderPhone?: string;
  paymentDay?: string;
}) => {
  const subject = `[컴유니티] ${formData.donationType === 'regular' ? '정기' : '일시'} 후원 신청`;
  
  let body = `새로운 후원 신청이 접수되었습니다.\n\n`;
  body += `후원 종류: ${formData.donationType === 'regular' ? '정기후원' : '일시후원'}\n`;
  body += `후원 금액: ${formData.amount}\n`;
  body += `성함: ${formData.name}\n`;
  body += `이메일: ${formData.email}\n`;
  body += `연락처: ${formData.phone}\n`;
  body += `만 14세 미만: ${formData.isUnder14 ? '예' : '아니오'}\n`;
  
  if (formData.donationType === 'regular') {
    body += `\n결제 정보:\n`;
    body += `결제 수단: ${formData.paymentMethod === 'cms' ? 'CMS자동이체' : '신용카드'}\n`;
    
    if (formData.paymentMethod === 'cms') {
      body += `출금일: 매월 ${formData.withdrawalDay}일\n`;
      body += `은행명: ${formData.bankName}\n`;
      body += `계좌번호: ${formData.accountNumber}\n`;
    } else {
      body += `카드주명: ${formData.cardHolderName}\n`;
      body += `카드주 휴대폰: ${formData.cardHolderPhone}\n`;
      body += `결제일: 매월 ${formData.paymentDay}일\n`;
    }
  }
  
  const mailtoLink = `mailto:comm@comm-unity.or.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

export const sendVolunteerEmail = (formData: {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  message: string;
}) => {
  const subject = '[컴유니티] 자원봉사 신청';
  
  let body = `새로운 자원봉사 신청이 접수되었습니다.\n\n`;
  body += `성함: ${formData.name}\n`;
  body += `이메일: ${formData.email}\n`;
  body += `연락처: ${formData.phone}\n`;
  body += `관심 있는 활동 영역: ${formData.interests.join(', ')}\n`;
  body += `자기소개 및 참여 동기:\n${formData.message}\n`;
  
  const mailtoLink = `mailto:comm@comm-unity.or.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

export const sendNewsletterEmail = (email: string) => {
  const subject = '[컴유니티] 뉴스레터 신청';
  const body = `새로운 뉴스레터 신청이 접수되었습니다.\n\n이메일: ${email}`;
  
  const mailtoLink = `mailto:comm@comm-unity.or.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

export const sendSignupConfirmationEmail = async (email: string, confirmationUrl: string) => {
  try {
    const response = await fetch('/functions/v1/send-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        confirmation_url: confirmationUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};
