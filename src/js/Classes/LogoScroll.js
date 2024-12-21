import Helper from './Helper';

class LogoScroll {
  constructor() {
    this.body = document.querySelector('body');
    this.home = document.querySelector('.home');
    this.categoryPage = document.querySelector('.category');
    this.header = document.querySelector('.header');
    this.headerPlaceholder = document.querySelector('.header-placeholder');
    this.logo = document.querySelector('.logo-content');
    
    this.scrollFunction = this.scrollFunction.bind(this);
    this.bindEvents = this.bindEvents.bind(this);

    this.isHomeOrCategory = this.home || this.categoryPage;
    
    if(this.isHomeOrCategory){
      this.bindEvents();
      this.logobox = this.logo.getBoundingClientRect();
      this.logowidth = this.logo.clientWidth;
    }

    document.addEventListener('resize', function() {
      if(this.isHomeOrCategory){
        this.bindEvents();
      }
    });
  }
  
  bindEvents() {
    window.addEventListener("scroll", (e) => {
      if(window.matchMedia("(min-width: 769px)").matches){
        this.scrollFunction(this.header.clientHeight);
      }else{
          this.scrollFunctionMobile(this.header.clientHeight);
      }
   });

   this.addHeaderHeightToPlaceholder(this.header, this.headerPlaceholder);
  }

  scrollFunction(headerHeight) {
    const yposition = headerHeight + 20;
    if (this.isElementinViewport(this.logo, yposition)) {
      Helper.removeClass(this.body, 'logo-shrink');
    } else {
      Helper.addClass(this.body, 'logo-shrink');
    } 
  }

  scrollFunctionMobile(headerHeight) {
    const elem = document.querySelector('body');
    const el = elem.getBoundingClientRect();
    if (el.top <= -headerHeight){
      Helper.addClass(this.body, 'logo-shrink');
    }else{
      Helper.removeClass(this.body, 'logo-shrink');
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

  addHeaderHeightToPlaceholder(header, targetElement) {
    const headerHeight = header.offsetHeight;
    console.log(headerHeight);
    targetElement.style.height = `${headerHeight}px`;
  }
}

export default LogoScroll;
