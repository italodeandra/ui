"use client";

import clsx from "clsx";
import { useIsScrolled, useScrollYMovement } from "../../hooks/useScroll";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { useRef } from "react";

export default function Header({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const isScrolled = useIsScrolled();
  useScrollYMovement(74, (scrollYMovement) => {
    if (ref.current) {
      ref.current.style.transform = `translateY(-${scrollYMovement}px)`;
    }
  });

  return (
    <header
      ref={ref}
      {...props}
      className={clsx(
        "sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-md shadow-slate-900/5 transition-colors duration-500 dark:shadow-none",
        isScrolled
          ? "dark:bg-white/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-white/75"
          : "dark:bg-transparent",
        className
      )}
    />
  );
}
