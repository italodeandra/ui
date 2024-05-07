import clsx from "../../utils/clsx";
import { useRouter } from "next/dist/client/router";
import { cloneElement, ReactElement, ReactNode } from "react";
import Button from "../Button";
import navigationDrawerState from "./navigationDrawer.state";
import defaultTheme from "tailwindcss/defaultTheme";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function NavigationItem({
  icon,
  children,
  href,
  exact,
  alternativeActiveHrefs,
  className,
  disabled,
}: {
  icon?: ReactElement;

  children: ReactNode;
  href: string;
  exact?: boolean;
  alternativeActiveHrefs?: string[];
  className?: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const active = exact
    ? router.pathname === href ||
      alternativeActiveHrefs?.some((href) => router.pathname === href)
    : router.pathname.includes(href) ||
      alternativeActiveHrefs?.some((href) => router.pathname.includes(href));

  const isMobile = useMediaQuery(`(max-width: ${defaultTheme.screens.lg})`);

  return (
    <Button
      variant={active ? "light" : "text"}
      className={clsx("w-full justify-start border-transparent", className)}
      leading={
        icon &&
        cloneElement(icon, {
          className: clsx(icon.props?.className, "!w-5 mr-3"),
        })
      }
      href={href}
      onClick={isMobile ? navigationDrawerState.close : undefined}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
