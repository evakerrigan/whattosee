import { useContext } from 'react';
import { ThemeContext } from './theme-context';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return ctx;
};
