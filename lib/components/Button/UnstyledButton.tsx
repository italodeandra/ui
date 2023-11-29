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
  as?: string;
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
  { href, as, ...props }: UnstyledButtonProps<Href>,
  ref: ForwardedRef<Href extends string ? HTMLAnchorElement : HTMLButtonElement>
) => {
  if (as) {
    let Component = as;
    return (
      <Component
        {...(props as UnstyledButtonProps<undefined>)}
        {...{
          ref,
        }}
      />
    );
  }

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
