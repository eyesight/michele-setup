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

    const imageWrappers = document.querySelectorAll(".hero-image__image");
    const footer = document.querySelector("footer");
    if (imageWrappers.length > 0 && footer) {
      let footerVisible = false;

      // Observe the footer visibility using IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            footerVisible = entry.isIntersecting;
          });
        },
        {
          root: null,
          threshold: 0, // trigger when any part of the footer enters view
        }
      );

      observer.observe(footer);

      // Scroll logic for each image
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const maxBlur = 10;

        imageWrappers.forEach((imageWrapper) => {
          // Apply blur based on scroll
          const blurValue = Math.min(scrollTop / 85, maxBlur);
          imageWrapper.style.filter = `blur(${blurValue}px)`;

          // Handle opacity when the footer is visible
          if (footerVisible) {
            const footerRect = footer.getBoundingClientRect();
            const fadeRange = 200; // pixels over which to fade out
            const footerOffset = window.innerHeight - footerRect.top;
            const fadeProgress = Math.min(Math.max(footerOffset / fadeRange, 0), 1);
            imageWrapper.style.opacity = 1 - fadeProgress;
          } else {
            imageWrapper.style.opacity = 1;
          }
        });
      });
    }
  });
})();   
