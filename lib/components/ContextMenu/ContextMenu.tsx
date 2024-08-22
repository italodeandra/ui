import React, { ComponentProps, Fragment } from "react";
import * as RContextMenu from "@radix-ui/react-context-menu";
import { CheckIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import clsx from "../../utils/clsx";
import {
  dropdownCheckboxItemClassName,
  dropdownItemClassName,
  dropdownItemIndicatorClassName,
  dropdownSeparatorClassName,
  dropdownSubTriggerClassName,
} from "../../styles/Dropdown.classNames";
import { modalContentClassName } from "../../styles/Modal.classNames";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

function ContextMenuContent({
  className,
  children,
  ...props
}: ComponentProps<typeof RContextMenu.Content>) {
  return (
    <RContextMenu.Portal>
      <RContextMenu.Content
        {...props}
        className={clsx(
          modalContentClassName,
          "ui-context-menu-content",
          className,
        )}
      >
        {children}
      </RContextMenu.Content>
    </RContextMenu.Portal>
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof RContextMenu.Separator>) {
  return (
    <RContextMenu.Separator
      {...props}
      className={clsx(
        dropdownSeparatorClassName,
        "ui-context-menu-separator",
        className,
      )}
    />
  );
}

function ContextMenuItem({
  className,
  href,
  ...props
}: ComponentProps<typeof RContextMenu.Item> & { href?: string }) {
  const Wrapper = href ? Link : Fragment;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Wrapper {...(href ? ({ href } as any) : {})}>
      <RContextMenu.Item
        {...props}
        className={clsx(
          dropdownItemClassName,
          "ui-context-menu-item",
          className,
        )}
      />
    </Wrapper>
  );
}

function ContextMenuItemIndicator({
  className,
  ...props
}: ComponentProps<typeof RContextMenu.ItemIndicator>) {
  return (
    <RContextMenu.ItemIndicator
      className={clsx(
        dropdownItemIndicatorClassName,
        "ui-context-menu-checkbox-item-indicator",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  indicatorClassName,
  ...props
}: ComponentProps<typeof RContextMenu.CheckboxItem> & {
  indicatorClassName?: string;
}) {
  return (
    <RContextMenu.CheckboxItem
      {...props}
      className={clsx(
        dropdownCheckboxItemClassName,
        "ui-context-menu-checkbox-item",
        className,
      )}
    >
      <ContextMenuItemIndicator
        className={clsx(
          "ui-context-menu-checkbox-item-indicator",
          indicatorClassName,
        )}
      >
        <CheckIcon />
      </ContextMenuItemIndicator>
      {children}
    </RContextMenu.CheckboxItem>
  );
}

function ContextMenuSubContent({
  className,
  children,
  sideOffset = 2,
  alignOffset = -4,
  ...props
}: ComponentProps<typeof RContextMenu.SubContent>) {
  return (
    <RContextMenu.Portal>
      <RContextMenu.SubContent
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        {...props}
        className={clsx(
          modalContentClassName,
          "ui-context-menu-sub-content",
          className,
        )}
      >
        {children}
      </RContextMenu.SubContent>
    </RContextMenu.Portal>
  );
}

function ContextMenuSubTrigger({
  className,
  href,
  children,
  ...props
}: ComponentProps<typeof RContextMenu.SubTrigger> & { href?: string }) {
  const Wrapper = href ? Link : Fragment;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Wrapper {...(href ? ({ href } as any) : {})}>
      <RContextMenu.SubTrigger
        {...props}
        className={clsx(
          dropdownSubTriggerClassName,
          "ui-context-menu-sub-trigger",
          className,
        )}
      >
        {children}
        <div
          className={clsx(
            "absolute right-1.5 top-1.5 inline-flex items-center justify-center",
            "[&>svg]:h-4 [&>svg]:w-4",
          )}
        >
          <ChevronRightIcon />
        </div>
      </RContextMenu.SubTrigger>
    </Wrapper>
  );
}

const ContextMenu = {
  Root: RContextMenu.Root,
  Trigger: RContextMenu.Trigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  CheckboxItem: ContextMenuCheckboxItem,
  ItemIndicator: ContextMenuItemIndicator,
  Sub: RContextMenu.Sub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
};

export default ContextMenu;
