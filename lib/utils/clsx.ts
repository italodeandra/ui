import originalClsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function clsx(...args: Parameters<typeof originalClsx>) {
  return twMerge(originalClsx(...args));
}
