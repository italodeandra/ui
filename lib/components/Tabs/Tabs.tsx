import { ReactNode } from "react";
import clsx from "clsx";

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
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className="ui-tabs-tab"
      onClick={onClick}
      data-selected={selected ? "" : undefined}
    >
      {children}
    </button>
  );
}
