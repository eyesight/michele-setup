import Helper from './Helper';

class CategoryLoader {
  constructor() {
    this.filterButtonSelector = '.filter__button';
    this.buttonClicked = document.querySelectorAll('.filter__button');
    this.buttonClickedSmall = document.querySelectorAll('.tiles__cat-filter');
    this.buttonClickedArray = Array.prototype.slice.call(this.buttonClicked);
    this.buttonClickedSmallArray = Array.prototype.slice.call(this.buttonClickedSmall);
    // Combine the arrays
    this.combinedButtonArray = this.buttonClickedArray.concat(this.buttonClickedSmallArray);

    this.bodyEl = document.querySelector('body');
    
    this.categoryPage = document.querySelector('.category');

    this.filteredItems = document.querySelectorAll('.tiles__item');
    this.filteredItemsArray = Array.prototype.slice.call(this.filteredItems);

    this.setActiveButton = this.setActiveButton.bind(this);
    
    this.filterArr = [];
    this.timeOutTime = 300;
    if(this.buttonClicked && this.buttonClicked.length > 0){
      this.bindEvents();
    }
  }

  bindEvents() {
    //if user is on category-page, show only the elements of the category in the beginning
    if(this.categoryPage){
      const cat = this.getCurrentCategory(this.buttonClickedArray);
      this.togglePresent(this.filterArr, cat);
      this.hideItems(this.filteredItemsArray, this.filterArr);

      for (let i = 0; i < this.buttonClickedSmallArray.length; i++) {
        if (cat === this.buttonClickedSmallArray[i].getAttribute('data-filter-target')) {
            Helper.addClass(this.buttonClickedSmallArray[i], 'active');
        }
      }
    }
    
    this.showAllitems();
    this.combinedButtonArray.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const clickedButton = e.currentTarget;
        let currentCategory = clickedButton.getAttribute('data-filter-target');
        this.setActiveButton(clickedButton, this.combinedButtonArray); 
        this.togglePresent(this.filterArr, currentCategory);
        this.animateFilteredItems(this.filterArr);
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

  setActiveButton(clickedButton, allButtons){ 
    // If clicked btn has class active, then all btns with the same category will the active class be removed
    // if it is not active yet, all btn with the same category get the class active
    const categoryOfClickedBtn = clickedButton.getAttribute('data-filter-target');
    
    if(clickedButton.classList.contains('active')){
      for (let i = 0; i < allButtons.length; i++) {
        if (categoryOfClickedBtn === allButtons[i].getAttribute('data-filter-target')) {
            Helper.removeClass(allButtons[i], 'active');
        }
      }
    } else {
      for (let i = 0; i < allButtons.length; i++) {
        if (categoryOfClickedBtn === allButtons[i].getAttribute('data-filter-target')) {
            Helper.addClass(allButtons[i], 'active');
        }
      }
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
          categoryName = name.getAttribute('data-filter-target');
        }
    });
    return categoryName;
  }
}

export default CategoryLoader;
