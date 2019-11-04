// Bundle theme module
import LazyLoad from './lib/lazyload';
import Menu from './Classes/Menu';
import CategoryLoader from './Classes/CategoryLoader';
import VideoPlay from './Classes/VideoPlay';
import PostTitleLoader from './Classes/PostTitleLoader';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
		new LazyLoad();
	const navigation = new Menu();
	
  const categoriesLoader = new CategoryLoader();
  
  const  videoPlay = new VideoPlay(); 

  const postTitleLoader = new PostTitleLoader({
    postContainerSelector: '.tiles',
    postSelector: '.tiles__item',
    titleSelector: '.tiles__item-title', 
    postId: 'data-id'
  });

  });
})();   
