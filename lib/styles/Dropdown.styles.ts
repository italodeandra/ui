import clsx from "../utils/clsx";

export const dropdownContentClassName = clsx(
  "ui-dropdown-content",
  "z-20 rounded overflow-hidden p-1 shadow-md text-sm ring-1",
  "bg-white shadow-black/5 ring-black/5",
  "dark:bg-zinc-900 dark:ring-white/10",
);

export const dropdownArrowClassName = clsx(
  "ui-dropdown-arrow",
  "mt-px",
  "fill-black/5",
  "dark:fill-white/[0.09]",
);

export const dropdownSeparatorClassName = clsx(
  "ui-dropdown-separator",
  "h-px my-1 mx-[6px]",
  "bg-zinc-100",
  "dark:bg-zinc-700/30",
);

export const dropdownItemClassName = clsx(
  "ui-dropdown-item",
  "relative rounded py-1 px-7 cursor-pointer outline-none select-none",
  "data-[highlighted]:bg-black/5",
  "dark:data-[highlighted]:bg-white/5",
);

export const dropdownLabelClassName = clsx(
  "ui-dropdown-label",
  "py-1 px-7 text-xs font-medium cursor-default text-zinc-500 outline-none",
);

export const dropdownCheckboxItemClassName = clsx(
  "ui-dropdown-checkbox-item",
  dropdownItemClassName,
);

export const dropdownCheckboxItemIndicatorClassName = clsx(
  "ui-dropdown-checkbox-item-indicator",
  "absolute left-1.5 top-1.5 inline-flex items-center justify-center",
  "[&>svg]:w-4 [&>svg]:h-4",
);
