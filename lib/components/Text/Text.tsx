import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { ComponentProps } from "react";
import clsx from "clsx";
import NextLink from "next/link";

export const defaultTextStyles = {
  variant: {
    default: "text-gray-700",
    label: "text-gray-700 text-sm font-medium",
    secondary: "text-sm text-gray-500",
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
  ...props
}: TextProps<Inline, Href>) {
  className = clsx(
    defaultTextStyles.variant[variant],
    {
      [defaultTextStyles.variant.link]: !!href,
    },
    className
  );
  if (href) {
    return <NextLink href={href} {...(props as any)} className={className} />;
  }
  if (inline) {
    return <span {...props} className={className} />;
  }
  return <div {...(props as any)} className={className} />;
}
