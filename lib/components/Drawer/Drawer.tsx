import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import { Dialog as HuiDialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../Button/Button";
import Group from "../Group/Group";
import clsx from "clsx";

export type DialogProps = {
  open?: boolean;
  onClose?: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  position?: "left" | "right";
  actions?: ReactNode;
  hideOverlay?: boolean;
  className?: string;
};

export default function Drawer({
  open: defaultOpen,
  onClose,
  title,
  children,
  position = "left",
  actions,
  hideOverlay,
  className,
}: DialogProps) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (onClose && !open) {
      onClose(false);
    }
  }, [onClose, open]);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <HuiDialog
        as="div"
        className={clsx("relative z-20", className)}
        onClose={setOpen}
      >
        {!hideOverlay ? (
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 bg-opacity-75 transition-opacity" />
          </Transition.Child>
        ) : (
          <div className="fixed inset-0" />
        )}

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={clsx(
                "pointer-events-none fixed inset-y-0 flex max-w-full",
                {
                  ["left-0 pr-10"]: position === "left",
                  ["right-0 pl-10"]: position === "right",
                }
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom={
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }
                enterTo={
                  position === "right" ? "translate-x-0" : "translate-x-0"
                }
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom={
                  position === "right" ? "translate-x-0" : "translate-x-0"
                }
                leaveTo={
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }
              >
                <HuiDialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl dark:bg-zinc-900">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-6">
                      <div className="sticky top-0 z-10 bg-white/95 px-4 py-6 backdrop-blur sm:px-6 [@supports(backdrop-filter:blur(0))]:bg-white/50 dark:[@supports(backdrop-filter:blur(0))]:bg-zinc-900/75">
                        <div className="flex items-start">
                          {title && (
                            <HuiDialog.Title className="text-lg font-medium text-gray-900">
                              {title}
                            </HuiDialog.Title>
                          )}
                          <div className="flex-grow" />
                          <div className="ml-3 flex h-7 items-center">
                            <Button
                              icon
                              variant="text"
                              onClick={useCallback(() => setOpen(false), [])}
                            >
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 px-4 pt-1 sm:px-6">
                        {children}
                      </div>
                    </div>
                    {actions && (
                      <Group className="flex-shrink-0 justify-end px-4 py-4">
                        {actions}
                      </Group>
                    )}
                  </div>
                </HuiDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </HuiDialog>
    </Transition.Root>
  );
}
