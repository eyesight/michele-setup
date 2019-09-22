// Bundle theme module
import LazyLoad from './lib/lazyload';
import Menu from './Classes/Menu';
import PostLoader from './Classes/PostLoader';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('test');
		new LazyLoad();
    const navigation = new Menu();

    const posts = new PostLoader({
			postLoaderSelector: '.js-load-more-posts',
			postContainerSelector: '.front-post',
			filterButtonSelector: '.filter__button',
			filterButtonDataAttribute: 'filter-target',
			postBoxSelector: '.post-list__post',
		});
  });
})();  
