/* istanbul ignore file */
// noinspection JSUnusedGlobalSymbols

/**
 * Tells if the current scope is a browser.
 */
export const isBrowser = typeof window !== "undefined";
/**
 * Tells if the current scope is a touch device.
 */
export const isTouchDevice =
  isBrowser &&
  (!!(
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      // @ts-ignore: "DocumentTouch" exists on touch devices only
      (window.DocumentTouch &&
        typeof document !== "undefined" &&
        // @ts-ignore: "DocumentTouch" exists on touch devices only
        document instanceof window.DocumentTouch))
  ) ||
    !!(
      typeof navigator !== "undefined" &&
      // @ts-ignore: "maxTouchPoints" exists on touch devices only
      (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
    ));

/**
 * Tells if the current scope is a iOS device.
 */
export const is_iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);
