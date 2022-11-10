"use client";

import clsx from "clsx";
import { useIsScrolled, useScrollYMovement } from "../../hooks/useScroll";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { useRef } from "react";
import { useMedia } from "react-use";
import defaultTheme from "tailwindcss/defaultTheme";

export type HeaderProps = { hideOnScroll?: boolean } & DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export default function Header({
  className,
  hideOnScroll,
  ...props
}: HeaderProps) {
  let ref = useRef<HTMLElement>(null);
  let isScrolled = useIsScrolled();
  let isMobile = useMedia(`(max-width: ${defaultTheme.screens.md})`, false);
  useScrollYMovement(
    74,
    (scrollYMovement) => {
      if (ref.current) {
        ref.current.style.transform = `translateY(-${scrollYMovement}px)`;
      }
    },
    !hideOnScroll && !isMobile
  );

  return (
    <header
      ref={ref}
      {...props}
      className={clsx(
        "sticky top-0 z-10 flex h-16 items-center bg-white px-2.5 shadow-md shadow-slate-900/5 transition-colors duration-500 dark:shadow-none sm:px-4 md:px-6",
        isScrolled
          ? "dark:bg-white/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-white/75"
          : "dark:bg-transparent",
        className
      )}
    />
  );
}
