import React, { useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import * as Popover from "@radix-ui/react-popover";
import { CalendarIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import clsx from "../../utils/clsx";
import { useDeepCompareEffect } from "react-use";

export type { DateRange };

export default function DateRangePicker({
  value,
  onChangeValue,
}: {
  value?: DateRange;
  onChangeValue?: (value?: DateRange) => void;
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

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          leading={<CalendarIcon />}
          className="justify-start pl-4 min-h-[38px]"
        >
          {buttonText}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="ui-popover-content" sideOffset={5}>
          <DayPicker
            mode="range"
            defaultMonth={value?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            showOutsideDays
            classNames={{
              months: "rdp-months flex gap-2",
              caption:
                "rdp-caption text-center h-9 flex items-center justify-center mx-9",
              nav_button_previous: "rdp-nav_button_previous left-2 top-2",
              nav_button_next: "rdp-nav_button_previous right-2 top-2",
              nav_button: clsx(
                "rdp-nav_button absolute border rounded p-1.5 [&_svg]:w-3 [&_svg]:h-3 transition",
                "border-zinc-100 hover:bg-zinc-100 bg-white active:border-zinc-200",
                "dark:border-zinc-800 dark:hover:bg-zinc-800 dark:bg-zinc-900 dark:active:border-zinc-700",
              ),
              head: clsx("rdp-head text-xs", "dark:text-zinc-500"),
              head_cell: "rdp-head_cell font-normal",
              day: clsx(
                "rdp-day w-8 h-8 rounded transition",
                "text-zinc-700 hover:bg-black/10",
                "dark:text-zinc-300 dark:hover:bg-white/10",
              ),
              day_outside: clsx("rdp-day-outside"),
              day_range_start: clsx(
                "rdp-day-range-start",
                "bg-primary-500 hover:bg-primary-500/50",
                "dark:bg-primary-600 dark:hover:bg-primary-600/50",
              ),
              day_range_end: clsx(
                "rdp-day-range-end",
                "bg-primary-500 hover:bg-primary-500/50",
                "dark:bg-primary-600 dark:hover:bg-primary-600/50",
              ),
              day_range_middle: clsx("rdp-day-range-middle"),
              cell: clsx(
                "p-0",
                "has-[.rdp-day-outside]:opacity-40",
                "dark:has-[.rdp-day-outside]:opacity-30",

                "has-[.rdp-day-range-start]:rounded-l first:rounded-l",
                "has-[.rdp-day-range-start]:bg-black/5",
                "dark:has-[.rdp-day-range-start]:bg-white/10",

                "has-[.rdp-day-range-middle]:bg-black/5",
                "dark:has-[.rdp-day-range-middle]:bg-white/10",

                "has-[.rdp-day-range-end]:rounded-r last:rounded-r",
                "has-[.rdp-day-range-end]:bg-black/5",
                "dark:has-[.rdp-day-range-end]:bg-white/10",
              ),
              row: "rdp-row pt-2",
              table: "rdp-table border-spacing-y-1 border-separate",
            }}
          />
          <Popover.Arrow className="ui-popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
