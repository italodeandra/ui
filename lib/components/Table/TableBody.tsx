import { ReactNode, useMemo } from "react";
import TableHeadContext from "./TableHeadContext";

export type TableBodyProps = { children?: ReactNode };

export default function TableBody({ children }: TableBodyProps) {
  return (
    <TableHeadContext.Provider
      value={useMemo(() => ({ isHead: false, sticky: false }), [])}
    >
      <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-800">
        {children}
      </tbody>
    </TableHeadContext.Provider>
  );
}
