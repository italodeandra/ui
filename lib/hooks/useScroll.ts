import { useEffect, useRef, useState } from "react";
import { isBrowser } from "../utils/isBrowser";

export function useIsScrolled() {
  return useScrollY() > 0;
}

export function useScrollY() {
  let [scrollY, setScrollY] = useState(isBrowser ? window.scrollY : 0);

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollY;
}

export function useScrollYMovement(
  max = Infinity,
  callback: (scrollYMovement: number) => void
) {
  const scrollYMovement = useRef(0);
  const previousScrollYMovement = useRef(0);

  useEffect(() => {
    function onScroll() {
      const movement = window.scrollY - previousScrollYMovement.current;
      scrollYMovement.current = scrollYMovement.current + movement;
      scrollYMovement.current =
        scrollYMovement.current > max
          ? max
          : scrollYMovement.current < 0 || window.scrollY <= 0
          ? 0
          : scrollYMovement.current;
      callback(scrollYMovement.current);
      previousScrollYMovement.current = window.scrollY;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [callback, max]);
}
