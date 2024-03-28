import clsx from "../utils/clsx";

export const dayPickerButtonClassName = "justify-start pl-4 min-h-[38px]";
export const dayPickerMonthsClassName = "flex gap-2";
export const dayPickerCaptionClassName =
  "text-center h-9 flex items-center justify-center mx-9";
export const dayPickerNavButtonPreviousClassName = "left-2 top-2";
export const dayPickerNavButtonNextClassName = "right-2 top-2";
export const dayPickerNavButtonClassName = clsx(
  "absolute border rounded p-1.5 [&_svg]:w-3 [&_svg]:h-3 transition",
  "border-zinc-100 hover:bg-zinc-100 bg-white active:border-zinc-200",
  "dark:border-zinc-800 dark:hover:bg-zinc-800 dark:bg-zinc-900 dark:active:border-zinc-700",
  "disabled:opacity-50 disabled:cursor-not-allowed",
);
export const dayPickerHeadClassName = "text-xs dark:text-zinc-500";
export const dayPickerHeadCellClassName = "font-normal";
export const dayPickerDayClassName = clsx(
  "w-8 h-8 rounded transition",
  "text-zinc-700 hover:bg-black/10",
  "dark:text-zinc-300 dark:hover:bg-white/10",
  "disabled:opacity-30 disabled:cursor-not-allowed",
  "dark:disabled:opacity-20",
);
export const dayPickerDayRangeStartClassName = clsx(
  "ui-date-picker-day-range-start",
  "!text-onPrimary dark:!text-onPrimary",
  "bg-primary-500 hover:bg-primary-500/50",
  "dark:bg-primary-600 dark:hover:bg-primary-600/50",
);
export const dayPickerDaySelectedClassName = clsx(
  "ui-date-picker-day-selected",
  "[&:not(.ui-date-picker-day-range-middle)]:!text-onPrimary dark:[&:not(.ui-date-picker-day-range-middle)]:!text-onPrimary",
  "[&:not(.ui-date-picker-day-range-middle)]:bg-primary-500 hover:[&:not(.ui-date-picker-day-range-middle)]:bg-primary-500/50",
  "dark:[&:not(.ui-date-picker-day-range-middle)]:bg-primary-600 dark:hover:[&:not(.ui-date-picker-day-range-middle)]:bg-primary-600/50",
);
export const dayPickerDayRangeEndClassName = clsx(
  "ui-date-picker-day-range-end",
  "!text-onPrimary dark:!text-onPrimary",
  "bg-primary-500 hover:bg-primary-500/50",
  "dark:bg-primary-600 dark:hover:bg-primary-600/50",
);
export const dayPickerTableClassName = "border-spacing-y-1 border-separate";
export const dayPickerCellClassName = clsx(
  "p-0",
  "has-[.ui-date-picker-day-outside]:opacity-40",
  "dark:has-[.ui-date-picker-day-outside]:opacity-30",

  "has-[.ui-date-picker-day-range-start]:rounded-l first:rounded-l",
  "has-[.ui-date-picker-day-range-start]:bg-black/5",
  "dark:has-[.ui-date-picker-day-range-start]:bg-white/10",

  "has-[.ui-date-picker-day-range-middle]:bg-black/5",
  "dark:has-[.ui-date-picker-day-range-middle]:bg-white/10",

  "has-[.ui-date-picker-day-range-end]:rounded-r last:rounded-r",
  "has-[.ui-date-picker-day-range-end]:bg-black/5",
  "dark:has-[.ui-date-picker-day-range-end]:bg-white/10",
);
export const dayPickerDayOutsideClassName = "ui-date-picker-day-outside";
export const dayPickerDayRangeMiddleClassName =
  "ui-date-picker-day-range-middle";

export const dayPickerClassNames = {
  months: dayPickerMonthsClassName,
  caption: dayPickerCaptionClassName,
  nav_button_previous: dayPickerNavButtonPreviousClassName,
  nav_button_next: dayPickerNavButtonNextClassName,
  nav_button: dayPickerNavButtonClassName,
  head: dayPickerHeadClassName,
  head_cell: dayPickerHeadCellClassName,
  day: dayPickerDayClassName,
  cell: dayPickerCellClassName,
  table: dayPickerTableClassName,
  day_range_start: dayPickerDayRangeStartClassName,
  day_selected: dayPickerDaySelectedClassName,
  day_range_end: dayPickerDayRangeEndClassName,
  day_outside: dayPickerDayOutsideClassName,
  day_range_middle: dayPickerDayRangeMiddleClassName,
};
