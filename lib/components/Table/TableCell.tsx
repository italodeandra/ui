import clsx from "clsx";
import { ReactNode, useContext } from "react";
import TableHeadContext from "./TableHeadContext";

export type TableCellProps = {
  children?: ReactNode;
  className?: string;
  actions?: boolean;
  colSpan?: number;
};
export default function TableCell({
  children,
  className,
  actions,
  colSpan,
}: TableCellProps) {
  const { isHead } = useContext(TableHeadContext);

  const commonClassName = clsx(
    "text-sm first:pl-4 first:sm:pl-6 first:font-medium first:text-gray-900 px-3",
    className,
    {
      "py-3.5 last:pr-4 last:sm:pr-6": !actions,
      "py-0.5 text-right pr-2.5 sm:pr-5": actions,
    }
  );

  if (isHead) {
    return (
      <th
        className={clsx(
          commonClassName,
          "py-3.5 text-left font-semibold text-gray-900"
        )}
        colSpan={colSpan}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={clsx(commonClassName, "whitespace-nowrap py-4 text-gray-500")}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}
