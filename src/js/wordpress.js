// Bundle theme module
import CategoryLoader from './Classes/CategoryLoader';
import ToTop from './Classes/ToTop';
import OpenBurgerNav from './Classes/OpenBurgerNav';
import Sticky from 'sticky-js';  // Import sticky-js

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    const categoriesLoader = new CategoryLoader();
    const toTop = new ToTop();
    const openBurgerNav = new OpenBurgerNav();
    const sticky = new Sticky('.sticky');

    const videoOverlay = document.querySelector(".hero-image--placeholder");
    const videoIframe = document.querySelector(".hero-video iframe");

    if (videoOverlay && videoIframe) {
      let originalSrc = videoIframe.getAttribute("src"); // Store original src without autoplay

      videoOverlay.addEventListener("click", function () {
        let currentSrc = videoIframe.getAttribute("src");

        if (currentSrc.includes("autoplay=1")) {
          // Remove autoplay and reload iframe to stop video
          let newSrc = currentSrc.replace("&autoplay=1", "").replace("?autoplay=1", "");
          videoIframe.setAttribute("src", newSrc);
        } else {
          // Add autoplay=1 to start video
          let newSrc = originalSrc.includes("?") ? originalSrc + "&autoplay=1" : originalSrc + "?autoplay=1";
          videoIframe.setAttribute("src", newSrc);
        }
      });
    }
  });
})();   
