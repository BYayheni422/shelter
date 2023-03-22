const selectHeader = document.querySelectorAll(".menu-select");

selectHeader.forEach((el) => {
  const items = el.querySelectorAll(".menu-select__item");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.addEventListener("click", () => {
      el.classList.remove("open");
    });
  }

  el.querySelector(".menu-select__head").addEventListener("click", () => {
    el.classList.toggle("open");

    if (document.querySelector(".menu-select").classList.contains("open")) {
      document.addEventListener("keydown", (e) => {
        if (e.which === 27) {
          el.classList.remove("open");
        }
      });

      document.querySelector("body").addEventListener("click", (e) => {
        if (!e.target.closest(".menu-select")) {
          el.classList.remove("open");
        }
      });
    }
  });
});
