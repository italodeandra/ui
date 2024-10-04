import { focusManager } from "@tanstack/react-query";

focusManager.setEventListener((handleFocus) => {
  const listener = () => handleFocus();

  // Listen to visibilitychange
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("focus", listener, false);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("focus", listener);
    }
  };
});
