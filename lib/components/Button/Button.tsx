import UnstyledButton, { UnstyledButtonProps } from "./UnstyledButton";
import clsx from "clsx";
import { cloneElement, ForwardedRef, forwardRef, ReactElement } from "react";
import Loading from "../Loading/Loading";

const styles = {
  root: "select-none border border-transparent transition-colors inline-flex items-center justify-center rounded-md px-4 py-3 sm:px-3 sm:py-2 sm:text-sm font-medium leading-4 focus:outline-none focus-visible:ring-2 focus:ring-primary-500 focus:ring-offset-2 ring-offset-gray-100 dark:ring-offset-zinc-900",
  variant: {
    filled: "shadow-sm",
    light: "shadow-sm",
    outlined: "shadow-sm",
    text: "",
  },
  color: {
    primary: "",
    success: "",
    error: "",
    gray: "",
    white: "",
  },
  variantColor: {
    "filled-primary":
      "bg-primary-500 hover:bg-primary-500/80 text-white active:border-primary-700 dark:active:border-primary-300",
    "filled-success":
      "bg-success-500 hover:bg-success-500/80 text-white active:border-success-700 dark:active:border-success-300",
    "filled-error":
      "bg-red-500 hover:bg-red-500/80 text-white active:border-red-700 dark:active:border-red-300",
    "filled-gray":
      "bg-zinc-300 hover:bg-zinc-200 text-zinc-900 active:border-zinc-400 dark:active:border-zinc-600",
    "filled-white":
      "bg-white hover:bg-zinc-100 text-zinc-900 active:border-zinc-300 dark:active:border-zinc-700",

    "light-primary":
      "border-primary-500 text-primary-900 bg-primary-500/30 hover:bg-primary-500/40 active:border-primary-700",
    "light-success":
      "border-success-500 text-success-900 bg-success-500/30 hover:bg-success-500/40 active:border-success-700",
    "light-error":
      "border-error-400 text-error-900 bg-error-500/30 hover:bg-error-500/40 active:border-error-700",
    "light-gray":
      "border-zinc-400 bg-zinc-500/30 hover:bg-zinc-500/40 dark:hover:bg-zinc-500/10 active:border-zinc-700",
    "light-white":
      "border-white dark:text-white bg-white/30 dark:bg-white/20 hover:bg-white/70 dark:hover:bg-white/30 active:border-zinc-500",

    "outlined-primary":
      "border-primary-500 text-primary-700 hover:bg-primary-500/10 active:border-primary-700",
    "outlined-success":
      "border-success-500 text-success-700 hover:bg-success-500/10 active:border-success-700",
    "outlined-error":
      "border-error-500 text-error-700 hover:bg-error-500/10 active:border-error-700",
    "outlined-gray":
      "border-zinc-400 text-zinc-700 dark:text-zinc-400 hover:bg-zinc-500/10 active:border-zinc-700",
    "outlined-white":
      "dark:text-white border-zinc-300 dark:border-white/50 dark:hover:bg-white/5 hover:bg-zinc-500/5 active:border-zinc-500 dark:active:border-white",

    "text-primary":
      "text-primary-500 hover:bg-primary-500/10 active:border-primary-500",
    "text-success":
      "text-success-500 hover:bg-success-500/10 active:border-success-500",
    "text-error":
      "text-error-500 hover:bg-error-500/10 active:border-error-500",
    "text-gray":
      "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-500/10 active:border-zinc-500",
    "text-white":
      "dark:text-white hover:bg-zinc-500/5 dark:hover:bg-white/5 active:border-zinc-500/50 dark:active:border-white/50",
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
    color = ["outlined", "text"].includes(variant) ? "white" : "primary",
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
        : Array.isArray(children)
        ? children.map((child, key) =>
            cloneElement(child as ReactElement, {
              key,
              className: clsx("w-6", (child as ReactElement)?.props?.className),
            })
          )
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
