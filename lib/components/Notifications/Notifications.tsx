import { AnimatePresence, motion, MotionStyle } from "framer-motion";
import { useSnapshot } from "valtio";
import notificationsState from "./notifications.state";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import { cloneElement, ReactElement, ReactNode, useEffect } from "react";
import clsx from "../../utils/clsx";

export default function Notifications({
  notificationClassName,
}: {
  notificationClassName?: string;
}) {
  const { notifications, remove, setRendered } =
    useSnapshot(notificationsState);

  useEffect(() => {
    setRendered(true);
    return () => {
      setRendered(false);
    };
  }, [setRendered]);

  return (
    <ul className="pointer-events-none fixed inset-0 z-30 flex flex-col items-center justify-end gap-3 px-4 py-6 sm:items-end sm:justify-start sm:p-6">
      <AnimatePresence initial={false}>
        {notifications.map(
          ({
            _id,
            dismissable,
            title,
            message,
            icon,
            actions,
            style,
            className,
          }) => {
            // noinspection SuspiciousTypeOfGuard
            if (typeof icon === "string") {
              icon = {
                success: <CheckCircleIcon className="!text-success-400" />,
                error: <ExclamationCircleIcon className="!text-error-400" />,
              }[icon];
            }

            // noinspection SuspiciousTypeOfGuard
            return (
              <motion.li
                key={_id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className={clsx(
                  "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10",
                  notificationClassName,
                  className,
                )}
                style={style as MotionStyle}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    {icon && (
                      <div className="mr-2 flex-shrink-0">
                        {typeof icon === "string"
                          ? icon
                          : cloneElement(icon as ReactElement, {
                              className: clsx(
                                "h-6 w-6 text-zinc-400 dark:text-zinc-600",
                                icon.props?.className,
                              ),
                              "aria-hidden": "true",
                            })}
                      </div>
                    )}
                    <div className="ml-1 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {title || (message as ReactNode)}
                      </p>
                      {title && message && (
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          {message as ReactNode}
                        </p>
                      )}
                      {actions && (
                        <div className="-m-3 mt-0 flex">
                          {actions as ReactNode}
                        </div>
                      )}
                    </div>
                    {dismissable && (
                      <div className="ml-4 flex flex-shrink-0">
                        <Button
                          icon
                          onClick={() => {
                            remove(_id);
                          }}
                          className="h-5 w-5 !p-0"
                          variant="text"
                        >
                          <XMarkIcon
                            className="h-5 w-5 text-zinc-400"
                            aria-label="Close"
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          },
        )}
      </AnimatePresence>
    </ul>
  );
}
