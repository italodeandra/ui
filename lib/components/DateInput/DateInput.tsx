import { ForwardedRef, forwardRef } from "react";
import Input, { InputProps } from "../Input";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useRefValue } from "./useRefValue";
import dayjs from "dayjs";

function DateInput(
  {
    readOnly,
    value,
    onValueChange,
    ...props
  }: Omit<InputProps<false>, "value" | "crossOrigin"> & {
    value?: Date | string;
    onValueChange?: (value?: string) => void;
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  const realRef = useRefValue(ref);

  return (
    <Input
      {...props}
      onChange={(e) => onValueChange?.(e.target.value || undefined)}
      ref={realRef}
      type="date"
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      trailing={!readOnly ? <CalendarIcon className="w-5" /> : undefined}
      inputClassName="!pr-3"
      readOnly={readOnly}
      value={
        typeof value === "object" ? dayjs(value).format("YYYY-MM-DD") : value
      }
    />
  );
}

export default forwardRef(DateInput);
