import clsx from "../../utils/clsx";
import { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from "react";

export type TableRowProps = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
  className?: string;
};

function TableRow(
  { children, onClick, className, ...props }: TableRowProps,
  ref: ForwardedRef<HTMLTableRowElement>,
) {
  return (
    <tr
      ref={ref}
      onClick={onClick}
      className={clsx(
        {
          "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5": !!onClick,
        },
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export default forwardRef(TableRow);
