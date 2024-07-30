import { ReactNode } from "react";
import clsx from "../../utils/clsx";

export interface InputWrapperProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  id?: string;
  helpText?: string;
  error?: boolean;
  required?: boolean;
}

export default function InputWrapper({
  children,
  className,
  label,
  id,
  helpText,
  error,
  required,
}: InputWrapperProps) {
  return (
    <div
      className={clsx("ui-input-wrapper", className)}
      data-error={error ? "" : undefined}
    >
      {label && (
        <label htmlFor={id} className="ui-input-wrapper-label">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {children}
      {helpText && <div className="ui-input-wrapper-help-text">{helpText}</div>}
    </div>
  );
}
