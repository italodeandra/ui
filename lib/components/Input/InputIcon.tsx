import { cloneElement, ReactElement } from "react";
import clsx from "clsx";

export default function InputIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactElement;
}) {
  return cloneElement(children, {
    className: clsx("h-5 w-5", className),
  });
}
