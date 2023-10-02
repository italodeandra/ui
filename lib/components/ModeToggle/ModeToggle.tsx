import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";
import useModeToggle from "./useModeToggle";

export interface ModeToggleProps {
  ariaLabel?: string;
  className?: string;
  iconClassName?: string;
}

const ModeToggle = forwardRef(function ModeToggle(
  { ariaLabel = "Toggle dark mode", className, iconClassName }: ModeToggleProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  let toggleMode = useModeToggle();

  return (
    <Button
      ref={ref}
      icon
      variant="text"
      aria-label={ariaLabel}
      onClick={toggleMode}
      className={className}
    >
      <SunIcon className={clsx("dark:hidden", iconClassName)} />
      <MoonIcon className={clsx("hidden dark:block", iconClassName)} />
    </Button>
  );
});

export default ModeToggle;
