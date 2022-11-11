import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import notificationsState from "./notifications.state";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../Button/Button";
import { cloneElement, ReactElement, ReactNode, useEffect } from "react";
import clsx from "clsx";

export default function Notifications() {
  let { notifications, remove, setRendered } = useSnapshot(notificationsState);

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
          ({ _id, dismissable, title, message, icon, actions }) => {
            if (typeof icon === "string") {
              icon = {
                success: <CheckCircleIcon className="!text-success-400" />,
                error: <ExclamationCircleIcon className="!text-error-400" />,
              }[icon];
            }

            return (
              <motion.li
                key={_id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    {icon && (
                      <div className="mr-2 flex-shrink-0 ">
                        {typeof icon === "string"
                          ? icon
                          : cloneElement(icon as ReactElement, {
                              className: clsx(
                                "h-6 w-6 text-gray-400",
                                icon.props?.className
                              ),
                              "aria-hidden": "true",
                            })}
                      </div>
                    )}
                    <div className="ml-1 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        {title || message}
                      </p>
                      {title && message && (
                        <p className="mt-1 text-sm text-gray-500">{message}</p>
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
                            className="h-5 w-5 text-gray-400"
                            aria-label="Close"
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          }
        )}
      </AnimatePresence>
    </ul>
  );
}
