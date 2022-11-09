import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { useId } from "react";
import clsx from "clsx";

export type UnstyledInputProps<Select extends boolean | undefined> = {
  label?: ReactNode;
  inputClassName?: string;
  labelClassName?: string;
  helpTextClassName?: string;
  trailingClassName?: string;
  trailingInputClassName?: string;
  leadingClassName?: string;
  leadingInputClassName?: string;
  helpText?: ReactNode;
  trailing?: ReactNode;
  leading?: ReactNode;
  select?: Select;
} & (Select extends string
  ? DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
  : DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>);

function UnstyledInput<Select extends boolean | undefined>(
  {
    id,
    label,
    className,
    inputClassName,
    labelClassName,
    helpTextClassName,
    trailingClassName,
    trailingInputClassName,
    leadingClassName,
    leadingInputClassName,
    helpText,
    type = "text",
    leading,
    trailing,
    select,
    children,
    ...props
  }: UnstyledInputProps<Select>,
  ref: ForwardedRef<Select extends true ? HTMLSelectElement : HTMLInputElement>
) {
  const innerId = useId();
  id = id || innerId;

  const Component = select ? "select" : "input";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {leading && <div className={leadingClassName}>{leading}</div>}
        <Component
          {...(props as any)}
          className={clsx(
            inputClassName,
            leadingInputClassName && {
              [leadingInputClassName]: !!leading,
            },
            trailingInputClassName && {
              [trailingInputClassName]: !!trailing,
            }
          )}
          id={id}
          type={type}
          ref={ref}
        >
          {select ? children : undefined}
        </Component>
        {trailing && <div className={trailingClassName}>{trailing}</div>}
      </div>
      {helpText && <div className={helpTextClassName}>{helpText}</div>}
    </div>
  );
}

export default forwardRef(UnstyledInput);
