import type {
  ButtonHTMLAttributes,
  ComponentProps,
  DetailedHTMLProps,
  ForwardedRef,
} from "react";
import { forwardRef } from "react";
import NextLink from "next/link";

export type UnstyledButtonProps<Href extends string | undefined> = {
  href?: Href;
} & Omit<
  Href extends string
    ? ComponentProps<typeof NextLink>
    : DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
  "ref"
>;

const UnstyledButton = <Href extends string | undefined>(
  { href, ...props }: UnstyledButtonProps<Href>,
  ref: ForwardedRef<Href extends string ? HTMLAnchorElement : HTMLButtonElement>
) => {
  if (href) {
    return <NextLink href={href} {...(props as any)} ref={ref} />;
  }

  return <button {...(props as any)} ref={ref} />;
};

export default forwardRef(UnstyledButton);
