const scrolledScript = `
  window.addEventListener("scroll", () => {
    if (window.scrollY) {
      document.documentElement.classList.add("scrolled")
    } else {
      document.documentElement.classList.remove("scrolled")
    }
  })
`;

export default scrolledScript;
