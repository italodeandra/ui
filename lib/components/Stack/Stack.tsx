import type { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";

export type StackProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Stack({ className, ...props }: StackProps) {
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
    />
  );
}
