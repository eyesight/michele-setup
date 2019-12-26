import Helper from './Helper';

class LogoScroll {
  constructor() {
    this.body = document.querySelector('body');
    this.home = document.querySelector('.home');
    this.categoryPage = document.querySelector('.category');
    this.header = document.querySelector('.header');
    this.logo = document.querySelector('.logo-content');
    this.logobox = this.logo.getBoundingClientRect();
    this.logowidth = this.logo.clientWidth;

    this.scrollFunction = this.scrollFunction.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    
    if(this.home || this.categoryPage){
      this.bindEvents();
    }
  }
  
  bindEvents() {
    window.addEventListener("scroll", (e) => {
      //let xx = headerHeight + this.logobox.height;
      //console.log(xx);
      this.scrollFunction(this.header.clientHeight);
   });
  }

  scrollFunction(headerHeight) {
    const yposition = headerHeight + 20;
    console.log(headerHeight);
    if (this.isElementinViewport(this.logo, yposition)) {
      Helper.removeClass(this.body, 'logo-shrink');
      console.log('ss');
    } else {
      console.log('tt');
      Helper.addClass(this.body, 'logo-shrink');
    } 
  }

  isElementinViewport(elem, positionTop = 0, positionLeft = 0){
    const el = elem.getBoundingClientRect();
    if (el.top >= positionTop && el.left >= positionLeft &&
      el.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      el.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default LogoScroll;
