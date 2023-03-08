import type { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";

export type GroupProps = {
  wrap?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Group({ wrap, className, ...props }: GroupProps) {
  return (
    <div
      {...props}
      className={clsx(
        "flex",
        {
          "gap-2": !className?.includes("gap-"),
        },
        {
          "flex-wrap": wrap,
        },
        className
      )}
    />
  );
}
