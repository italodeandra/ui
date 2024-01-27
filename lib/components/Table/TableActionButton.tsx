import clsx from "../../utils/clsx";
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import Button, { ButtonProps } from "../Button/Button";
import Tooltip from "../Tooltip";

export type TableActionButtonProps<T extends HTMLElement = HTMLButtonElement> =
  {
    title?: ReactNode;
  } & ButtonProps<T>;

export default function TableActionButton<
  T extends HTMLElement = HTMLButtonElement,
>({
  children,
  className,
  title,
  onClick,
  ...props
}: TableActionButtonProps<T>) {
  const handleClick: MouseEventHandler<T> = (e) => {
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
          (children as ReactElement)?.props?.className,
        ),
      })}
    </Button>
  );

  if (title) {
    return <Tooltip content={title}>{button}</Tooltip>;
  }

  return button;
}
