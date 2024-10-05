import {
  ComponentType,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";
import clsx from "../../utils/clsx";

export type UnstyledInputCommonProps = {
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
  as?: ComponentType;
  innerClassName?: string;
  error?: boolean | string;
};

export type UnstyledInputProps<Select extends boolean | undefined> =
  UnstyledInputCommonProps & {
    select?: Select;
  } & (Select extends string
      ? DetailedHTMLProps<
          InputHTMLAttributes<HTMLSelectElement>,
          HTMLSelectElement
        >
      : DetailedHTMLProps<
          InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >);

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
    as,
    innerClassName,
    value,
    ...props
  }: UnstyledInputProps<Select>,
  ref: ForwardedRef<Select extends true ? HTMLSelectElement : HTMLInputElement>,
) {
  const innerId = useId();
  id = id || innerId;

  const Component = as || (select ? "select" : "input");

  inputClassName = clsx(
    inputClassName,
    leadingInputClassName && {
      [leadingInputClassName]: !!leading,
    },
    trailingInputClassName && {
      [trailingInputClassName]: !!trailing,
    },
  );

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }} className={innerClassName}>
        {leading && <div className={leadingClassName}>{leading}</div>}
        <Component
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          {...(props as any)}
          className={inputClassName}
          id={id}
          type={type}
          ref={ref}
          value={value}
        >
          {children}
        </Component>
        {trailing && <div className={trailingClassName}>{trailing}</div>}
      </div>
      {helpText && <div className={helpTextClassName}>{helpText}</div>}
    </div>
  );
}

export default forwardRef(UnstyledInput);
