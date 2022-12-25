import clsx from "clsx";
import { ReactNode } from "react";
import TableActionButton from "./TableActionButton";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";
import TableFooterWithPagination from "./TableFooterWithPagination";

export type TableProps = {
  children?: ReactNode;
  className?: string;
  dense?: boolean;
  hideBorder?: boolean;
};

export default function Table({
  children,
  className,
  dense,
  hideBorder,
}: TableProps) {
  return (
    <div
      className={clsx("overflow-x-auto", {
        "dense group": dense,
        "md:-mx-1 md:px-1": !hideBorder,
      })}
    >
      <div className="inline-block min-w-full py-2 align-middle ">
        <div
          className={clsx("overflow-hidden", {
            "shadow ring-1 ring-black/5 dark:ring-white/10 md:rounded-lg":
              !hideBorder,
          })}
        >
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
Table.Footer = TableFooter;
Table.FooterWithPagination = TableFooterWithPagination;
