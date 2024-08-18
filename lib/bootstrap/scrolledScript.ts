const scrolledScript = `
  window.addEventListener("scroll", () => {
    if (window.scrollY) {
      document.documentElement.classList.add("scrolled")
    } else {
      document.documentElement.classList.remove("scrolled")
    }
  })
  
  const isTouchDevice =
    typeof window !== "undefined" &&
    (!!(
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        (window.DocumentTouch &&
          typeof document !== "undefined" &&
          document instanceof window.DocumentTouch))
    ) ||
      !!(
        typeof navigator !== "undefined" &&
        (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
      ));
  if (isTouchDevice) {
    document.documentElement.classList.add("touch")
  }
`;

export default scrolledScript;
