import Helper from './Helper';

class OpenBurgerNav {
  constructor() {
    this.burger = document.querySelector('.js-burger');
    this.body = document.querySelector('body');

    if(this.burger){
      this.bindEvents();
    }
  }
  
  bindEvents() {
    this.burger.addEventListener('click', e => {
      if(this.body.classList.contains('nav-is-open')) {
        Helper.removeClass(this.body, 'nav-is-open');
      } else {
        Helper.addClass(this.body, 'nav-is-open');
      }
    });
  }
}

export default OpenBurgerNav;
