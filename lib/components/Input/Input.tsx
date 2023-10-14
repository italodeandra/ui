import UnstyledInput, { UnstyledInputProps } from "../Input/UnstyledInput";
import { defaultTextStyles } from "../Text";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputIcon from "./InputIcon";
import { cloneElement, ForwardedRef, forwardRef } from "react";
import clsx from "clsx";
import recursiveChildrenMap from "../../utils/recursiveChildrenMap";

export type InputProps<Select extends boolean | undefined> = {
  error?: boolean;
  loading?: boolean;
} & UnstyledInputProps<Select>;

export const defaultLabelClassName = `block ${defaultTextStyles.variant.label} mb-1`;
export const defaultInputClassNameUncolored =
  "block w-full rounded-md shadow-sm sm:text-sm disabled:cursor-not-allowed dark:bg-zinc-800";
export const defaultInputClassName = `${defaultInputClassNameUncolored} border-gray-300 dark:border-zinc-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-primary-500 disabled:border-gray-200 dark:disabled:border-zinc-800 disabled:bg-gray-50 dark:disabled:bg-zinc-900/90 disabled:text-gray-500`;
export const defaultHelpTextClassName = `mt-2 ${defaultTextStyles.variant.secondary}`;
export const defaultTrailingClassName =
  "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 text-sm";
export const defaultLeadingClassName =
  "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 text-sm";
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
    ...props
  }: InputProps<Select>,
  ref: ForwardedRef<Select extends true ? HTMLSelectElement : HTMLInputElement>
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
    }
  );
  helpTextClassName = clsx(defaultHelpTextClassName, helpTextClassName);
  trailingClassName = clsx(defaultTrailingClassName, trailingClassName);
  leadingClassName = clsx(defaultLeadingClassName, leadingClassName);
  leadingInputClassName = clsx(
    defaultLeadingInputClassName,
    leadingInputClassName
  );
  trailingInputClassName = clsx(
    defaultTrailingInputClassName,
    trailingInputClassName
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
    >
      {recursiveChildrenMap(children, (child) =>
        cloneElement(child, { disabled: readOnly })
      )}
    </UnstyledInput>
  );
}

export default forwardRef(Input);
