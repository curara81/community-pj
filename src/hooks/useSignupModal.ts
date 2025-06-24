
import { useState } from 'react';

type SignupMethod = 'select' | 'user-type' | 'business-type' | 'email' | 'business' | 'non-business';

export const useSignupModal = () => {
  const [signupMethod, setSignupMethod] = useState<SignupMethod>('select');

  return {
    signupMethod,
    setSignupMethod,
  };
};
