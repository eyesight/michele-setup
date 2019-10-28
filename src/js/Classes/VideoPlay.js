import Helper from './Helper';

class VideoPlay {
  constructor() {
    this.hoverButton = document.querySelector('.title-h1__button');
    this.pageforofor = document.querySelector('.site-404');
    this.videoOn404 = document.querySelector('.video');

    if(this.pageforofor){
      this.bindEvents(); 
    }
  }

  bindEvents() {
    this.hoverButton.addEventListener('mouseover', e => {
      if(this.videoOn404.classList.contains('active')){
        Helper.removeClass(this.videoOn404, 'active')
      }else{
        Helper.addClass(this.videoOn404, 'active');
      }
    });
  }
}

export default VideoPlay;  
