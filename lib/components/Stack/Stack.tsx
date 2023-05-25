import type { DetailedHTMLProps, ForwardedRef, HTMLAttributes } from "react";
import clsx from "clsx";
import { forwardRef } from "react";

export type StackProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function Stack(
  { className, ...props }: StackProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col",
        {
          "gap-2": !className?.includes("gap-"),
        },
        className
      )}
      ref={ref}
    />
  );
}

export default forwardRef(Stack);
