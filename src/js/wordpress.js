// Bundle theme module
import LazyLoad from './lib/lazyload';
import Menu from './Classes/Menu';
import CategoryLoader from './Classes/CategoryLoader';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('test');
		new LazyLoad();
	const navigation = new Menu();
	
	const categoriesLoader = new CategoryLoader();

  });
})();   
