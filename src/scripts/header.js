document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  if (header) {
    header.addEventListener("mouseenter", () => {
      header.classList.add("hovered");
    });

    header.addEventListener("mouseleave", () => {
      header.classList.remove("hovered");
    });
  }
});
