"use client";

import clsx from "clsx";
import { useScrollYMovement } from "../../hooks/useScroll";
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
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
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = "";
    }
  }, [isMobile]);

  return (
    <header
      ref={ref}
      {...props}
      className={clsx(
        "fixed top-0 z-10 flex h-16 w-full items-center bg-white px-2.5 shadow-md shadow-slate-900/5 ring-offset-gray-100 transition-colors duration-500 dark:shadow-none sm:px-4 md:px-6",
        "scrolled:dark:bg-white/95 scrolled:dark:backdrop-blur scrolled:dark:[@supports(backdrop-filter:blur(0))]:bg-white/75",
        "not-scrolled:dark:bg-transparent",
        className
      )}
    />
  );
}
