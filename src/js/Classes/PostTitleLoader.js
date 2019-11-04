import Helper from './Helper';
import * as API from '../Constants/api';

class PostTitleLoader {
	constructor(config = {}) {
		const {
			postContainerSelector,
			postSelector,
			titleSelector,
			postId,
		} = config;
		this.postContainer = document.querySelector(postContainerSelector);
		this.titleSelector = titleSelector;
		this.lang = document.querySelector('html').getAttribute('lang').substring(0, 2);
		this.allPostSelector = document.querySelectorAll(postSelector);
		this.allPostSelectorArray = Array.prototype.slice.call(this.allPostSelector);
		this.allPostData = [];
		this.postId = postId;
		
		this.reg = 'placeholder="Titel">(.*?)<\/h1>';
		if(this.postContainer && this.allPostSelectorArray.length != 0){
			this.postsPerPage = 100;
			this.bindEvents();
		}
	}

	bindEvents() {		
		this.fetchPosts(this.postsPerPage);
	}

	fetchPosts(perPage) {
		let APIbase = API.posts;
		let fetchURL = `${APIbase}?lang=${this.lang}&_embed&per_page=${perPage}`;
		fetch(
			fetchURL, {
			mode: 'same-origin', // no-cors, cors, *same-origin
		})
			.then(this.handleErrors)
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.allPostData = data;
				this.allPostData.forEach(item => {
					const theId = item.id;
					this.allPostSelectorArray.forEach(post =>{
						const idOfPost = post.getAttribute(this.postId);
						if(idOfPost == theId){
							const found = item.content.rendered.match(this.reg);
							let titleText = '';
							if(found !== null){
								titleText = found[1];
							}else{
								titleText = item.title.rendered;
							}
							const node = document.createElement('span');    
							node.innerHTML = titleText;
							post.querySelector(this.titleSelector).appendChild(node);
						}
					});
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleErrors(response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}

}
export default PostTitleLoader;
