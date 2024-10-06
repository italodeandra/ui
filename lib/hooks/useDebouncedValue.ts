import { useEffect, useState } from "react";
import ms from "ms";

export default function useDebounce<T = unknown>(
  value: T,
  delay: string | number,
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(
      () => {
        setDebouncedValue(value);
      },
      typeof delay === "string" ? ms(delay) : delay,
    );
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
