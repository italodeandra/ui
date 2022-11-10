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
        "cursor-pointer hover:bg-gray-50": !!onClick,
      })}
    >
      {children}
    </tr>
  );
}
