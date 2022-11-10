import { ReactNode, useMemo } from "react";
import TableHeadContext from "./TableHeadContext";

export type TableHeadProps = { children?: ReactNode };

export default function TableHead({ children }: TableHeadProps) {
  return (
    <TableHeadContext.Provider value={useMemo(() => ({ isHead: true }), [])}>
      <thead className="bg-gray-50">{children}</thead>
    </TableHeadContext.Provider>
  );
}
