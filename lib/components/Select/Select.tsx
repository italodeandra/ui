import React, { ComponentProps, ForwardedRef, forwardRef } from "react";
import * as RSelect from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import Button from "../Button";
import clsx from "../../utils/clsx";

function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof RSelect.Content>) {
  return (
    <RSelect.Portal>
      <RSelect.Content
        {...props}
        className={clsx("ui-select-content", className)}
      >
        <RSelect.ScrollUpButton className="ui-select-scroll-button">
          <ChevronUpIcon />
        </RSelect.ScrollUpButton>
        <RSelect.Viewport>{children}</RSelect.Viewport>
        <RSelect.ScrollDownButton className="ui-select-scroll-button">
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
      className={clsx("ui-select-separator", className)}
    />
  );
}

function SelectItemComponent(
  {
    children,
    className,
    ...props
  }: Omit<ComponentProps<typeof RSelect.Item>, "placeholder"> & {
    placeholder?: string;
  },
  forwardedRef: ForwardedRef<HTMLDivElement>,
) {
  return (
    <RSelect.Item
      className={clsx("ui-select-item", className)}
      {...props}
      ref={forwardedRef}
    >
      <RSelect.ItemIndicator className="ui-select-item-indicator">
        <CheckIcon />
      </RSelect.ItemIndicator>
      <RSelect.ItemText>{children}</RSelect.ItemText>
    </RSelect.Item>
  );
}

const SelectItem = forwardRef(SelectItemComponent);

function SelectTrigger({
  className,
  placeholder,
  children,
  ...props
}: ComponentProps<typeof RSelect.Trigger> & { placeholder?: string }) {
  return (
    <RSelect.Trigger asChild {...props} className={className}>
      {children || (
        <Button
          trailing={
            <RSelect.Icon>
              <ChevronDownIcon />
            </RSelect.Icon>
          }
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
    <RSelect.Label className={clsx("ui-select-label", className)} {...props} />
  );
}

const Select = {
  Root: RSelect.Root,
  Item: SelectItem,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Group: RSelect.Group,
  Label: SelectLabel,
  Separator: SelectSeparator,
  Icon: RSelect.Icon,
  Value: RSelect.Value,
};

export default Select;
