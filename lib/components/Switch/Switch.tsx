import { Switch as HuiSwitch } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";
import Input, { UnstyledInputCommonProps } from "../Input";

export interface SwitchProps {
  srLabel?: string;
  checked?: boolean;
  className?: string;
  rightLabel?: ReactNode;
  switchClassName?: string;
  pointerClassName?: string;
  readOnly?: boolean;

  onChange?(checked: boolean): void;
}

export default function Switch({
  srLabel,
  checked,
  onChange,
  className,
  rightLabel,
  readOnly,
  switchClassName,
  pointerClassName,
}: SwitchProps) {
  return (
    <HuiSwitch.Group as="div" className={clsx("flex items-center", className)}>
      <HuiSwitch
        checked={checked}
        onChange={onChange}
        className={clsx(
          {
            "bg-primary-600": checked,
            "bg-zinc-300 dark:bg-zinc-600": !checked,
            "cursor-pointer": !readOnly,
          },
          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:ring-offset-zinc-900",
          switchClassName
        )}
        disabled={readOnly}
      >
        {srLabel && <span className="sr-only">{srLabel}</span>}
        <span
          aria-hidden="true"
          className={clsx(
            {
              "translate-x-5": checked,
              "translate-x-0": !checked,
            },
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            pointerClassName
          )}
        />
      </HuiSwitch>
      {rightLabel && (
        <HuiSwitch.Label as="span" className="ml-3">
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {rightLabel}
          </span>
        </HuiSwitch.Label>
      )}
    </HuiSwitch.Group>
  );
}

export type SwitchInputProps = UnstyledInputCommonProps & SwitchProps;

export function SwitchInput({ inputClassName, ...props }: SwitchInputProps) {
  return (
    <Input
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      {...(props as any)}
      as={Switch}
      inputClassName={clsx("p-1.5 border bg-white", inputClassName)}
    />
  );
}
