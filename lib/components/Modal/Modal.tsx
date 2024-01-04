import {
  cloneElement,
  ComponentPropsWithoutRef,
  CSSProperties,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Stack from "../Stack";
import Group from "../Group";
import Button from "../Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "../../utils/clsx";

export default function Modal({
  open,
  onClose,
  children,
  overlayClassName,
  panelClassName,
  dialogClassName,
  dialogOuterPanelClassName,
  dialogOverflowClassName,
  style,
}: {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
  dialogClassName?: string;
  dialogOuterPanelClassName?: string;
  dialogOverflowClassName?: string;
  style?: CSSProperties;
}) {
  let handleOnClose = useCallback(() => onClose?.(), [onClose]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsx("relative z-10", dialogClassName)}
        onClose={handleOnClose}
        style={style}
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
              "fixed inset-0 bg-white/75 transition-opacity dark:bg-black/75",
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
                  "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm dark:bg-zinc-900 dark:ring-1 dark:ring-white/5",
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

function ModalContainer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Stack className={clsx("!gap-4 px-4 pb-4 pt-5 sm:p-6", className)}>
      {children}
    </Stack>
  );
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
    <div
      className={clsx(
        "text-center text-sm text-zinc-500 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </div>
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
