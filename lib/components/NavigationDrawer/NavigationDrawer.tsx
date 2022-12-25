import Drawer from "../Drawer/Drawer";
import { ReactNode } from "react";
import navigationDrawerState from "./navigationDrawer.state";
import { useSnapshot } from "valtio";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useMedia } from "react-use";
import defaultTheme from "tailwindcss/defaultTheme";

export default function NavigationDrawer({
  children,
  navigationChildren,
}: {
  children: ReactNode;
  navigationChildren: ReactNode;
}) {
  let { isOpen, setOpen } = useSnapshot(navigationDrawerState);

  let isDesktop = useMedia(`(min-width: ${defaultTheme.screens.lg})`, false);
  let isMobile = !isDesktop;

  return (
    <>
      <Drawer
        open={isMobile && isOpen}
        onClose={isMobile ? setOpen : undefined}
        className="lg:hidden"
      >
        {navigationChildren}
      </Drawer>
      <Transition
        className="fixed left-0 top-16 hidden h-full w-full max-w-xs flex-1 px-4 py-4 lg:block"
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
        className={clsx("ring-offset-gray-100 transition-all duration-300", {
          "pl-80 duration-150": isOpen && !isMobile,
        })}
      >
        {children}
      </div>
    </>
  );
}
