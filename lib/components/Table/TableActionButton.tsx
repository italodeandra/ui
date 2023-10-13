import clsx from "clsx";
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import Button, { ButtonProps } from "../Button/Button";
import Tooltip from "../Tooltip/Tooltip";

export type TableActionButtonProps<Href extends string | undefined> = {
  title?: ReactNode;
  href?: string | null;
} & Omit<ButtonProps<Href>, "href">;

export default function TableActionButton<Href extends string | undefined>({
  children,
  className,
  title,
  onClick,
  ...props
}: TableActionButtonProps<Href>) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const button = (
    <Button
      icon
      variant="text"
      className={clsx("!p-1", className)}
      onClick={handleClick}
      {...props}
    >
      {cloneElement(children as ReactElement, {
        className: clsx(
          "!h-[20px] !w-[20px]",
          (children as ReactElement)?.props?.className
        ),
      })}
    </Button>
  );

  if (title) {
    return <Tooltip content={title}>{button}</Tooltip>;
  }

  return button;
}
