import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { format, parse } from "date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";
import Input, { InputProps } from "../Input/Input";
import { CalendarIcon } from "@heroicons/react/20/solid";

export function parseDate(value: string) {
  try {
    return parse(value, "yyyy-MM-dd'T'HH:mm", new Date(), {
      locale: ptBrLocale,
    }).toISOString();
  } catch (e) {
    return value;
  }
}

export function formatDate(value: string) {
  try {
    return format(new Date(value), "yyyy-MM-dd'T'HH:mm", {
      locale: ptBrLocale,
    });
  } catch (e) {
    return value;
  }
}

function DateTimeInput(
  props: InputProps<false>,
  ref: ForwardedRef<HTMLInputElement>
) {
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

  return (
    <Input
      {...props}
      ref={realRef}
      type="datetime-local"
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
      trailing={<CalendarIcon className="w-5" />}
      inputClassName="!pr-3"
    />
  );
}

export default forwardRef(DateTimeInput);