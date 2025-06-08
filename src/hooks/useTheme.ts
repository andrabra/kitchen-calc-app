import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';

    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark')),
  };
};
