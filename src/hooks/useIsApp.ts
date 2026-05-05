import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform?: () => boolean;
      getPlatform?: () => string;
    };
  }
}

export function useIsApp() {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(window.Capacitor?.isNativePlatform?.() === true);
  }, []);

  return isApp;
}
