const scrolledScript = `
  window.addEventListener("scroll", () => {
    if (window.scrollY) {
      window.document.body.classList.add("scrolled")
    } else {
      window.document.body.classList.remove("scrolled")
    }
  })
`;

export default scrolledScript;
