
// Input validation utilities for security
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validateKoreanPhone = (phone: string): boolean => {
  // Korean phone number formats: 010-1234-5678, 010 1234 5678, 01012345678
  const phoneRegex = /^(?:\+82|0)?(?:10|11|16|17|18|19)[-\s]?\d{3,4}[-\s]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateBusinessRegistrationNumber = (number: string): boolean => {
  // Korean business registration number format: 123-45-67890
  const businessRegex = /^\d{3}-?\d{2}-?\d{5}$/;
  return businessRegex.test(number.replace(/\s/g, ''));
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateDonationAmount = (amount: string): boolean => {
  const numAmount = parseInt(amount.replace(/[^\d]/g, ''));
  return numAmount >= 1000 && numAmount <= 10000000; // 1,000원 ~ 10,000,000원
};

export const isValidLength = (text: string, min: number, max: number): boolean => {
  const length = text.trim().length;
  return length >= min && length <= max;
};
