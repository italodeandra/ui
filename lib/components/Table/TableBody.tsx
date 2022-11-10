import { ReactNode, useMemo } from "react";
import TableHeadContext from "./TableHeadContext";

export type TableBodyProps = { children?: ReactNode };

export default function TableBody({ children }: TableBodyProps) {
  return (
    <TableHeadContext.Provider
      value={useMemo(() => ({ isHead: false, sticky: false }), [])}
    >
      <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
    </TableHeadContext.Provider>
  );
}
