"use client";

import { useState, useCallback, useMemo, ReactNode } from 'react';
import { LanguageContext, LanguageContextType } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/types';

const LANGUAGE_STORAGE_KEY = 'app-language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  /**
   * Use lazy initialization for useState.
   * This function runs ONLY ONCE during the initial render.
   */
  const [lang, setLangState] = useState<LanguageCode>(() => {
    // This code block will NOT run on the server.
    if (typeof window === 'undefined') {
      return LanguageCode.EN; // Default for SSR and initial server render.
    }

    try {
      const storedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      // Check if the stored value is a valid LanguageCode.
      if (storedLang && Object.values(LanguageCode).includes(storedLang as LanguageCode)) {
        return storedLang as LanguageCode;
      }
    } catch (error) {
      console.error("Failed to read language from localStorage on init:", error);
    }

    // If nothing is stored or the stored value is invalid, return the default.
    return LanguageCode.EN;
  });

  /**
   * A memoized function to update the language.
   * It updates the state and persists the new value to localStorage.
   * useCallback prevents this function from being recreated on every render.
   */
  const setLang = useCallback((newLang: LanguageCode) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      setLangState(newLang);
    } catch (error){
        console.error("Failed to save language to localStorage:", error);
    }
  }, []);

  /**
   * Memoize the context value to prevent unnecessary re-renders of consumers.
   * The value object is only recreated if `lang` or `setLang` changes.
   */
  const value = useMemo<LanguageContextType>(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};