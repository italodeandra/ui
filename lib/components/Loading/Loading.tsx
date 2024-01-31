import clsx from "../../utils/clsx";
import Group from "../Group";
import { useEffect, useState } from "react";
import ms from "ms";

export type LoadingProps = {
  className?: string;
  dotClassName?: string;
  debounce?: boolean | string;
};

export default function Loading({
  className,
  dotClassName,
  debounce,
}: LoadingProps) {
  let [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (debounce) {
      setTimeout(
        () => {
          setShouldRender(true);
        },
        ms(typeof debounce === "string" ? debounce : "1s"),
      );
    } else {
      setShouldRender(true);
    }
  }, [debounce]);

  dotClassName = clsx(
    "bg-[currentColor] w-1 h-1 rounded-full shrink-0",
    dotClassName,
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <Group
      className={clsx(
        "gap-0.5 opacity-20 transition items-center justify-center",
        className,
      )}
    >
      <div
        className={clsx(
          "animate-[pulsehide_2s_cubic-bezier(0.4,0,0.6,1)_infinite]",
          dotClassName,
        )}
      />
      <div
        className={clsx(
          "animate-[pulsehide_2s_cubic-bezier(0.4,0,0.6,1)_infinite_300ms]",
          dotClassName,
        )}
      />
      <div
        className={clsx(
          "animate-[pulsehide_2s_cubic-bezier(0.4,0,0.6,1)_infinite_600ms]",
          dotClassName,
        )}
      />
    </Group>
  );
}
