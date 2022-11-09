import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import { ReactElement, ReactNode } from "react";
import { useMedia } from "react-use";
import Button from "../Button/Button";
import navigationDrawerState from "./navigationDrawer.state";
import defaultTheme from "tailwindcss/defaultTheme";

export default function NavigationItem({
  icon,
  children,
  href,
}: {
  icon?: ReactElement;
  children: ReactNode;
  href: string;
}) {
  let router = useRouter();
  let active = router.pathname === href;

  let isMobile = useMedia(`(max-width: ${defaultTheme.screens.lg})`, false);

  return (
    <Button
      variant="text"
      className={clsx("w-full !justify-start", {
        "bg-primary-300/20": active,
        "text-primary-600": active,
      })}
      leadingIcon={icon}
      href={href}
      onClick={isMobile ? navigationDrawerState.close : undefined}
    >
      {children}
    </Button>
  );
}
