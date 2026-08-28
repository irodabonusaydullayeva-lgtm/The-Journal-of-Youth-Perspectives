import { useState, useEffect } from 'react';

/**
 * Hook to read/write a value in localStorage.
 * Returns a stateful value and a setter that persists to storage.
 *
 * @param {string} key - localStorage key
 * @param {string} [defaultValue=''] - Default if nothing stored
 * @returns {[string, function]}
 */
export function useLocalStorage(key, defaultValue = '') {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      // Don't overwrite stored values with empty strings
      if (value) {
        localStorage.setItem(key, value);
      }
    } catch (err) {
      console.error(`Failed to save to localStorage (${key}):`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
