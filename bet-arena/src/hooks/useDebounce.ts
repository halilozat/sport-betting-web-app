// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

// value: geciktirmek istediğimiz değer (örn: arama metni)
// delay: gecikme süresi (milisaniye)
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay süresi kadar bekledikten sonra state'i güncelle
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Eğer `value` veya `delay` değişirse, önceki zamanlayıcıyı temizle
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}