import * as RDialog from "@radix-ui/react-dialog";
import { DialogContentProps } from "@radix-ui/react-dialog";
import { Fragment, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import clsx from "../../utils/clsx";

import { modalContentClassName } from "../../styles/Modal.classNames";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface DialogProps {
  title: ReactNode;
  description?: ReactNode;
  contentClassName?: string;
  contentOverflowClassName?: string;
  closeButtonClassName?: string;
  overlayClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  hideTitle?: boolean;
  contentProps?: Omit<DialogContentProps, "children">;
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
  titleClassName,
  descriptionClassName,
  hideTitle,
  contentProps,
}: {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & DialogProps) {
  const TitleWrapper = !hideTitle ? Fragment : VisuallyHidden;

  return (
    <RDialog.Root open={open} onOpenChange={onOpenChange}>
      <RDialog.Portal>
        <RDialog.Overlay
          className={clsx(
            "ui-dialog-overlay",
            "fixed inset-0 z-20 flex items-center justify-center bg-black/50",
            "will-change-[opacity,transform] data-[state=closed]:animate-fadeOut data-[state=open]:animate-slideUpAndFade",
            overlayClassName,
          )}
        >
          <RDialog.Content
            className={clsx(
              modalContentClassName,
              "ui-dialog-content",
              "relative p-0 focus:outline-none",
              contentClassName,
              contentProps?.className,
            )}
            {...(!description ? { "aria-describedby": undefined } : {})}
            {...contentProps}
          >
            <div
              className={clsx(
                "flex max-h-[85vh] w-[90vw] max-w-[450px] flex-col gap-3 overflow-auto p-4",
                contentOverflowClassName,
              )}
            >
              <TitleWrapper>
                <RDialog.Title
                  className={clsx(
                    "ui-dialog-title",
                    "text-lg font-medium leading-none text-zinc-900 dark:text-zinc-50",
                    titleClassName,
                  )}
                >
                  {title}
                </RDialog.Title>
              </TitleWrapper>
              {description && (
                <RDialog.Description
                  className={clsx(
                    "ui-dialog-description",
                    "text-zinc-700 dark:text-zinc-300",
                    descriptionClassName,
                  )}
                >
                  {description}
                </RDialog.Description>
              )}
              {children}
              <RDialog.Close asChild>
                <Button
                  className={clsx(
                    "absolute right-1 top-1 p-1.5",
                    "ui-dialog-close-button",
                    closeButtonClassName,
                  )}
                  aria-label="Close"
                  variant="text"
                  icon
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
