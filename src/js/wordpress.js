// Bundle theme module
import CategoryLoader from './Classes/CategoryLoader';
import ToTop from './Classes/ToTop';
import OpenBurgerNav from './Classes/OpenBurgerNav';
import Sticky from 'sticky-js';  // Import sticky-js

(function() {
  document.addEventListener('DOMContentLoaded', function() {
	
  const categoriesLoader = new CategoryLoader();
  const toTop = new ToTop();
  const openBurgerNav = new OpenBurgerNav();
  const sticky = new Sticky('.sticky');

  });
})();   
