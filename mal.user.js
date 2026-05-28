// ==UserScript==
// @name         MyAnimeList Auto Unknown Date
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically keeps Unknown Date checked on MyAnimeList
// @author       Falaxonar
// @match        https://myanimelist.net/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function applyUnknownDates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => {
      const text =
        cb.parentElement?.textContent || cb.closest("td")?.textContent || "";

      if (text.includes("Unknown Date")) {
        if (!cb.checked) {
          cb.checked = true;
          cb.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    });
  }

  window.addEventListener("load", () => {
    applyUnknownDates();

    document.body.addEventListener("change", () => {
      setTimeout(applyUnknownDates, 50);
      setTimeout(applyUnknownDates, 200);
      setTimeout(applyUnknownDates, 500);
    });

    const observer = new MutationObserver(() => {
      applyUnknownDates();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
})();
