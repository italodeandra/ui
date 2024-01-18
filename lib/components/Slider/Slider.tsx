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
  let thumbs = value?.length || 1;
  let [intervalValue, setInternalValue] = useState<number[]>(
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
        "relative flex items-center select-none touch-none h-5",
        className,
      )}
      value={intervalValue}
      max={max}
      onValueChange={setInternalValue}
      step={step}
      min={min}
    >
      <RSlider.Track className="bg-black/30 relative grow rounded-full h-[3px]">
        <RSlider.Range className="absolute bg-primary-500 rounded-full h-full" />
      </RSlider.Track>
      {fakeArray(thumbs).map((n) => (
        <RSlider.Thumb
          key={n}
          className={clsx(
            "transition block w-5 h-5 bg-white shadow-md rounded-full hover:bg-primary-500 focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-zinc-100 ring-primary-500 focus-visible:shadow-lg",
            thumbClassName,
          )}
        />
      ))}
    </RSlider.Root>
  );
}
