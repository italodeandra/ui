import React, { ComponentProps } from "react";
import * as RDropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";

export const menuContentClassName =
  "z-20 min-w-[220px] rounded-md bg-white p-[5px] shadow-lg ring-1 ring-black/5 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade";

export const menuSeparatorClassName = "m-[5px] h-[1px] bg-zinc-200";

function DropdownMenuContent({
  className,
  children,
  ...props
}: ComponentProps<typeof RDropdownMenu.Content>) {
  return (
    <RDropdownMenu.Portal>
      <RDropdownMenu.Content
        sideOffset={5}
        {...props}
        className={clsx(menuContentClassName, className)}
      >
        {children}
        <RDropdownMenu.Arrow className="mt-px fill-black/5" />
      </RDropdownMenu.Content>
    </RDropdownMenu.Portal>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof RDropdownMenu.Separator>) {
  return (
    <RDropdownMenu.Separator
      {...props}
      className={clsx(menuSeparatorClassName, className)}
    />
  );
}

export const menuItemClassName =
  "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] text-[13px] leading-none text-zinc-900 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-500 data-[disabled]:text-zinc-300 data-[highlighted]:text-white";
const dropdownMenuItemClassName = clsx(menuItemClassName, "group px-[5px]");

function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof RDropdownMenu.Item>) {
  return (
    <RDropdownMenu.Item
      {...props}
      className={clsx(dropdownMenuItemClassName, className)}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof RDropdownMenu.CheckboxItem>) {
  return (
    <RDropdownMenu.CheckboxItem
      {...props}
      className={clsx(dropdownMenuItemClassName, className)}
    >
      <RDropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon className="h-3 w-3" />
      </RDropdownMenu.ItemIndicator>
      {children}
    </RDropdownMenu.CheckboxItem>
  );
}

const DropdownMenu = {
  Root: RDropdownMenu.Root,
  Trigger: RDropdownMenu.Trigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  CheckboxItem: DropdownMenuCheckboxItem,
};

export default DropdownMenu;
