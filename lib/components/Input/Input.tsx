import UnstyledInput, { UnstyledInputProps } from "../Input/UnstyledInput";
import { defaultTextStyles } from "../Text";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputIcon from "./InputIcon";
import { cloneElement, ForwardedRef, forwardRef } from "react";
import recursiveChildrenMap from "../../utils/recursiveChildrenMap";
import clsx from "../../utils/clsx";

export type InputProps<Select extends boolean | undefined> = {
  error?: boolean;
  loading?: boolean;
} & UnstyledInputProps<Select>;

export const defaultLabelClassName = `ui-input-label block ${defaultTextStyles.variant.label} mb-1`;
export const defaultInputClassNameUncolored =
  "block w-full rounded-md shadow-sm sm:text-sm data-[disabled]:cursor-not-allowed dark:bg-zinc-800 dark:placeholder:text-zinc-500 px-2.5";
export const defaultInputClassName = clsx(
  "ui-input-input",
  defaultInputClassNameUncolored,
  "border-zinc-300 focus:border-primary-500 focus:ring-primary-500 data-[disabled]:border-zinc-200 data-[disabled]:bg-zinc-50",
  "dark:border-zinc-700 dark:focus:border-primary-500 dark:data-[disabled]:border-zinc-800 dark:data-[disabled]:bg-zinc-900/90 data-[disabled]:text-zinc-500",
);
export const defaultHelpTextClassName = `mt-2 ${defaultTextStyles.variant.secondary}`;
export const defaultTrailingClassName =
  "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-500 text-sm";
export const defaultLeadingClassName =
  "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500 text-sm";
export const defaultLeadingInputClassName = "pl-10";
export const defaultTrailingInputClassName = "pr-10";

function Input<Select extends boolean | undefined>(
  {
    error,
    trailing,
    labelClassName,
    inputClassName,
    helpTextClassName,
    trailingClassName,
    leadingClassName,
    leadingInputClassName,
    trailingInputClassName,
    required,
    label,
    loading,
    readOnly,
    children,
    disabled,
    ...props
  }: InputProps<Select>,
  ref: ForwardedRef<Select extends true ? HTMLSelectElement : HTMLInputElement>,
) {
  trailing =
    trailing ||
    (error ? (
      <InputIcon className="text-error-500">
        <ExclamationCircleIcon aria-hidden="true" />
      </InputIcon>
    ) : undefined);

  labelClassName = clsx(defaultLabelClassName, labelClassName);
  inputClassName = clsx(
    error ? defaultInputClassNameUncolored : defaultInputClassName,
    inputClassName,
    {
      "animate-pulse": loading,
    },
  );
  helpTextClassName = clsx(defaultHelpTextClassName, helpTextClassName);
  trailingClassName = clsx(defaultTrailingClassName, trailingClassName);
  leadingClassName = clsx(defaultLeadingClassName, leadingClassName);
  leadingInputClassName = clsx(
    defaultLeadingInputClassName,
    leadingInputClassName,
  );
  trailingInputClassName = clsx(
    defaultTrailingInputClassName,
    trailingInputClassName,
  );
  if (error) {
    inputClassName = `${inputClassName} border-error-300 dark:border-error-500 text-error-900 dark:text-error-500 placeholder-error-300 focus:border-error-500 dark:focus:border-error-500 focus:ring-error-500`;
    helpTextClassName = `${helpTextClassName} !text-error-600 dark:!text-error-500`;
  }
  if (readOnly) {
    inputClassName = `${inputClassName} border-dashed`;
  }

  if (label && required) {
    label = (
      <>
        {label} <span className="text-red-500">*</span>
      </>
    );
  }

  return (
    <UnstyledInput
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
      trailing={trailing}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      helpTextClassName={helpTextClassName}
      trailingClassName={trailingClassName}
      leadingClassName={leadingClassName}
      leadingInputClassName={leadingInputClassName}
      trailingInputClassName={trailingInputClassName}
      ref={ref}
      required={required}
      label={label}
      readOnly={readOnly}
      disabled={disabled}
      data-disabled={disabled || undefined}
    >
      {recursiveChildrenMap(children, (child) =>
        cloneElement(child, { disabled: readOnly || disabled }),
      )}
    </UnstyledInput>
  );
}

export default forwardRef(Input);
