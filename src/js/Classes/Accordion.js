import Helper from './Helper';

class Accordion {
  constructor(config = {}) {
    const {
      accordions,
    } = config;
    this.accordions = Array.prototype.slice.call(document.querySelectorAll(accordions));
    this.currentEl = null;
    if(this.accordions && this.accordions.length !== 0){
      this.bindEvents();
    }
  }

  bindEvents() {
    this.accordions.forEach(el => {
      el.addEventListener('click', (e) => {
        if(el.classList.contains('active')){
          Helper.slideClose(el.nextElementSibling);
          el.classList.remove('active');
        } else{
          el.classList.add('active');
          Helper.slideOpen(el.nextElementSibling, true);
        }
      });
    });
  }

}

export default Accordion;
