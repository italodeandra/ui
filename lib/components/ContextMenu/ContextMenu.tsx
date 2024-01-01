import React, { ComponentProps, Fragment } from "react";
import * as RContextMenu from "@radix-ui/react-context-menu";
import { CheckIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import clsx from "../../utils/clsx";

function ContextMenuContent({
  className,
  children,
  ...props
}: ComponentProps<typeof RContextMenu.Content>) {
  return (
    <RContextMenu.Portal>
      <RContextMenu.Content
        {...props}
        className={clsx("ui-context-menu-content", className)}
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
      className={clsx("ui-context-menu-separator", className)}
    />
  );
}

function ContextMenuItem({
  className,
  href,
  ...props
}: ComponentProps<typeof RContextMenu.Item> & { href?: string }) {
  let Wrapper = href ? Link : Fragment;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Wrapper {...(href ? ({ href } as any) : {})}>
      <RContextMenu.Item
        {...props}
        className={clsx("ui-context-menu-item", className)}
      />
    </Wrapper>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof RContextMenu.CheckboxItem>) {
  return (
    <RContextMenu.CheckboxItem
      {...props}
      className={clsx("ui-context-menu-checkbox-item", className)}
    >
      <RContextMenu.ItemIndicator className="ui-context-menu-checkbox-item-indicator">
        <CheckIcon />
      </RContextMenu.ItemIndicator>
      {children}
    </RContextMenu.CheckboxItem>
  );
}

const ContextMenu = {
  Root: RContextMenu.Root,
  Trigger: RContextMenu.Trigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  CheckboxItem: ContextMenuCheckboxItem,
};

export default ContextMenu;
