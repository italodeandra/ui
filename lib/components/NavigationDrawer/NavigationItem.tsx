import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import { cloneElement, ReactElement, ReactNode } from "react";
import { useMedia } from "react-use";
import Button from "../Button/Button";
import navigationDrawerState from "./navigationDrawer.state";
import defaultTheme from "tailwindcss/defaultTheme";

export default function NavigationItem({
  icon,
  children,
  href,
  exact,
  alternativeActiveHrefs,
}: {
  icon?: ReactElement;
  children: ReactNode;
  href: string;
  exact?: boolean;
  alternativeActiveHrefs?: string[];
}) {
  let router = useRouter();
  let active = exact
    ? router.pathname === href ||
      alternativeActiveHrefs?.some((href) => router.pathname === href)
    : router.pathname.includes(href) ||
      alternativeActiveHrefs?.some((href) => router.pathname.includes(href));

  let isMobile = useMedia(`(max-width: ${defaultTheme.screens.lg})`, false);

  return (
    <Button
      variant={active ? "light" : "text"}
      className={clsx("w-full !justify-start !border-transparent")}
      leading={
        icon &&
        cloneElement(icon, {
          className: clsx(icon.props?.className, "!w-5 mr-3"),
        })
      }
      href={href}
      onClick={isMobile ? navigationDrawerState.close : undefined}
    >
      {children}
    </Button>
  );
}
