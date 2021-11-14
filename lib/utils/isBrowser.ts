/* istanbul ignore file */
// noinspection JSUnusedGlobalSymbols

/**
 * Tells if the current scope is a browser.
 */
export const isBrowser = typeof window !== "undefined";
/**
 * Tells if the current scope is a server.
 */
export const isServer = !isBrowser;
/**
 * Tells if the current scope is a touch device.
 */
export const isTouchDevice =
  isBrowser &&
  (!!(
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      // @ts-ignore
      (window.DocumentTouch &&
        typeof document !== "undefined" &&
        // @ts-ignore
        document instanceof window.DocumentTouch))
  ) ||
    !!(
      typeof navigator !== "undefined" &&
      // @ts-ignore
      (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
    ));
