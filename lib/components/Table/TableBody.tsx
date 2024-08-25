import { ReactNode, useMemo } from "react";
import TableHeadContext from "./TableHeadContext";
import clsx from "../../utils/clsx";

export type TableBodyProps = { children?: ReactNode; className?: string };

export default function TableBody({ children, className }: TableBodyProps) {
  return (
    <TableHeadContext.Provider
      value={useMemo(() => ({ isHead: false, sticky: false }), [])}
    >
      <tbody
        className={clsx(
          "divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-800 [&_tr:last-of-type]:border-b [&_tr:last-of-type]:border-zinc-200 [&_tr:last-of-type]:dark:border-zinc-700",
          className,
        )}
      >
        {children}
      </tbody>
    </TableHeadContext.Provider>
  );
}
