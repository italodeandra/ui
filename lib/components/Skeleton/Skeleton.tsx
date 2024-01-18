import clsx from "../../utils/clsx";
import { ClassAttributes, HTMLAttributes } from "react";

export default function Skeleton({
  className,
  ...props
}: JSX.IntrinsicAttributes &
  ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded bg-zinc-300 dark:bg-zinc-700",
        className,
      )}
      {...props}
    />
  );
}
