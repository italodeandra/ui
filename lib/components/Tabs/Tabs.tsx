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
    <div className="relative">
      <Button
        className={clsx("ui-tabs-tab", className)}
        data-selected={selected ? "" : undefined}
        onClick={onClick}
        variant="custom"
        {...props}
      >
        {children}
      </Button>
      {selected && <div className="ui-tabs-indicator" />}
    </div>
  );
}
