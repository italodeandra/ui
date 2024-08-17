import React, { useState } from "react";
import * as RSlider from "@radix-ui/react-slider";
import fakeArray from "../../utils/fakeArray";
import clsx from "../../utils/clsx";
import { useUpdateEffect } from "react-use";

export default function Slider({
  step = 1,
  max = 100,
  min = 0,
  className,
  value,
  onValueChange,
  thumbClassName,
}: {
  step?: number;
  max?: number;
  className?: string;
  thumbClassName?: string;
  min?: number;
  value?: number[];
  onValueChange?: (value: number[]) => void;
}) {
  const thumbs = value?.length || 1;
  const [intervalValue, setInternalValue] = useState<number[]>(
    fakeArray(thumbs).map((n) => 10 * n),
  );

  useUpdateEffect(() => {
    setInternalValue(value || fakeArray(thumbs).map((n) => 10 * n));
  }, [value]);
  useUpdateEffect(() => {
    onValueChange?.(intervalValue);
  }, [intervalValue, onValueChange]);

  return (
    <RSlider.Root
      className={clsx(
        "relative flex h-5 touch-none select-none items-center",
        className,
      )}
      value={intervalValue}
      max={max}
      onValueChange={setInternalValue}
      step={step}
      min={min}
    >
      <RSlider.Track className="relative h-[3px] grow rounded-full bg-black/30">
        <RSlider.Range className="absolute h-full rounded-full bg-primary-500" />
      </RSlider.Track>
      {fakeArray(thumbs).map((n) => (
        <RSlider.Thumb
          key={n}
          className={clsx(
            "block h-5 w-5 rounded-full bg-white shadow-md ring-primary-500 ring-offset-2 ring-offset-zinc-100 transition hover:bg-primary-500 focus:outline-none focus-visible:shadow-lg focus-visible:ring-2",
            thumbClassName,
          )}
        />
      ))}
    </RSlider.Root>
  );
}
