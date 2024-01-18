import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
} from "react";
import { ComponentProps } from "react";
import clsx from "../../utils/clsx";
import NextLink from "next/link";

export const defaultTextStyles = {
  variant: {
    default: "text-zinc-700 dark:text-zinc-200",
    label: "text-zinc-800 font-medium dark:text-zinc-100",
    secondary: "text-sm text-zinc-500 dark:text-zinc-400",
    link: "font-medium text-primary-500 hover:decoration-primary-500 underline decoration-2 decoration-primary-500/40 transition-colors",
  },
  size: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  },
};

export type TextProps<
  Inline extends boolean | undefined,
  Href extends string | undefined,
> = {
  variant?: keyof (typeof defaultTextStyles)["variant"];
  size?: keyof (typeof defaultTextStyles)["size"];
  inline?: Inline;
  href?: Href;
  target?: string;
  rel?: string;
} & (Href extends true
  ? ComponentProps<typeof NextLink>
  : Inline extends true
    ? DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    : DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>);

function Text<
  Inline extends boolean | undefined,
  Href extends string | undefined,
>(
  {
    inline,
    variant = "default",
    className,
    href,
    target,
    size = variant !== "label" ? "base" : "sm",
    ...props
  }: TextProps<Inline, Href>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  className = clsx(
    defaultTextStyles.variant[variant],
    defaultTextStyles.size[size],
    className,
  );
  if (href) {
    return (
      <NextLink
        ref={ref}
        href={href}
        target={target}
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        {...(props as any)}
        className={className}
      />
    );
  }
  if (inline) {
    return <span ref={ref} {...props} className={className} />;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div ref={ref} {...(props as any)} className={className} />;
}

export default forwardRef(Text);
