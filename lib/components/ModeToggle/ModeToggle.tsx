import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Button from "../Button/Button";

export interface ModeToggleProps {
  ariaLabel?: string;
}

export function useModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none");
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 0);
  }

  function toggleMode() {
    disableTransitionsTemporarily();

    let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let isSystemDarkMode = darkModeMediaQuery.matches;
    let isDarkMode = document.documentElement.classList.toggle("dark");

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }
  }

  return toggleMode;
}

export function ModeToggle({
  ariaLabel = "Toggle dark mode",
}: ModeToggleProps) {
  let toggleMode = useModeToggle();

  return (
    <Button icon variant="text" aria-label={ariaLabel} onClick={toggleMode}>
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </Button>
  );
}
