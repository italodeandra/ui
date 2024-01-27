import { ForwardedRef, forwardRef } from "react";
import Input, { InputProps } from "../Input";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useRefValue } from "./useRefValue";

function DateInput(
  { readOnly, ...props }: InputProps<false>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const realRef = useRefValue(ref);

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
