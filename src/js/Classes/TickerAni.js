import Helper from './Helper';

class TickerAni {
  constructor() {
    this.items = document.querySelectorAll('.animated-text__item');
    this.itemsArray = Array.prototype.slice.call(this.items);
    this.parent = document.querySelector('.animated-text__inner');
    this.addElement = this.addElement.bind(this);
    this.width = this.getTheWidth(this.itemsArray);

    this.isAllEl = false;
    this.parent.style.width = this.width;
    this.itemsArray.forEach((item)=>{
      this.moveElements(item);
    });
  }

/* 
  f(i) {
    i = (i + 1) % this.itemsArray.length;
    this.width = this.getTheWidth(this.itemsArray);
    this.addElement(this.itemsArray);
    this.moveElements(this.width);
    //setTimeout(this.f, 5000);
  }*/

  addElement(item) {
    console.log(item);
      let copy = item.cloneNode(true);
      Helper.addClass(copy, 'copy');
      this.parent.appendChild(copy);
      this.moveElements(copy);
  }

  removeElement(item){
      item.remove();
  }

  moveElements(elem) {
      let that = this;
      let pos = 0;
      let leftpos = elem.getBoundingClientRect().left;
      console.log('---------------');
      console.log(leftpos);
      console.log('---------------');
      let thewidth = (elem.offsetWidth + 30);
      let id = setInterval(frame, 10);
      function frame() {
        if (pos == thewidth) {
          elem.style.transform = 'translateX(0px)';
          that.addElement(elem);
          clearInterval(id);
        } else {
          pos++;
          elem.style.transform = 'translateX(-'+pos + 'px)';
        }
      }
  }

  getTheWidth(array) {
    let thewidth = 0;
    array.forEach((item) => {
      thewidth += (item.offsetWidth + 30);
    });
    return thewidth;
  }
 
}

export default TickerAni;
