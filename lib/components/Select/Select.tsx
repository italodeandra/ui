import React, {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from "react";
import * as RSelect from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import {
  menuContentClassName,
  menuItemClassName,
  menuSeparatorClassName,
} from "../DropdownMenu";
import Button from "../Button";

function SelectItemComponent(
  { children, className, ...props }: ComponentProps<typeof RSelect.Item>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  return (
    <RSelect.Item
      className={clsx(menuItemClassName, "pr-[35px]", className)}
      {...props}
      ref={forwardedRef}
    >
      <RSelect.ItemText>{children}</RSelect.ItemText>
      <RSelect.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon className="h-3 w-3" />
      </RSelect.ItemIndicator>
    </RSelect.Item>
  );
}

const SelectItem = forwardRef(SelectItemComponent);

function SelectTrigger({
  className,
  placeholder,
  children,
  ...props
}: ComponentProps<typeof RSelect.Trigger>) {
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

function SelectContent({ children }: { children: ReactNode }) {
  return (
    <RSelect.Portal>
      <RSelect.Content className={menuContentClassName}>
        <RSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-zinc-900">
          <ChevronUpIcon className="h-5 w-5" />
        </RSelect.ScrollUpButton>
        <RSelect.Viewport>{children}</RSelect.Viewport>
        <RSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-zinc-900">
          <ChevronDownIcon className="h-5 w-5" />
        </RSelect.ScrollDownButton>
      </RSelect.Content>
    </RSelect.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof RSelect.Label>) {
  return (
    <RSelect.Label
      className={clsx(
        "px-[25px] text-xs font-medium leading-[25px] text-zinc-400",
        className
      )}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof RSelect.Label>) {
  return (
    <RSelect.Separator
      className={clsx(menuSeparatorClassName, className)}
      {...props}
    />
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
};

export default Select;
