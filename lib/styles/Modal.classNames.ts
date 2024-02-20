import clsx from "../utils/clsx";

export const modalContentClassName = clsx(
  "ui-modal-content",
  "z-20 rounded overflow-hidden p-1 shadow-md text-sm ring-1",
  "bg-white shadow-black/5 ring-black/5",
  "dark:bg-zinc-900 dark:ring-white/10",
  "data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut",
);

export const modalArrowClassName = clsx(
  "ui-modal-arrow",
  "fill-black/5",
  "dark:fill-white/[0.09]",
);
