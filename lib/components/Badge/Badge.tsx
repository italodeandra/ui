import clsx from "clsx";
import Link from "next/link";
import { ElementType, MouseEventHandler, ReactNode, useCallback } from "react";

const colorMap = {
  primary: {
    badge:
      "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-100",
    button:
      "text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 hover:text-primary-500 dark:hover:text-primary-300 focus:bg-primary-500",
  },
};

const sizeMap = {
  badge: {
    sm: "py-0.5 px-2 text-xs rounded-xl",
    md: "py-0.5 px-2.5 text-sm rounded-xl",
    lg: "py-0.5 px-3 text-md rounded-2xl",
  },
  button: {
    sm: "-mr-1",
    md: "-mr-1.5",
    lg: "-mr-1.5",
  },
};

export default function Badge({
  color = "primary",
  size = "md",
  className,
  children,
  onActionClick,
  href,
  shallow,
}: {
  color?: keyof typeof colorMap;
  size?: keyof typeof sizeMap["badge"];
  className?: string;
  children: ReactNode;
  onActionClick?: () => void;
  href?: string;
  shallow?: boolean;
}) {
  const Component = href ? Link : ("span" as ElementType);

  const handleActionClick: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onActionClick?.();
    },
    [onActionClick]
  );

  return (
    <Component
      className={clsx(
        "inline-flex items-center py-0.5 font-medium",
        sizeMap.badge[size],
        colorMap[color].badge,
        className
      )}
      href={href}
      shallow={shallow}
    >
      {children}
      {onActionClick && (
        <button
          type="button"
          className={clsx(
            "ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none",
            sizeMap.button[size],
            colorMap[color].button
          )}
          onClick={handleActionClick}
        >
          <span className="sr-only">Delete</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </Component>
  );
}
