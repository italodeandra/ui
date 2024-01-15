import * as RPopover from "@radix-ui/react-popover";
import React, { ComponentProps, ForwardedRef, forwardRef } from "react";
import clsx from "../../utils/clsx";

function PopoverContentWithRef(
  {
    className,
    sideOffset = 4,
    children,
    ...props
  }: ComponentProps<typeof RPopover.Content>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <RPopover.Content
      {...props}
      className={clsx("ui-popover-content", className)}
      sideOffset={sideOffset}
      ref={ref}
    >
      {children}
      <PopoverArrow />
    </RPopover.Content>
  );
}

const PopoverContent = forwardRef(PopoverContentWithRef);

function PopoverArrow({
  className,
  ...props
}: ComponentProps<typeof RPopover.Arrow>) {
  return (
    <RPopover.Arrow
      {...props}
      className={clsx("ui-popover-arrow", className)}
    />
  );
}

const Popover = {
  Content: PopoverContent,
  Portal: RPopover.Portal,
  Root: RPopover.Root,
  Trigger: RPopover.Trigger,
  Arrow: PopoverArrow,
};

export default Popover;
