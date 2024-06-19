import { ForwardedRef, forwardRef, useMemo } from "react";
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
  }: Omit<InputProps<false>, "value"> & {
    value?: string;
    onValueChange?: (value?: string) => void;
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  const realRef = useRefValue(ref);

  const formattedValue = useMemo(
    () => (value && value.includes("T") ? value.split("T")[0] : value) || "",
    [value],
  );

  return (
    <Input
      {...props}
      onChange={(e) =>
        onValueChange?.(
          e.target.value
            ? `${e.target.value}T${
                dayjs()
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0)
                  .set("millisecond", 0)
                  .toISOString()
                  .split("T")[1]
              }`
            : e.target.value,
        )
      }
      ref={realRef}
      type="date"
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      trailing={!readOnly ? <CalendarIcon className="w-5" /> : undefined}
      inputClassName="!pr-3"
      readOnly={readOnly}
      value={formattedValue}
    />
  );
}

export default forwardRef(DateInput);
