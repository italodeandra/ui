import Drawer from "../Drawer";
import { ReactNode, useCallback } from "react";
import navigationDrawerState from "./navigationDrawer.state";
import { useSnapshot } from "valtio";
import clsx from "../../utils/clsx";

export default function NavigationDrawer({
  children,
  navigationChildren,
  position,
  title,
  noPadding,
  panelClassName,
}: {
  children: ReactNode;
  navigationChildren: ReactNode;
  position?: "left" | "right";
  title?: ReactNode;
  noPadding?: boolean;
  panelClassName?: string;
}) {
  const { isOpen } = useSnapshot(navigationDrawerState);

  const handleChangeOpen = useCallback((open: boolean) => {
    if (window.innerWidth <= 1024) {
      navigationDrawerState.setOpen(open);
    }
  }, []);

  return (
    <>
      <Drawer
        open={isOpen}
        onChangeOpen={handleChangeOpen}
        className="lg:hidden"
        position={position}
        title={title}
        noPadding={noPadding}
        panelClassName={panelClassName}
      >
        {navigationChildren}
      </Drawer>
      <div
        className={clsx(
          "fixed left-0 top-0 z-10 hidden h-full w-full max-w-xs flex-1 overflow-y-auto px-4 py-4 pt-20 lg:block",
          "bg-zinc-100/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-zinc-100/75",
          "dark:bg-zinc-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-zinc-900/75",
          "transition-transform",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          },
          panelClassName,
        )}
      >
        {navigationChildren}
      </div>
      <div
        className={clsx(
          "flex min-h-screen flex-col ring-offset-zinc-100 transition-all duration-300",
          {
            "lg:pl-80 lg:duration-150": isOpen,
          },
        )}
      >
        {children}
      </div>
    </>
  );
}
