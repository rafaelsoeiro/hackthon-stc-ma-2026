'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  highContrast: boolean;
  toggleTheme: () => void;
  toggleHighContrast: () => void;
};

const THEME_KEY = 'tp-theme';
const CONTRAST_KEY = 'tp-high-contrast';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyClasses(theme: Theme, highContrast: boolean) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark' && !highContrast);
  root.classList.toggle('high-contrast', highContrast);
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

function getInitialHighContrast(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(CONTRAST_KEY) === 'true';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [highContrast, setHighContrast] = useState<boolean>(getInitialHighContrast);

  useEffect(() => {
    applyClasses(theme, highContrast);
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(CONTRAST_KEY, String(highContrast));
  }, [theme, highContrast]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((current) => !current);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      highContrast,
      toggleTheme,
      toggleHighContrast,
    }),
    [highContrast, theme, toggleHighContrast, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSettings() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeSettings must be used within ThemeProvider');
  }

  return context;
}
