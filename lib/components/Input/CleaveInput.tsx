import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import Cleave from "cleave.js/react";
import Input, { InputProps } from "./Input";
import { CleaveOptions } from "cleave.js/options";
import { ChangeEventHandler } from "cleave.js/react/props";

export type CleaveInputProps = {
  options: CleaveOptions;
} & InputProps<undefined>;

function CleaveInput(
  {
    onChange,
    name,
    value: defaultValue = "",
    options,
    ...props
  }: CleaveInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState<typeof defaultValue>(
    defaultValue?.toString().replace(".", ",")
  );
  let valueRef = useRef(defaultValue?.toString().replace(".", ","));

  const innerRef = useRef<HTMLInputElement>({
    get value() {
      return valueRef.current;
    },
    set value(value) {
      setValue(value.toString().replace(".", ","));
    },
  } as unknown as HTMLInputElement);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else {
        try {
          ref.current = innerRef.current;
        } catch (e) {
          // do nothing
        }
      }
    }
  }, [ref]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      valueRef.current = event.target.rawValue;
      onChange({
        target: {
          name,
          value: +event.target.rawValue,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
  };

  useEffect(() => {
    setValue(defaultValue?.toString().replace(".", ","));
  }, [defaultValue]);

  return (
    <Input
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
      as={Cleave}
      name={name}
      onChange={handleOnChange}
      options={options}
      value={value}
    />
  );
}

export default forwardRef(CleaveInput);
