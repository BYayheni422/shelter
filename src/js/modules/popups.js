/* PopUp*/

const homePage = document.querySelector(".home");
if (homePage !== null) {
  const cards = document.querySelectorAll(".header__call");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  const popup = document.querySelector("#popup");
  let unlock = true;

  const timeout = 300;

  if (cards.length > 0) {
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      card.addEventListener("click", function (e) {
        popupOpen(popup);
        e.preventDefault();
      });
    }
  }
  const popupCloseIcon = document.querySelectorAll(".close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(popup) {
    if (popup && unlock) {
      const popupActive = document.querySelector(".popup.open");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      popup.classList.add("open");
      popup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector(".popup.open");
      popupClose(popupActive);
    }
  });

  document.querySelector("#popup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  });

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

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
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
}
