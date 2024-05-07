import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  HTMLProps,
  Ref,
} from "react";
import { forwardRef } from "react";
import NextLink from "next/link";

export type UnstyledButtonProps<T extends HTMLElement = HTMLButtonElement> = {
  href?: string | null;
  target?: string;
  rel?: string;
  download?: string;
  as?: string;
} & Omit<HTMLProps<T>, "ref" | "href">;

const UnstyledButton = <T extends HTMLElement = HTMLButtonElement>(
  { href, as, ...props }: UnstyledButtonProps<T>,
  ref: ForwardedRef<T>,
) => {
  if (as) {
    const Component = as;
    return (
      <Component
        {...props}
        {...{
          ref,
        }}
      />
    );
  }

  if (href) {
    const props2 = props as UnstyledButtonProps<HTMLAnchorElement>;
    return (
      <NextLink
        {...props2}
        href={href}
        ref={ref as Ref<HTMLAnchorElement>}
        tabIndex={props2.disabled ? -1 : undefined}
      />
    );
  }

  return (
    <button
      {...(props as DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >)}
      ref={ref as Ref<HTMLButtonElement>}
    />
  );
};

export default forwardRef(UnstyledButton);
