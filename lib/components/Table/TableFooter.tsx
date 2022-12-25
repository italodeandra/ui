import { ReactNode } from "react";

export interface TableFooterProps {
  children?: ReactNode;
}

export default function TableFooter({ children }: TableFooterProps) {
  return (
    <div className="flex items-center justify-between border border-x-0 border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-zinc-900 sm:border-x sm:px-5 md:rounded-lg">
      {children}
    </div>
  );
}
