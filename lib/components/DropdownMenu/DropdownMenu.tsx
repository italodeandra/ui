import React, { ComponentProps, Fragment } from "react";
import * as RDropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function DropdownMenuContent({
  className,
  children,
  sideOffset = 5,
  ...props
}: ComponentProps<typeof RDropdownMenu.Content>) {
  return (
    <RDropdownMenu.Portal>
      <RDropdownMenu.Content
        sideOffset={sideOffset}
        {...props}
        className={clsx("ui-dropdown-menu-content", className)}
      >
        {children}
        <RDropdownMenu.Arrow className="ui-dropdown-arrow" />
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
      className={clsx("ui-dropdown-menu-separator", className)}
    />
  );
}

function DropdownMenuItem({
  className,
  href,
  ...props
}: ComponentProps<typeof RDropdownMenu.Item> & { href?: string }) {
  let Wrapper = href ? Link : Fragment;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Wrapper {...(href ? ({ href } as any) : {})}>
      <RDropdownMenu.Item
        {...props}
        className={clsx("ui-dropdown-menu-item", className)}
      />
    </Wrapper>
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
      className={clsx("ui-dropdown-menu-checkbox-item", className)}
    >
      <RDropdownMenu.ItemIndicator className="ui-dropdown-menu-checkbox-item-indicator">
        <CheckIcon />
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
