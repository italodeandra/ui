import * as RPopover from "@radix-ui/react-popover";
import React, { ComponentProps, ForwardedRef, forwardRef } from "react";
import clsx from "../../utils/clsx";
import {
  dropdownArrowClassName,
  dropdownContentClassName,
} from "../../styles/Dropdown.styles";

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
    <RPopover.Portal>
      <RPopover.Content
        {...props}
        className={clsx(
          dropdownContentClassName,
          "ui-popover-content",
          className,
        )}
        sideOffset={sideOffset}
        ref={ref}
      >
        {children}
        <PopoverArrow />
      </RPopover.Content>
    </RPopover.Portal>
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
      className={clsx(dropdownArrowClassName, "ui-popover-arrow", className)}
    />
  );
}

const Popover = {
  Content: PopoverContent,
  Root: RPopover.Root,
  Trigger: RPopover.Trigger,
  Arrow: PopoverArrow,
};

export default Popover;
