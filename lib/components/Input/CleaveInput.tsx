import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import Cleave from "cleave.js/react";
import Input, { InputProps } from "./Input";
import { CleaveOptions } from "cleave.js/options";
import { useUpdateEffect } from "react-use";
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
  const [value, setValue] = useState<typeof defaultValue>(defaultValue);

  const innerRef = useRef<HTMLInputElement>({
    get value() {
      return value;
    },
    set value(value) {
      setValue(value || []);
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

  useUpdateEffect(() => {
    if (onChange) {
      onChange({
        target: {
          name,
          value,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(
      event.target.rawValue.replace(
        options.prefix
          ? new RegExp(
              `^${options.prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
              "g"
            )
          : "",
        ""
      )
    );
  };

  return (
    <Input
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
      as={Cleave}
      htmlRef={ref}
      name={name}
      onChange={handleOnChange}
      options={options}
    />
  );
}

export default forwardRef(CleaveInput);
