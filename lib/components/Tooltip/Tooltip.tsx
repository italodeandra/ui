import * as RTooltip from "@radix-ui/react-tooltip";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import clsx from "../../utils/clsx";

function Tooltip(
  {
    children,
    content,
    side,
    delayDuration,
  }: {
    children?: ReactNode;
    content?: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    delayDuration?: number;
  },
  ref: ForwardedRef<HTMLButtonElement>,
) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <RTooltip.Provider>
      <RTooltip.Root delayDuration={delayDuration}>
        <RTooltip.Trigger asChild ref={ref}>
          {children}
        </RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            className={clsx(
              "z-20 rounded bg-zinc-950 px-2 py-1 text-center text-sm text-zinc-50 shadow",
              "dark:bg-zinc-50 dark:text-zinc-950",
              "will-change-[transform,opacity] data-[state=closed]:animate-fadeOut data-[state=delayed-open]:data-[side=bottom]:animate-elasticSlideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-elasticSlideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-elasticSlideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-elasticSlideDownAndFade",
            )}
            sideOffset={5}
            side={side}
          >
            {content}
            <RTooltip.Arrow className="fill-zinc-950 dark:fill-zinc-50" />
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}

export default forwardRef(Tooltip) as typeof Tooltip;
