import clsx from "clsx";
import { ReactNode } from "react";
import TableActionButton from "./TableActionButton";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export type TableProps = {
  children?: ReactNode;
  className?: string;
};

export default function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto md:-mx-1 md:px-1">
      <div className="inline-block min-w-full py-2 align-middle ">
        <div className="overflow-hidden shadow ring-1 ring-black/5 dark:ring-white/10 md:rounded-lg">
          <table
            className={clsx(
              "min-w-full divide-y divide-zinc-300 dark:divide-zinc-600",
              className
            )}
          >
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

Table.Row = TableRow;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Cell = TableCell;
Table.ActionButton = TableActionButton;
Table.Header = TableHeader;
