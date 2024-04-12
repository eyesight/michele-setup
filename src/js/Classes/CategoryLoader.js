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

    this.handleScroll = this.handleScroll.bind(this);
    
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
        const currentCategory = clickedButton.getAttribute('data-filter-target');
        
        this.togglePresent(this.filterArr, currentCategory);
        this.setActiveButton(clickedButton, this.combinedButtonArray); 
        this.animateFilteredItems(this.filterArr);
        setTimeout(()=>{
          this.hideItems(this.filteredItemsArray, this.filterArr);
          this.handleScroll();
        }, this.timeOutTime);
			});
		});
    
    this.handleScroll();

    // Add scroll event listener to trigger animation
    window.addEventListener('scroll', this.handleScroll);
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
          Helper.removeClass(allButtons[i], 'active');
      }
    } else {
      for (let i = 0; i < allButtons.length; i++) {
        Helper.removeClass(allButtons[i], 'active');

        if (categoryOfClickedBtn === allButtons[i].getAttribute('data-filter-target')) {
            Helper.addClass(allButtons[i], 'active');
        }
      }
    }
  }
  
  hideItems(filteredItems, allFilters){
    filteredItems.forEach(item =>{
      Helper.removeClass(item, 'fade-in-scroll');
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
    const idx = arr.indexOf(el);

    if (idx === -1) {
        // If element not found, remove the first element if array is not empty
        // and push the new element
        arr.shift();
        arr.push(el);
    } else {
        // If element found, remove it from its current position
        arr.splice(idx, 1);
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

  // Function to check if an element is in the viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top + 50 <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  // Function to handle scroll event
  handleScroll() {
    const boxes = document.querySelectorAll('.tiles__item');

    boxes.forEach(function(box) {
        if (this.isInViewport(box)) {
            Helper.addClass(box, 'fade-in-scroll');
        }
    }, this);
  }
}

export default CategoryLoader;
