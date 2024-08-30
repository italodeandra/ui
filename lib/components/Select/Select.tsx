import React, { ComponentProps, ForwardedRef, forwardRef } from "react";
import * as RSelect from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import Button from "../Button";
import clsx from "../../utils/clsx";
import {
  dropdownItemClassName,
  dropdownItemIndicatorClassName,
  dropdownLabelClassName,
  dropdownSeparatorClassName,
} from "../../styles/Dropdown.classNames";
import { modalContentClassName } from "../../styles/Modal.classNames";

const selectScrollButtonClassName = clsx(
  "ui-select-scroll-button",
  "flex h-6 cursor-default items-center justify-center",

  "bg-white",
  "dark:bg-zinc-900",

  "[&>svg]:w-4 [&>svg]:h-4",
);

function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof RSelect.Content>) {
  return (
    <RSelect.Portal>
      <RSelect.Content
        {...props}
        className={clsx(
          modalContentClassName,
          "ui-select-content -ml-[6px]",
          className,
        )}
      >
        <RSelect.ScrollUpButton className={selectScrollButtonClassName}>
          <ChevronUpIcon />
        </RSelect.ScrollUpButton>
        <RSelect.Viewport>{children}</RSelect.Viewport>
        <RSelect.ScrollDownButton className={selectScrollButtonClassName}>
          <ChevronDownIcon />
        </RSelect.ScrollDownButton>
      </RSelect.Content>
    </RSelect.Portal>
  );
}

function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof RSelect.Separator>) {
  return (
    <RSelect.Separator
      {...props}
      className={clsx(
        dropdownSeparatorClassName,
        "ui-select-separator",
        className,
      )}
    />
  );
}

function SelectItemComponent(
  {
    children,
    className,
    indicatorClassName,
    ...props
  }: ComponentProps<typeof RSelect.Item> & {
    indicatorClassName?: string;
  },
  forwardedRef: ForwardedRef<HTMLDivElement>,
) {
  return (
    <RSelect.Item
      className={clsx(dropdownItemClassName, "ui-select-item", className)}
      {...props}
      ref={forwardedRef}
    >
      <RSelect.ItemIndicator
        className={clsx(
          dropdownItemIndicatorClassName,
          "ui-select-item-indicator",
          indicatorClassName,
        )}
      >
        <CheckIcon />
      </RSelect.ItemIndicator>
      <RSelect.ItemText>{children}</RSelect.ItemText>
    </RSelect.Item>
  );
}

const SelectItem = forwardRef(
  SelectItemComponent,
) as typeof SelectItemComponent;

function SelectTrigger(
  {
    className,
    placeholder,
    children,
    ...props
  }: ComponentProps<typeof RSelect.Trigger> &
    ComponentProps<typeof Button> & {
      placeholder?: string;
    },
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <RSelect.Trigger
      asChild
      {...props}
      className={className}
      ref={children ? ref : undefined}
    >
      {children || (
        <Button
          trailing={
            <RSelect.Icon>
              <ChevronDownIcon />
            </RSelect.Icon>
          }
          ref={ref}
        >
          <RSelect.Value placeholder={placeholder} />
        </Button>
      )}
    </RSelect.Trigger>
  );
}

function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof RSelect.Label>) {
  return (
    <RSelect.Label
      className={clsx(dropdownLabelClassName, "ui-select-label", className)}
      {...props}
    />
  );
}

const Select = {
  Root: RSelect.Root,
  Item: SelectItem,
  Trigger: forwardRef(SelectTrigger) as typeof SelectTrigger,
  Content: SelectContent,
  Group: RSelect.Group,
  Label: SelectLabel,
  Separator: SelectSeparator,
  Icon: RSelect.Icon,
  Value: RSelect.Value,
};

export default Select;
