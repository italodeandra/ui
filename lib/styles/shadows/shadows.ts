import type { Shadows } from "@mui/material/styles/shadows";

/** Based on Tailwind's "shadow-none" */
const none = "none";

/** Based on Tailwind's "shadow-sm" */
const sm =
  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";

/** Based on Tailwind's "shadow-sm" */
const normal =
  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px";

/** Based on Tailwind's "shadow-md" */
const md =
  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px";

/** Based on Tailwind's "shadow-lg" */
const lg =
  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px";

/** Based on Tailwind's "shadow-xl" */
const xl =
  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px";

/** Based on Tailwind's "shadow-2xl" */
const xxl =
  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px";

/**
 * Elevation shadows based on TailwindCSS.
 *
 * [Documentation](https://tailwindcss.com/docs/box-shadow)
 */
const shadows: Shadows = [
  none,
  sm,
  normal,
  md,
  lg,
  xl,
  xxl,
  none /* from here we don't have Tailwind shadows for it */,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
  none,
];

export default shadows;
