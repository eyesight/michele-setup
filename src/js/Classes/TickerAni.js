class TickerAni {
  constructor() {
    this.items = document.querySelectorAll('.animated-text__item');
    this.itemsArray = Array.prototype.slice.call(this.items);
    this.parent = document.querySelector('.animated-text__inner');
    this.parent.style.width = this.width;
    this.moveElements(this.itemsArray[0]);
  }

  addElement(item) {
      let x = document.querySelectorAll('.animated-text__item');
      let xx = Array.prototype.slice.call(x);

      this.parent.appendChild(xx[0]);
      this.moveElements(xx[0]);
  }

  moveElements(elem) {
      let x = document.querySelectorAll('.animated-text__item');
      let xx = Array.prototype.slice.call(x);
      let that = this;
      let pos = 0;
      let thewidth = (xx[0].offsetWidth) + 30;
      let id = setInterval(frame, 25);
      function frame() {
        if (pos == thewidth) {
          that.parent.style.left = 0 - thewidth;
          that.addElement(elem);
          clearInterval(id);
        } else {
          pos++;
          that.parent.style.left = -pos + 'px';
        }
      }
  }
}

export default TickerAni;
