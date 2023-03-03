import { ReactNode } from "react";

export type TableHeaderProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
};

export default function TableHeader({
  title,
  subtitle,
  children,
}: TableHeaderProps) {
  return (
    <div className="px-4 md:px-0">
      <div className="sm:flex sm:items-center">
        {title ||
          (subtitle && (
            <div className="sm:flex-auto">
              {title && (
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {subtitle}
                </p>
              )}
            </div>
          ))}
        {children && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">{children}</div>
        )}
      </div>
    </div>
  );
}
