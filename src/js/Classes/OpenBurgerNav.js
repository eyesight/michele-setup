import Helper from './Helper';

class OpenBurgerNav {
  constructor() {
    this.burger = document.querySelector('.js-burger');
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.headerPlaceholder = document.querySelector('.header-placeholder');

    if (this.burger) {
      this.bindEvents();
    }
    if (this.header && this.headerPlaceholder) {
      this.addHeaderHeightToPlaceholder(this.header, this.headerPlaceholder);
      window.addEventListener('resize', () => {
        this.addHeaderHeightToPlaceholder(this.header, this.headerPlaceholder);
      });
    }
  }

  bindEvents() {
    Helper.addClass(this.body, 'nav-is-in-dom');
    setTimeout(() => Helper.addClass(this.body, 'nav-is-visible'), 10);
    this.burger.addEventListener('click', e => {
      if (this.body.classList.contains('nav-is-open')) {
        Helper.removeClass(this.body, 'nav-is-open');
      } else {
        Helper.addClass(this.body, 'nav-is-open');
      }
    });
    this.lastScrollTop = 0;
    window.addEventListener("scroll", this.handleScrollDirection);
  }

  handleScrollDirection() {
    const body = document.body;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // Scrolling down
      body.classList.remove("scroll-down");
      setTimeout(() => {
        body.classList.remove("nav-is-in-dom");
      }, 750);
      body.classList.add("scroll-up");
    } else if (scrollTop < this.lastScrollTop) {
      // Scrolling up
      body.classList.remove("scroll-up");
      body.classList.add("nav-is-in-dom");
      setTimeout(() => {
        body.classList.add("scroll-down");
      }, 10);
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scrolling on mobile
  }

  addHeaderHeightToPlaceholder(header, targetElement) {
    const headerHeight = header.offsetHeight;
    targetElement.style.height = `${headerHeight}px`;
    targetElement.style.minHeight = `${headerHeight}px`;
  }
}

export default OpenBurgerNav;
