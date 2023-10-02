import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { format, parse } from "date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";
import Input, { InputProps } from "../Input";
import { CalendarIcon } from "@heroicons/react/20/solid";

export function parseDate(value: string) {
  try {
    return parse(value, "yyyy-MM-dd", new Date(), {
      locale: ptBrLocale,
    }).toISOString();
  } catch (e) {
    return value;
  }
}

export function formatDate(value: string) {
  try {
    return format(new Date(value), "yyyy-MM-dd", {
      locale: ptBrLocale,
    });
  } catch (e) {
    return value;
  }
}

function DateInput(
  { readOnly, ...props }: InputProps<false>,
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
      type="date"
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      trailing={!readOnly ? <CalendarIcon className="w-5" /> : undefined}
      inputClassName="!pr-3"
      readOnly={readOnly}
    />
  );
}

export default forwardRef(DateInput);
