import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";
import { defaultTextStyles } from "../Text/Text";
import clsx from "clsx";

export type CheckboxProps = {
  label?: ReactNode;
  description?: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  inputClassName?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const defaultLabelClassName = defaultTextStyles.variant.label;
const defaultDescriptionClassName = defaultTextStyles.variant.secondary;
const defaultInputClassName =
  "h-4 w-4 rounded border-gray-300 text-primary-600 ring-0 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-primary-500 focus-visible:ring-2";

function Checkbox(
  {
    id,
    label,
    description,
    className,
    labelClassName,
    descriptionClassName,
    inputClassName,
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const defaultInputId = useId();
  const descriptionId = useId();
  id = id || defaultInputId;

  labelClassName = labelClassName
    ? `${defaultLabelClassName} ${labelClassName}`
    : defaultLabelClassName;
  descriptionClassName = descriptionClassName
    ? `${defaultDescriptionClassName} ${descriptionClassName}`
    : defaultDescriptionClassName;
  inputClassName = inputClassName
    ? `${defaultInputClassName} ${inputClassName}`
    : defaultInputClassName;

  return (
    <div className={clsx("relative flex items-start", className)}>
      <div className="flex h-5 items-center">
        <input
          {...props}
          id={id}
          aria-describedby={descriptionId}
          type="checkbox"
          className={inputClassName}
          ref={ref}
        />
      </div>
      {(label || description) && (
        <div className="ml-3 text-sm">
          {label && (
            <label htmlFor={id} className={labelClassName}>
              {label}
            </label>
          )}
          {description && (
            <p id={descriptionId} className={descriptionClassName}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default forwardRef(Checkbox);
