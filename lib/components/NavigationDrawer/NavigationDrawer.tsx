import Drawer from "../Drawer";
import { ReactNode } from "react";
import navigationDrawerState from "./navigationDrawer.state";
import { useSnapshot } from "valtio";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import defaultTheme from "tailwindcss/defaultTheme";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function NavigationDrawer({
  children,
  navigationChildren,
  position,
  title,
}: {
  children: ReactNode;
  navigationChildren: ReactNode;
  position?: "left" | "right";
  title?: ReactNode;
}) {
  let { isOpen, setOpen } = useSnapshot(navigationDrawerState);

  let isDesktop = useMediaQuery(`(min-width: ${defaultTheme.screens.lg})`);
  let isMobile = !isDesktop;

  return (
    <>
      <Drawer
        open={isMobile && isOpen}
        onClose={isMobile ? setOpen : undefined}
        className="lg:hidden"
        position={position}
        title={title}
      >
        {navigationChildren}
      </Drawer>
      <Transition
        className={clsx(
          "fixed left-0 top-0 z-10 hidden h-full w-full max-w-xs flex-1 overflow-y-auto px-4 py-4 pt-20 lg:block",
          "bg-zinc-100/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-zinc-100/75",
          "dark:bg-zinc-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-zinc-900/75"
        )}
        show={isOpen}
        enter="transition-transform duration-150"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {navigationChildren}
      </Transition>
      <div
        className={clsx(
          "flex min-h-screen flex-col ring-offset-gray-100 transition-all duration-300",
          {
            "pl-80 duration-150": isOpen && !isMobile,
          }
        )}
      >
        {children}
      </div>
    </>
  );
}
