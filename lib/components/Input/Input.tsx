import UnstyledInput, { UnstyledInputProps } from "../Input/UnstyledInput";
import { defaultTextStyles } from "../Text/Text";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import InputIcon from "./InputIcon";
import { ForwardedRef, forwardRef } from "react";

export type InputProps<Select extends boolean | undefined> = {
  error?: boolean;
} & UnstyledInputProps<Select>;

const defaultLabelClassName = `block ${defaultTextStyles.variant.label}`;
const defaultInputClassName =
  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500";
const defaultHelpTextClassName = `mt-2 ${defaultTextStyles.variant.secondary}`;
const defaultTrailingClassName =
  "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm";
const defaultLeadingClassName =
  "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm";
const defaultLeadingInputClassName = "pl-10";
const defaultTrailingInputClassName = "pr-10";

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
    ...props
  }: InputProps<Select>,
  ref: ForwardedRef<Select extends true ? HTMLSelectElement : HTMLInputElement>
) {
  trailing =
    trailing || error ? (
      <InputIcon className="text-red-500">
        <ExclamationCircleIcon aria-hidden="true" />
      </InputIcon>
    ) : undefined;

  labelClassName = labelClassName
    ? `${defaultLabelClassName} ${labelClassName}`
    : defaultLabelClassName;
  inputClassName = inputClassName
    ? `${defaultInputClassName} ${inputClassName}`
    : defaultInputClassName;
  helpTextClassName = helpTextClassName
    ? `${defaultHelpTextClassName} ${helpTextClassName}`
    : defaultHelpTextClassName;
  trailingClassName = trailingClassName
    ? `${defaultTrailingClassName} ${trailingClassName}`
    : defaultTrailingClassName;
  leadingClassName = leadingClassName
    ? `${defaultLeadingClassName} ${leadingClassName}`
    : defaultLeadingClassName;
  leadingInputClassName = leadingInputClassName
    ? `${defaultLeadingInputClassName} ${leadingInputClassName}`
    : defaultLeadingInputClassName;
  trailingInputClassName = trailingInputClassName
    ? `${defaultTrailingInputClassName} ${trailingInputClassName}`
    : defaultTrailingInputClassName;
  if (error) {
    inputClassName = `${inputClassName} border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500`;
    helpTextClassName = `${helpTextClassName} text-red-600`;
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
    />
  );
}

export default forwardRef(Input);
