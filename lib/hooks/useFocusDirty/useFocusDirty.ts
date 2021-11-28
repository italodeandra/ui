import { RefObject, useEffect, useState } from "react";
import { off, on } from "react-use/lib/misc/util";

// based on https://github.com/streamich/react-use/blob/master/src/useHoverDirty.ts
const useFocusDirty = (ref: RefObject<Element>, enabled = true): boolean => {
  if (process.env.NODE_ENV === "development") {
    if (typeof ref !== "object" || typeof ref.current === "undefined") {
      console.error("useFocusDirty expects a single ref argument.");
    }
  }

  const [value, setValue] = useState(false);

  useEffect(() => {
    const onFocus = (): void => setValue(true);
    const onBlur = (): void => setValue(false);

    if (enabled && ref && ref.current) {
      on(ref.current, "focus", onFocus);
      on(ref.current, "blur", onBlur);
    }

    // fixes react-hooks/exhaustive-deps warning about stale ref elements
    const { current } = ref;

    return () => {
      if (enabled && current) {
        off(current, "focus", onFocus);
        off(current, "blur", onBlur);
      }
    };
  }, [enabled, ref]);

  return value;
};

// noinspection JSUnusedGlobalSymbols
export default useFocusDirty;
