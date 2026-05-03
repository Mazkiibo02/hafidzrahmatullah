
import { useState, useEffect } from 'react';

/**
 * Returns true when the document has the `.dark` class (Tailwind dark mode).
 * Reactively updates whenever the Navbar's `toggleDark` adds/removes the class.
 */
export const useDarkMode = (): boolean => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  return isDark;
};
