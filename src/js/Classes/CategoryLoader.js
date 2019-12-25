import Helper from './Helper';

class CategoryLoader {
  constructor() {
    this.filterButtonSelector = '.filter__button';
    this.buttonClicket = document.querySelectorAll('.filter__button');
    this.buttonClicketArray = Array.prototype.slice.call(this.buttonClicket);
    this.bodyEl = document.querySelector('body');
    
    this.categoryPage = document.querySelector('.category');

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
    //if user is on category-page, show only the elements of the category in the beginning
    if(this.categoryPage){
      let cat = this.getCurrentCategory(this.buttonClicketArray);
      this.togglePresent(this.filterArr, cat);
      this.hideItems(this.filteredItemsArray, this.filterArr);
    }
    
    this.showAllitems();
    this.buttonClicketArray.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const clickedButton = e.currentTarget;
        let currentCategory = clickedButton.getAttribute('data-filter-target');
        this.setActiveButton(clickedButton); 
        this.animateFilteredItems(this.filterArr);
        this.togglePresent(this.filterArr, currentCategory);
        setTimeout(()=>{
          this.hideItems(this.filteredItemsArray, this.filterArr);
        }, this.timeOutTime);
			});
		});
  }

  animateFilteredItems(arr){
    Helper.addClass(this.bodyEl, 'filter-hidden');
      setTimeout(()=>{
        Helper.addClass(this.bodyEl, 'filter-active');
        Helper.removeClass(this.bodyEl, 'filter-hidden');
        if(arr.length === 0){
          Helper.removeClass(this.bodyEl, 'filter-active');
        }
      }, this.timeOutTime);
  }

  showAllitems(){
    this.filteredItemsArray.forEach((item)=>{
      Helper.addClass(item, 'show');
      setTimeout(()=>{
        Helper.addClass(item, 'fade-in');
      }, this.timeOutTime);
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
        Helper.removeClass(item, 'hidden'); 
      }else{
        Helper.addClass(item, 'hidden');
      }
      allFilters.forEach(filter =>{
        let filterName = `tiles__filter--${filter}`;
        if(item.classList.contains(filterName)){
          Helper.removeClass(item, 'hidden');
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

  getCurrentCategory(buttons){
    let categoryName = '';
    buttons.forEach((name)=>{
        if(name.classList.contains('active')){
          categoryName = name.getAttribute('data-filter-target')
        }
    });
    return categoryName;
  }
}

export default CategoryLoader;
