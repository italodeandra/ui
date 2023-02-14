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
  labelOuterClassName?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const defaultLabelClassName = defaultTextStyles.variant.label;
const defaultDescriptionClassName = defaultTextStyles.variant.secondary;
const defaultInputClassName =
  "h-4 w-4 rounded border-zinc-300 dark:checked:bg-primary-500 dark:checked:border-primary-500 dark:border-zinc-600 text-primary-600 ring-0 transition-colors dark:bg-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-primary-500 focus-visible:ring-2 ring-offset-gray-100 dark:ring-offset-zinc-900";

function Checkbox(
  {
    id,
    label,
    description,
    className,
    labelClassName,
    descriptionClassName,
    inputClassName,
    labelOuterClassName,
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
        <div className={clsx("ml-3 text-sm", labelOuterClassName)}>
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
