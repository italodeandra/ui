import React, { ComponentProps, ReactElement, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import { CalendarIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import clsx from "../../utils/clsx";
import { useDeepCompareEffect } from "react-use";
import Popover from "../Popover";

export type { DateRange };

const classNames = {
  button: "justify-start pl-4 min-h-[38px]",
  months: "flex gap-2",
  caption: "text-center h-9 flex items-center justify-center mx-9",
  navButtonPrevious: "left-2 top-2",
  navButtonNext: "right-2 top-2",
  navButton: clsx(
    "absolute border rounded p-1.5 [&_svg]:w-3 [&_svg]:h-3 transition",
    "border-zinc-100 hover:bg-zinc-100 bg-white active:border-zinc-200",
    "dark:border-zinc-800 dark:hover:bg-zinc-800 dark:bg-zinc-900 dark:active:border-zinc-700",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ),
  head: "text-xs dark:text-zinc-500",
  headCell: "font-normal",
  day: clsx(
    "w-8 h-8 rounded transition",
    "text-zinc-700 hover:bg-black/10",
    "dark:text-zinc-300 dark:hover:bg-white/10",
    "disabled:opacity-30 disabled:cursor-not-allowed",
    "dark:disabled:opacity-20",
  ),
  dayRangeStart: clsx(
    "!text-onPrimary dark:!text-onPrimary",
    "bg-primary-500 hover:bg-primary-500/50",
    "dark:bg-primary-600 dark:hover:bg-primary-600/50",
  ),
  dayRangeEnd: clsx(
    "!text-onPrimary dark:!text-onPrimary",
    "bg-primary-500 hover:bg-primary-500/50",
    "dark:bg-primary-600 dark:hover:bg-primary-600/50",
  ),
  table: "border-spacing-y-1 border-separate",
  cell: clsx(
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
  ),
};

export default function DateRangePicker({
  value,
  onChangeValue,
  children,
  buttonProps,
  fromDate,
  toDate,
  min,
  max,
}: {
  value?: DateRange;
  onChangeValue?: (value?: DateRange) => void;
  children?: (value: string) => ReactElement;
  buttonProps?: ComponentProps<typeof Button>;
  fromDate?: Date;
  toDate?: Date;
  min?: number;
  max?: number;
}) {
  let [range, setRange] = useState<DateRange | undefined>(value);

  useDeepCompareEffect(() => {
    onChangeValue?.(range);
  }, [range || {}]);

  let buttonText = useMemo(() => {
    let buttonText = "";
    if (range?.from) {
      if (!range.to) {
        buttonText = dayjs(range.from).format("ll");
      } else if (range.to) {
        buttonText = `${dayjs(range.from).format("ll")} – ${dayjs(
          range.to,
        ).format("ll")}`;
      }
    }
    return buttonText;
  }, [range]);

  let children2 = children ? (
    children(buttonText)
  ) : (
    <Button
      {...buttonProps}
      leading={buttonProps?.leading || <CalendarIcon />}
      className={clsx(classNames.button, buttonProps?.className)}
    >
      {buttonText}
    </Button>
  );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children2}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <DayPicker
            mode="range"
            defaultMonth={value?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            showOutsideDays
            classNames={{
              months: classNames.months,
              caption: classNames.caption,
              nav_button_previous: classNames.navButtonPrevious,
              nav_button_next: classNames.navButtonNext,
              nav_button: classNames.navButton,
              head: classNames.head,
              head_cell: classNames.headCell,
              day: classNames.day,
              cell: classNames.cell,
              table: classNames.table,

              day_range_start: clsx(
                "ui-date-picker-day-range-start",
                classNames.dayRangeStart,
              ),
              day_range_end: clsx(
                "ui-date-picker-day-range-end",
                classNames.dayRangeEnd,
              ),

              day_outside: "ui-date-picker-day-outside",
              day_range_middle: "ui-date-picker-day-range-middle",
            }}
            fromDate={fromDate}
            toDate={toDate}
            min={min}
            max={max}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
