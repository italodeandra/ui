import { ReactNode } from "react";
import clsx from "../../utils/clsx";
import Button, { ButtonProps } from "../Button";

export default function Tabs({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("ui-tabs", className)}>{children}</div>;
}

export function Tab({
  children,
  selected,
  onClick,
  className,
  ...props
}: Omit<ButtonProps, "variant"> & {
  selected?: boolean;
}) {
  return (
    <Button
      className={clsx("ui-tabs-tab", className)}
      onClick={onClick}
      data-selected={selected ? "" : undefined}
      variant="custom"
      {...props}
    >
      {children}
    </Button>
  );
}
