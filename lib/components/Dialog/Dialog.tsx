import * as RDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../Button";
import clsx from "../../utils/clsx";

import { modalContentClassName } from "../../styles/Modal.classNames";

export interface DialogProps {
  title?: ReactNode;
  description?: ReactNode;
  contentClassName?: string;
  contentOverflowClassName?: string;
  closeButtonClassName?: string;
  overlayClassName?: string;
}

export default function Dialog({
  children,
  title,
  description,
  open,
  onOpenChange,
  contentClassName,
  contentOverflowClassName,
  closeButtonClassName,
  overlayClassName,
}: {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & DialogProps) {
  return (
    <RDialog.Root open={open} onOpenChange={onOpenChange}>
      <RDialog.Portal>
        <RDialog.Overlay
          className={clsx(
            "ui-dialog-overlay",
            "z-20 bg-black/50 fixed inset-0 flex items-center justify-center",
            "data-[state=open]:animate-slideUpAndFade data-[state=closed]:animate-fadeOut will-change-[opacity,transform]",
            overlayClassName,
          )}
        >
          <RDialog.Content
            className={clsx(
              modalContentClassName,
              "ui-dialog-content",
              "focus:outline-none relative p-0",
              contentClassName,
            )}
          >
            <div
              className={clsx(
                "flex flex-col gap-3 p-4 max-h-[85vh] w-[90vw] max-w-[450px] overflow-auto",
                contentOverflowClassName,
              )}
            >
              {title && (
                <RDialog.Title
                  className={clsx(
                    "ui-dialog-title",
                    "text-zinc-900 dark:text-zinc-50 text-lg font-medium -mb-1",
                  )}
                >
                  {title}
                </RDialog.Title>
              )}
              {description && (
                <RDialog.Description
                  className={clsx(
                    "ui-dialog-description",
                    "text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  {description}
                </RDialog.Description>
              )}
              {children}
              <RDialog.Close asChild>
                <Button
                  className={clsx(
                    "ui-dialog-close-button",
                    "absolute top-1 right-1",
                    closeButtonClassName,
                  )}
                  aria-label="Close"
                  variant="text"
                  icon
                  size="sm"
                >
                  <XMarkIcon />
                </Button>
              </RDialog.Close>
            </div>
          </RDialog.Content>
        </RDialog.Overlay>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
