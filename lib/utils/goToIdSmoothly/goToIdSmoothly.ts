import { MouseEvent } from "react";

/**
 * It scrolls smoothly to an element that the id is taken from the target of the
 * click event.
 */
export default function goToIdSmoothly(
  event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
): void {
  event?.preventDefault();
  const currentTarget = event.currentTarget;
  const parentNode = currentTarget?.parentNode as HTMLAnchorElement | undefined;
  const parentParentNode = parentNode?.parentNode as
    | HTMLAnchorElement
    | undefined;
  const hash =
    currentTarget?.getAttribute("href") ||
    parentNode?.getAttribute("href") ||
    parentParentNode?.getAttribute("href");
  const id = hash?.startsWith("#") ? hash.replace(/^.*#/, "") : null;
  const target = id && hash ? document.querySelector(hash) : document.body;
  if (target && id) {
    target.id = `${id}-tmp`;
  }
  if (hash) {
    window.location.hash = hash;
  }
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
    });
    target.id = id;
  }
}
