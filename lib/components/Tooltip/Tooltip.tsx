import * as RTooltip from "@radix-ui/react-tooltip";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import clsx from "../../utils/clsx";

function Tooltip(
  {
    children,
    content,
    side,
  }: {
    children?: ReactNode;
    content?: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
  },
  ref: ForwardedRef<HTMLButtonElement>,
) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <RTooltip.Provider>
      <RTooltip.Root>
        <RTooltip.Trigger asChild ref={ref}>
          {children}
        </RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            className={clsx(
              "z-20 rounded bg-zinc-900/95 px-2 py-1 text-center text-sm text-white",
              " data-[state=closed]:animate-fadeOut data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade will-change-[transform,opacity]",
            )}
            sideOffset={5}
            side={side}
          >
            {content}
            <RTooltip.Arrow className="fill-zinc-900/95" />
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}

export default forwardRef(Tooltip) as typeof Tooltip;
