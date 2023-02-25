import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { ComponentProps } from "react";
import clsx from "clsx";
import NextLink from "next/link";

export const defaultTextStyles = {
  variant: {
    default: "text-gray-700 hover:text-gray-700 dark:text-zinc-200",
    label: "text-gray-800 text-sm font-medium dark:text-zinc-100",
    secondary: "text-sm text-gray-500 dark:text-zinc-400",
    link: "font-medium text-primary-600 hover:text-primary-500",
  },
};

export type TextProps<
  Inline extends boolean | undefined,
  Href extends string | undefined
> = {
  variant?: keyof typeof defaultTextStyles["variant"];
  inline?: Inline;
  href?: Href;
  target?: string;
} & (Href extends true
  ? ComponentProps<typeof NextLink>
  : Inline extends true
  ? DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  : DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>);

export default function Text<
  Inline extends boolean | undefined,
  Href extends string | undefined
>({
  inline,
  variant = "default",
  className,
  href,
  target,
  ...props
}: TextProps<Inline, Href>) {
  className = clsx(
    defaultTextStyles.variant[variant],
    {
      [defaultTextStyles.variant.link]: !!href && variant === "default",
    },
    className
  );
  if (href) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
      <NextLink
        href={href}
        target={target}
        {...(props as any)}
        className={className}
      />
    );
  }
  if (inline) {
    return <span {...props} className={className} />;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div {...(props as any)} className={className} />;
}
