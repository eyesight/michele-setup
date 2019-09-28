import Helper from './Helper';

class Menu {
  constructor() {
    console.log('menu');
    this.hamburger = document.querySelector('.main-navigation__burger');
    this.removeClassResponsively('navigation--in', window.matchMedia('(min-width: 768px)'), window);
    if(this.hamburger){
      this.bindEvents();
    }
  }

  bindEvents() {
    this.hamburger.addEventListener('click', e => {
      this.toggleHamburger(this.hamburger);
    });
  }

  toggleHamburger(burger) {
		console.log(burger);
    let toggleContainer = burger.getAttribute('data-toggles-nav');
    let menu = document.querySelector(`.${toggleContainer}`);

    if (Helper.hasClass(burger, 'animate--in')) { 
      Helper.removeClass(document.querySelector('body'), 'menu-open');
      // Helper.slideUp(menu);
      Helper.removeClass(menu, 'navigation--in');
      Helper.addClass(menu, 'navigation--out');
      Helper.removeClass(burger, 'animate--in');
      Helper.addClass(burger, 'animate--out');
    } else {
      Helper.addClass(document.querySelector('body'), 'menu-open');
      Helper.addClass(menu, 'navigation--in');
      Helper.removeClass(menu, 'navigation--out');
      // Helper.slideDown(menu);
      Helper.addClass(burger, 'animate--in');
      Helper.removeClass(burger, 'animate--out');
    }
  }

  removeClassResponsively(removableClass, breakpoint, window) {
    function remove() {
			let el = document.querySelector(`.${removableClass}`);

      if (breakpoint.matches) {
				// If media query matches
				if(el){
					el.classList.remove(removableClass);
				}
      }
    }

    remove();
    window.addEventListener('resize', () => {
      remove();
		});

		window.addEventListener("orientationchange", () => {
			remove();
		}, false);
  }

  killMenu() {
    let burger = this.hamburger;

    Helper.removeClass(burger, 'animate--in');
    Helper.addClass(burger, 'animate--out');

    Helper.removeClass(document.querySelector('body'), 'menu-open');
  }
}

export default Menu;
