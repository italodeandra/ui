import type {
  ButtonHTMLAttributes,
  ComponentProps,
  DetailedHTMLProps,
  ForwardedRef,
  Ref,
} from "react";
import { forwardRef } from "react";
import NextLink from "next/link";

export type UnstyledButtonProps<Href extends string | undefined> = {
  href?: Href;
  target?: string;
  rel?: string;
  download?: string;
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
    return (
      <NextLink
        {...(props as unknown as UnstyledButtonProps<string>)}
        href={href}
        ref={ref as Ref<HTMLAnchorElement>}
      />
    );
  }

  return (
    <button
      {...(props as UnstyledButtonProps<undefined>)}
      ref={ref as Ref<HTMLButtonElement>}
    />
  );
};

export default forwardRef(UnstyledButton);
