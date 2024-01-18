import React, { ComponentProps, Fragment } from "react";
import * as RDropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "../../utils/clsx";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  dropdownArrowClassName,
  dropdownCheckboxItemClassName,
  dropdownCheckboxItemIndicatorClassName,
  dropdownContentClassName,
  dropdownItemClassName,
  dropdownLabelClassName,
  dropdownSeparatorClassName,
} from "../../styles/Dropdown.styles";

function DropdownMenuContent({
  className,
  arrowClassName,
  children,
  sideOffset = 5,
  collisionPadding = 8,
  ...props
}: ComponentProps<typeof RDropdownMenu.Content> & { arrowClassName?: string }) {
  return (
    <RDropdownMenu.Portal>
      <RDropdownMenu.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        className={clsx(
          dropdownContentClassName,
          "ui-dropdown-menu-content",
          className,
        )}
      >
        {children}
        <RDropdownMenu.Arrow
          className={clsx(
            dropdownArrowClassName,
            "ui-dropdown-menu-arrow",
            arrowClassName,
          )}
        />
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
      className={clsx(
        dropdownSeparatorClassName,
        "ui-dropdown-menu-separator",
        className,
      )}
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
        className={clsx(
          dropdownItemClassName,
          "ui-dropdown-menu-item",
          className,
        )}
      />
    </Wrapper>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<typeof RDropdownMenu.Item>) {
  return (
    <RDropdownMenu.Item
      {...props}
      className={clsx(
        dropdownLabelClassName,
        "ui-dropdown-menu-label",
        className,
      )}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  indicatorClassName,
  ...props
}: ComponentProps<typeof RDropdownMenu.CheckboxItem> & {
  indicatorClassName?: string;
}) {
  return (
    <RDropdownMenu.CheckboxItem
      {...props}
      className={clsx(
        dropdownCheckboxItemClassName,
        "ui-dropdown-menu-checkbox-item",
        className,
      )}
    >
      <RDropdownMenu.ItemIndicator
        className={clsx(
          dropdownCheckboxItemIndicatorClassName,
          "ui-dropdown-menu-checkbox-item-indicator",
          indicatorClassName,
        )}
      >
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
  Label: DropdownMenuLabel,
};

export default DropdownMenu;
