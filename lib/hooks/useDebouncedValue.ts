import { useEffect, useState } from "react";
import ms from "ms";

export default function useDebounce<T = unknown>(value: T, delay: string) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, ms(delay));
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
