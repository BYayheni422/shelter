/*Burger Menu*/
let isOpenBurger = false;
const lockPadding = document.querySelectorAll(".lock-padding");
const body = document.querySelector("body");
const logo = document.querySelector(".header__logo");

document
  .querySelector(".burger-wrapper")
  .addEventListener("click", function () {
    isOpenBurger = !isOpenBurger;
    document.querySelector(".burger").classList.toggle("open");
    document.querySelector(".header__menu").classList.toggle("open");

    toggleLogoStyle();
    toggleLockBody();
  });

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".header__menu").classList.remove("open");
    isOpenBurger = false;

    toggleLogoStyle();
    toggleLockBody();
  }
});

document.querySelectorAll(".menu__link").forEach((el) =>
  el.addEventListener("click", () => {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".header__menu").classList.remove("open");
    isOpenBurger = false;

    toggleLogoStyle();
    toggleLockBody();
  })
);

function toggleLockBody() {
  if (isOpenBurger) {
    bodyLock();
  } else {
    bodyUnLock();
  }
}

function toggleLogoStyle() {
  if (isOpenBurger) {
    logo.classList.add("burger-open");
  } else {
    logo.classList.remove("burger-open");
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector("body").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");
}

function bodyUnLock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }

    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, 300);
}

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
