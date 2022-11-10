import UnstyledButton, { UnstyledButtonProps } from "./UnstyledButton";
import clsx from "clsx";
import { cloneElement, ForwardedRef, forwardRef, ReactElement } from "react";
import Loading from "../Loading/Loading";

const styles = {
  root: "select-none border transition-colors inline-flex items-center justify-center rounded-md px-4 py-3 sm:px-3 sm:py-2 sm:text-sm font-medium leading-4 focus:outline-none focus-visible:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  variant: {
    filled: "shadow-sm border-transparent",
    light: "shadow-sm border-transparent",
    outlined: "shadow-sm",
    text: "border-transparent",
  },
  color: {
    primary:
      "border-primary-500 active:border-primary-600 text-primary-700 hover:bg-primary-50",
    success:
      "border-success-500 active:border-success-600 text-success-700 hover:bg-success-50",
    error:
      "border-error-500 active:border-error-600 text-error-700 hover:bg-error-50",
    gray: "border-gray-300 active:border-gray-400 text-gray-700 hover:bg-gray-100",
  },
  variantColor: {
    "filled-primary":
      "bg-primary-500 text-onPrimary hover:bg-primary-500/80 active:bg-primary-500",
    "filled-success":
      "bg-success-500 text-onPrimary hover:bg-success-500/80 active:bg-success-500",
    "filled-error":
      "bg-error-500 text-onPrimary hover:bg-error-500/80 active:bg-error-500",
    "filled-gray":
      "bg-gray-300 text-gray-900 hover:bg-gray-300/75 active:bg-gray-300",

    "light-primary":
      "active:border-primary-300 bg-primary-500/30 hover:bg-primary-500/20",
    "light-success":
      "active:border-success-300 bg-success-500/30 hover:bg-success-500/20",
    "light-error":
      "active:border-error-300 bg-error-500/30 hover:bg-error-500/20",
    "light-gray": "bg-gray-300/30 hover:bg-gray-300/20",

    "text-primary": "!border-transparent active:!border-primary-300",
    "text-success": "!border-transparent active:!border-success-300",
    "text-error": "!border-transparent active:!border-error-300",
    "text-gray": "!border-transparent active:!border-gray-300",

    "outlined-primary": "",
    "outlined-success": "",
    "outlined-error": "",
    "outlined-gray": "",
  },
  icon: "px-3 sm:px-2",
};

export type ButtonProps<Href extends string | undefined> =
  UnstyledButtonProps<Href> & {
    variant?: keyof typeof styles["variant"];
    color?: keyof typeof styles["color"];
    icon?: boolean;
    leadingIcon?: ReactElement;
    trailingIcon?: ReactElement;
    loading?: boolean;
  };

const Button = <Href extends string | undefined>(
  {
    variant = "outlined",
    color = ["outlined", "text"].includes(variant) ? "gray" : "primary",
    className,
    icon,
    type = "button",
    leadingIcon,
    trailingIcon,
    children,
    loading,
    ...props
  }: ButtonProps<Href>,
  ref: ForwardedRef<Href extends string ? HTMLAnchorElement : HTMLButtonElement>
) => {
  if (loading) {
    trailingIcon = <Loading className="!text-inherit" />;
  }

  return (
    <UnstyledButton
      ref={ref}
      {...props}
      className={clsx(
        styles.root,
        styles.variant[variant],
        styles.color[color],
        styles.variantColor[`${variant}-${color}`],
        {
          [styles.icon]: icon,
        },
        className
      )}
      type={type}
    >
      {leadingIcon &&
        cloneElement(leadingIcon, {
          className: clsx("w-4 mr-2 -ml-0.5", leadingIcon?.props?.className),
        })}
      {!icon
        ? children
        : cloneElement(children as ReactElement, {
            className: clsx(
              "w-6",
              (children as ReactElement)?.props?.className
            ),
          })}
      {trailingIcon &&
        cloneElement(trailingIcon, {
          className: clsx("w-4 ml-2 -mr-0.5", trailingIcon?.props?.className),
        })}
    </UnstyledButton>
  );
};

export default forwardRef(Button);
