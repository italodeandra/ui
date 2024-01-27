import { ForwardedRef, useEffect, useRef } from "react";
import { format, parse } from "date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";

export function parseDate(value: string) {
  try {
    // noinspection SpellCheckingInspection
    return parse(value, "yyyy-MM-dd'T'HH:mm", new Date(), {
      locale: ptBrLocale,
    }).toISOString();
  } catch (e) {
    return value;
  }
}

export function formatDate(value: string) {
  try {
    // noinspection SpellCheckingInspection
    return format(new Date(value), "yyyy-MM-dd'T'HH:mm", {
      locale: ptBrLocale,
    });
  } catch (e) {
    return value;
  }
}

export function useRefValue(ref: ForwardedRef<HTMLInputElement>) {
  const realRef = useRef<HTMLInputElement>(null);

  const innerRef = useRef<HTMLInputElement>({
    get value() {
      return parseDate(realRef.current?.value || "");
    },
    set value(value) {
      if (realRef.current) {
        realRef.current.value = formatDate(value);
      }
    },
  } as unknown as HTMLInputElement);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else {
        ref.current = innerRef.current;
      }
    }
  }, [ref]);

  return realRef;
}
