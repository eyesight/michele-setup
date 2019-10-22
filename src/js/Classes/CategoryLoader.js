import Helper from './Helper';

class CategoryLoader {
  constructor() {
    this.filterButtonSelector = '.filter__button';
    this.buttonClicket = document.querySelectorAll('.filter__button');
    this.buttonClicketArray = Array.prototype.slice.call(this.buttonClicket);

    this.filteredItems = document.querySelectorAll('.tiles__item');
    this.filteredItemsArray = Array.prototype.slice.call(this.filteredItems);

    this.setActiveButton = this.setActiveButton.bind(this);
    
    this.filterArr = [];
    this.timeOutTime = 300;
    if(this.buttonClicket && this.buttonClicket.length > 0){
      this.bindEvents();
    }
  }

  bindEvents() {
    this.buttonClicketArray.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const clickedButton = e.currentTarget;
        //const dataValue = button.dataset.filterTarget;   
        let currentCategory = clickedButton.getAttribute('data-filter-target');
        this.setActiveButton(clickedButton); 
        this.togglePresent(this.filterArr, currentCategory);
        this.hideItems(this.filteredItemsArray, this.filterArr);
			});
		});
  }

  setActiveButton(clickedButton){ 
    if(clickedButton.classList.contains('active')){
      Helper.removeClass(clickedButton, 'active')
    }else{
      Helper.addClass(clickedButton, 'active');
    }
  }
  
  hideItems(filteredItems, allFilters){
    filteredItems.forEach(item =>{
      //when all filters are removed, then remove all classes hidden
      if(allFilters.length === 0){
        Helper.removeClass(item, 'hide-animation');
        setTimeout(()=>{ 
          Helper.removeClass(item, 'hidden');
        }, this.timeOutTime);
      }else{
        Helper.addClass(item, 'hide-animation');
        setTimeout(()=>{
          Helper.addClass(item, 'hidden');
        }, this.timeOutTime); 
      }
      allFilters.forEach(filter =>{
        let filterName = `tiles__filter--${filter}`;
        if(item.classList.contains(filterName)){
          Helper.removeClass(item, 'hide-animation');
          setTimeout(()=>{ 
            Helper.removeClass(item, 'hidden');
          }, this.timeOutTime);
        }
      });
    });
  }

  togglePresent(arr, el) {
    let idx = arr.indexOf(el);
    if (idx >= 0) {
      arr.splice(idx, 1);
    } else {
      arr.push(el);
    }
  }
}

export default CategoryLoader;
