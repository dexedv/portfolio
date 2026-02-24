import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface LanguageContextType {
  isEnglish: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'de';
    setIsEnglish(savedLang === 'en');

    const checkLanguage = () => {
      const lang = localStorage.getItem('language') || 'de';
      setIsEnglish(lang === 'en');
    };

    window.addEventListener('storage', checkLanguage);

    const interval = setInterval(checkLanguage, 100);

    return () => {
      window.removeEventListener('storage', checkLanguage);
      clearInterval(interval);
    };
  }, []);

  const toggleLanguage = () => {
    if (typeof window !== 'undefined' && window.toggleLanguage) {
      window.toggleLanguage();
      const lang = localStorage.getItem('language') || 'de';
      setIsEnglish(lang === 'en');
    }
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { isEnglish: false, toggleLanguage: () => {} };
  }
  return context;
}
