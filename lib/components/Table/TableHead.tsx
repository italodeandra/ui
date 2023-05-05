import { ReactNode, useMemo } from "react";
import TableHeadContext from "./TableHeadContext";

export type TableHeadProps = { children?: ReactNode };

export default function TableHead({ children }: TableHeadProps) {
  return (
    <TableHeadContext.Provider value={useMemo(() => ({ isHead: true }), [])}>
      <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-900">
        {children}
      </thead>
    </TableHeadContext.Provider>
  );
}
