import {
  cloneElement,
  ComponentPropsWithoutRef,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Stack from "../Stack/Stack";
import Group from "../Group/Group";
import clsx from "clsx";
import Button from "../Button/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({
  open,
  onClose,
  children,
  overlayClassName,
  panelClassName,
  dialogClassName,
  dialogOuterPanelClassName,
  dialogOverflowClassName,
}: {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
  dialogClassName?: string;
  dialogOuterPanelClassName?: string;
  dialogOverflowClassName?: string;
}) {
  let handleOnClose = useCallback(() => onClose?.(), [onClose]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsx("relative z-10", dialogClassName)}
        onClose={handleOnClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              "fixed inset-0 bg-zinc-500 !bg-opacity-75 transition-opacity dark:bg-zinc-800",
              overlayClassName
            )}
          />
        </Transition.Child>

        <div
          className={clsx(
            "fixed inset-0 z-10 overflow-y-auto",
            dialogOverflowClassName
          )}
        >
          <div
            className={clsx(
              "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
              dialogOuterPanelClassName
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-zinc-900 dark:ring-1 dark:ring-white/5 sm:my-8 sm:w-full sm:max-w-sm",
                  panelClassName
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Modal.Container = ModalContainer;

function ModalContainer({ children }: { children?: ReactNode }) {
  return <Stack className="!gap-4 px-4 pt-5 pb-4 sm:p-6">{children}</Stack>;
}

Modal.Title = ModalTitle;

function ModalTitle({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Title
      as="h3"
      className={clsx(
        "text-center text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </Dialog.Title>
  );
}

Modal.Content = ModalContent;

function ModalContent({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "text-center text-sm text-gray-500 dark:text-gray-400",
        className
      )}
    >
      {children}
    </p>
  );
}

Modal.Actions = ModalActions;

function ModalActions({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <Group className={className}>{children}</Group>;
}

Modal.Icon = ModalIcon;

function ModalIcon({ children }: { children?: ReactElement }) {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
      {children &&
        cloneElement(children, {
          className: "h-6 w-6 text-green-600 dark:text-green-400",
          "aria-hidden": "true",
        })}
    </div>
  );
}

Modal.CloseButton = ModalCloseButton;

function ModalCloseButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button
      icon
      className={clsx("absolute right-2 top-2", className)}
      variant="text"
      {...props}
    >
      <XMarkIcon />
    </Button>
  );
}
