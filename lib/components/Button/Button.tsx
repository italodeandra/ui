import UnstyledButton, { UnstyledButtonProps } from "./UnstyledButton";
import clsx from "../../utils/clsx";
import { cloneElement, ForwardedRef, forwardRef, ReactElement } from "react";
import Loading from "../Loading";

const styles = {
  root: clsx(
    "appearance-none select-none border transition-colors inline-flex items-center justify-center font-medium leading-4 focus:outline-none",
    "ring-offset-zinc-100 focus-visible:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    "dark:ring-offset-zinc-900",
  ),
  variant: {
    filled: "shadow-sm",
    light: "shadow-sm",
    outlined: "shadow-sm",
    text: "",
    custom: "",
  },
  color: {
    primary: "",
    success: "",
    error: "",
    gray: "",
    default: "",
  },
  variantColor: {
    "filled-primary":
      "bg-primary-500 hover:bg-primary-500/80 text-onPrimary border-transparent active:border-primary-700 dark:active:border-primary-300",
    "filled-success":
      "bg-success-500 hover:bg-success-500/80 text-white border-transparent active:border-success-700 dark:active:border-success-300",
    "filled-error":
      "bg-red-500 hover:bg-red-500/80 text-white border-transparent active:border-red-700 dark:active:border-red-300",
    "filled-gray":
      "bg-zinc-500 hover:bg-zinc-500/80 text-white border-transparent active:border-zinc-500 dark:active:border-zinc-400",
    "filled-default":
      "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-300 dark:hover:bg-zinc-400 text-zinc-900 border-transparent active:border-zinc-400 dark:active:border-zinc-300",

    "light-primary":
      "border-transparent text-primary-500 bg-primary-500/20 hover:bg-primary-500/30 active:border-primary-700",
    "light-success":
      "border-transparent text-success-500 bg-success-500/20 hover:bg-success-500/30 active:border-success-700",
    "light-error":
      "border-transparent text-error-500 bg-error-500/20 hover:bg-error-500/30 active:border-error-700",
    "light-gray":
      "border-transparent text-zinc-500 dark:text-zinc-300 bg-zinc-500/20 hover:bg-zinc-500/30 dark:hover:bg-zinc-400/30 active:border-zinc-700 dark:active:border-zinc-500",
    "light-default":
      "border-transparent dark:text-white bg-zinc-300/30 dark:bg-white/20 hover:bg-zinc-300/70 dark:hover:bg-white/30 active:border-zinc-400",

    "outlined-primary":
      "border-primary-500 text-primary-500 hover:bg-primary-500/10 active:border-primary-700",
    "outlined-success":
      "border-success-500 text-success-500 hover:bg-success-500/10 active:border-success-700",
    "outlined-error":
      "border-error-500 text-error-500 hover:bg-error-500/10 active:border-error-700",
    "outlined-gray":
      "border-zinc-400 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-500/10 active:border-zinc-700",
    "outlined-default":
      "dark:text-white border-zinc-300 dark:border-zinc-600 dark:hover:bg-white/5 hover:bg-zinc-500/5 active:border-zinc-500 dark:active:border-white",

    "text-primary":
      "text-primary-500 hover:bg-primary-500/5 border-transparent active:border-primary-500",
    "text-success":
      "text-success-500 hover:bg-success-500/5 border-transparent active:border-success-500",
    "text-error":
      "text-error-500 hover:bg-error-500/5 border-transparent active:border-error-500",
    "text-gray":
      "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-500/5 border-transparent active:border-zinc-500",
    "text-default":
      "hover:bg-zinc-500/5 dark:hover:bg-white/5 border-transparent active:border-zinc-500/50 dark:active:border-white/50",
  },
  disabled: "opacity-50 pointer-events-none",
  size: {
    xs: {
      button: "px-2 py-1 text-xs",
    },
    sm: {
      button: "px-2 py-1.5 text-sm",
    },
    md: {
      button: "px-3 py-2 text-sm",
    },
    lg: {
      button: "px-5 py-3 text-md",
    },
    xl: {
      button: "px-6 py-4 text-lg",
    },
  },
  icon: {
    xs: {
      button: "p-1.5",
      icon: "w-3 h-3",
      leading: "mr-1.5 -ml-0.5",
      trailing: "ml-1.5 -mr-0.5",
    },
    sm: {
      button: "p-1.5",
      icon: "w-4 h-4",
      leading: "mr-1.5 -ml-0.5",
      trailing: "ml-1.5 -mr-0.5",
    },
    md: {
      button: "p-1.5",
      icon: "w-5 h-5",
      leading: "-my-0.5 mr-2 -ml-1.5",
      trailing: "-my-0.5 ml-2 -mr-1.5",
    },
    lg: {
      button: "p-2",
      icon: "w-6 h-6",
      leading: "-my-1 mr-3 -ml-3",
      trailing: "-my-1 ml-3 -mr-3",
    },
    xl: {
      button: "p-2.5",
      icon: "w-7 h-7",
      leading: "-my-2 mr-4 -ml-3.5",
      trailing: "-my-2 ml-4 -mr-3.5",
    },
  },
};

export type ButtonProps<T extends HTMLElement = HTMLButtonElement> = Omit<
  UnstyledButtonProps<T>,
  "size"
> & {
  variant?: keyof (typeof styles)["variant"];
  color?: keyof (typeof styles)["color"] | "white";
  size?: keyof (typeof styles)["size"];
  icon?: boolean;
  leadingIcon?: ReactElement;
  leading?: ReactElement;
  trailingIcon?: ReactElement;
  trailing?: ReactElement;
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
};

const Button = <T extends HTMLElement = HTMLButtonElement>(
  {
    variant = "outlined",
    color = "default",
    size = "md",
    className,
    icon,
    type = "button",
    leadingIcon,
    leading,
    trailingIcon,
    trailing,
    children,
    loading,
    disabled,
    rounded,
    ...props
  }: ButtonProps<T>,
  ref: ForwardedRef<T>,
) => {
  if (color === "white") {
    color = "default";
    console.error(
      `[Button] Color "white" was deprecated. Change to "default".`,
    );
  }
  if (trailingIcon) {
    trailing = trailingIcon;
    console.error(
      `[Button] Property "trailingIcon" was deprecated. Change to "trailing".`,
    );
  }
  if (leadingIcon) {
    leading = leadingIcon;
    console.error(
      `[Button] Property "leadingIcon" was deprecated. Change to "leading".`,
    );
  }

  if (loading) {
    if (icon) {
      children = (
        <Loading className={clsx(styles.icon[size].icon, "text-inherit")} />
      );
    } else {
      trailing = (
        <Loading className={clsx(styles.icon[size].icon, "text-inherit")} />
      );
    }
  }

  return (
    <UnstyledButton
      ref={ref}
      {...props}
      className={clsx(
        styles.root,
        styles.variant[variant],
        variant !== "custom" && styles.color[color],
        variant !== "custom" && styles.variantColor[`${variant}-${color}`],
        icon ? styles.icon[size].button : styles.size[size].button,
        rounded ? "rounded-full" : "rounded",
        {
          [styles.disabled]: disabled,
        },
        className,
      )}
      type={type}
      disabled={disabled}
    >
      {leading &&
        cloneElement(leading, {
          className: clsx(
            "",
            styles.icon[size].icon,
            styles.icon[size].leading,
            leading?.props?.className,
          ),
        })}
      {!icon
        ? children
        : Array.isArray(children)
          ? children.map((child, key) =>
              cloneElement(child as ReactElement, {
                key,
                className: clsx(
                  styles.icon[size].icon,
                  (child as ReactElement)?.props?.className,
                ),
              }),
            )
          : cloneElement(children as ReactElement, {
              className: clsx(
                styles.icon[size].icon,
                (children as ReactElement)?.props?.className,
              ),
            })}
      {trailing &&
        cloneElement(trailing, {
          className: clsx(
            "",
            styles.icon[size].icon,
            styles.icon[size].trailing,
            trailing?.props?.className,
          ),
        })}
    </UnstyledButton>
  );
};

export default forwardRef(Button);
