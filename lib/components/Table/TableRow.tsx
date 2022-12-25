import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";

export type TableRowProps = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
};
export default function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={clsx({
        "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5": !!onClick,
      })}
    >
      {children}
    </tr>
  );
}
