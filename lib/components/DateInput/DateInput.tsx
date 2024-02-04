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
    onValueChange?: (date: Date | undefined) => void;
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  const realRef = useRefValue(ref);

  const dateValue = value && dayjs(value).format("YYYY-MM-DD");

  return (
    <Input
      {...props}
      onChange={(e) =>
        onValueChange?.(
          e.target.value ? dayjs(e.target.value).toDate() : undefined,
        )
      }
      ref={realRef}
      type="date"
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      trailing={!readOnly ? <CalendarIcon className="w-5" /> : undefined}
      inputClassName="!pr-3"
      readOnly={readOnly}
      value={dateValue || ""}
    />
  );
}

export default forwardRef(DateInput);
