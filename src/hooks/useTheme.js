import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { themeAtom } from '../atoms';

/**
 * Custom hook for theme management
 * Handles theme switching and system preference detection
 */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  
  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  // Detect system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };
  
  // Set theme to system preference
  const setSystemTheme = () => {
    setTheme(getSystemTheme());
  };
  
  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };
  
  // Set specific theme
  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  
  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // Only auto-switch if user hasn't manually set a preference
        // You could add a separate atom to track this
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  // Theme-aware style helpers
  const getThemeClasses = (lightClass, darkClass) => {
    return theme === 'dark' ? darkClass : lightClass;
  };
  
  const getBackgroundClass = () => {
    return getThemeClasses('bg-white', 'bg-gray-800');
  };
  
  const getTextClass = () => {
    return getThemeClasses('text-gray-900', 'text-white');
  };
  
  const getBorderClass = () => {
    return getThemeClasses('border-gray-200', 'border-gray-700');
  };
  
  // Check if current theme matches system
  const isSystemTheme = () => {
    return theme === getSystemTheme();
  };
  
  return {
    // Current theme state
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    
    // Theme setters
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    
    // System theme info
    systemTheme: getSystemTheme(),
    isSystemTheme: isSystemTheme(),
    
    // Utility helpers
    getThemeClasses,
    getBackgroundClass,
    getTextClass,
    getBorderClass
  };
}