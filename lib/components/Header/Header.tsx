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
        "fixed top-0 z-10 flex h-16 w-full items-center px-2.5 shadow-none shadow-slate-900/5 ring-offset-gray-100 transition-colors duration-500 scrolled:shadow-md sm:px-4 md:px-6",
        "bg-white/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-white/75",
        "bg-white/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-white/75",
        "dark:bg-zinc-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-zinc-900/75",
        "not-scrolled:!bg-transparent",
        className
      )}
    />
  );
}
