import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

const styles = {
  variants: {
    default: {
      root: "bg-yellow-50",
      icon: "text-yellow-400",
      title: "text-yellow-800",
      content: "text-yellow-700",
    },
    error: {
      root: "bg-red-50",
      icon: "text-red-400",
      title: "text-red-800",
      content: "text-red-700",
    },
    success: {
      root: "bg-green-50",
      icon: "text-green-400",
      title: "text-green-800",
      content: "text-green-700",
    },
  },
};

const icons: Record<keyof typeof styles["variants"], typeof XCircleIcon> = {
  default: ExclamationTriangleIcon,
  error: XCircleIcon,
  success: CheckCircleIcon,
};

export type AlertProps = {
  title: ReactNode;
  variant?: keyof typeof styles["variants"];
  children?: ReactNode;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "title"
>;

export default function Alert({
  variant = "default",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={clsx(
        "rounded-md p-4",
        styles.variants[variant].root,
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={clsx("h-5 w-5", styles.variants[variant].icon)}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3
            className={clsx(
              "text-sm font-medium",
              styles.variants[variant].title
            )}
          >
            {title}
          </h3>
          {children && (
            <div
              className={clsx("mt-2 text-sm", styles.variants[variant].content)}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
