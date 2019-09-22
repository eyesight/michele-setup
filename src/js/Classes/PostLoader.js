import Helper from './Helper';
import * as API from '../Constants/api';

class PostLoader {
	constructor(config = {}) {
		const {
			postLoaderSelector,
			postContainerSelector,
			filterButtonSelector,
			filterButtonDataAttribute,
			postBoxSelector,
			postBoxCount,
			type
		} = config;
		this.postLoader = document.querySelector(postLoaderSelector);
		this.postContainer = document.querySelector(postContainerSelector);
		this.lang = document.querySelector('html').getAttribute('lang').substring(0, 2);
		this.filterButtonSelector = filterButtonSelector;
		this.filterButton = document.querySelectorAll(filterButtonSelector);
		this.filterButtonArray = Array.prototype.slice.call(this.filterButton);
		this.filterButtonDataAttribute = filterButtonDataAttribute;
		this.postBoxSelector = postBoxSelector;
		this.postBox = document.querySelectorAll(this.postBoxSelector);
		this.postBoxArray = Array.prototype.slice.call(this.postBox);
		this.postBoxCount = postBoxCount || 6,
		this.type = type || 'posts',
		this.layoutArray = Array.prototype.slice.call(document.querySelectorAll('.post-list__layout'));

		this.pageNumber = 2;
		if(this.postContainer && this.filterButtonArray.length != 0){

			this.postsPerPage = 100;
			this.readMoreText = document.querySelector('.post-list__link .nhs-arrow-btn__text').innerText;

			this.loadInitialView();
			console.log(this.filterButtonDataAttribute);
			Helper.addClass(document.querySelector(`${this.filterButtonSelector}[data-${this.filterButtonDataAttribute}='reset']`), 'active');
			this.buildArchiveLinks();
			this.bindEvents();
		}
	}

	bindEvents() {
		console.log('sdfsdf	'); 
		this.postLoader.addEventListener('click', e => {
			this.loadMore();
			// this.loadMorePosts(this.postsPerPage, this.pageNumber);
		});

		this.filterButtonArray.forEach(button => {
			console.log(button);
      button.addEventListener('click', e => {
				const data = Helper.camelCase(this.filterButtonDataAttribute);
				const dataValue = button.dataset[data];
				const cat = button.dataset.categoryId;
				this.fetchPosts(this.postsPerPage, cat);
				this.setActiveButton(dataValue);
			});
		});
	}

	setActiveButton(dataVal){
		this.filterButtonArray.forEach(button => {
			Helper.removeClass(button, 'active');
		});
		Helper.addClass(document.querySelector(`${this.filterButtonSelector}[data-${this.filterButtonDataAttribute}=${dataVal}]`), 'active');
	}

	loadInitialView() {

		if(this.layoutArray.length){
			this.layoutArray.forEach(layout => {
				Helper.addClass(layout, 'hidden');
			});
		}

		for (let i = 0; i < this.postBoxCount; i++) {
			this.addIn(this.postBoxArray[i]);
		}

		window.dispatchEvent(new Event('scroll'))
	}

	loadMore(e){
		this.postBoxArray.forEach(box => {
			this.addIn(box);
		});
		Helper.addClass(this.postLoader, 'hidden');
		Array.prototype.slice.call(document.querySelectorAll('.links-list__link')).forEach(link => {
			Helper.removeClass(link, 'hidden');
		});
	}

	buildArchiveLinks(){
		const iDs = [];
		this.filterButtonArray.forEach(button => {
			const cat = button.dataset.categoryId;
			iDs.push(cat);
		});
		const fetchURL = `${API.categories}?lang=${this.lang}`;
		fetch(
			fetchURL, {
			mode: 'same-origin', // no-cors, cors, *same-origin
		})
			.then(this.handleErrors)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let html = document.createElement('div');
				Helper.addClass(html, 'links-list');
				const allCategories = data;
				iDs.forEach(catId =>{
					allCategories.forEach(cat => {
						if(catId == cat.id){
							html.innerHTML += this.buildArchiveLink(cat);
						}
					});
				});

				this.postLoader.parentElement.appendChild(html);

			})
			.catch(err => {
				console.log(err);
			});
	}

	buildArchiveLink(cat) {
		return `
		<a class="links-list__link hidden" href="${cat.link}" data-category-id="${cat.id}">
			<span class="links-list__title">${cat.name}</span>
			<span class="links-list__icon">
				<i class="nhs-icon">
					<svg class="icon icon-arrow-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 55"><path fill="currentColor" d="M75.9 53.7l26.2-26.2L75.9 1.3v8.5l14.7 14.7H2v6h88.6L75.9 45.2z"></path></svg>
				</i>
			</span>
		</a>`;
	}

	fetchPosts(perPage, catID) {
		this.postContainer.innerHTML = '';
		this.postContainer.innerHTML = '<div class="loading-wrapper"><div class="loading-wrapper__spinner"></div></div>';

		let APIbase = API.posts;
		if(this.type == 'cases'){
			APIbase = API.cases;
		}
		let fetchURL = `${APIbase}?lang=${this.lang}&per_page=${perPage}&categories=${catID}&_embed`;
    if(catID == undefined){
      fetchURL = `${APIbase}?lang=${this.lang}&per_page=${perPage}&_embed`;
    }

		// console.log(fetchURL);

		fetch(
			fetchURL, {
			mode: 'same-origin', // no-cors, cors, *same-origin
		})
			.then(this.handleErrors)
			.then(response => {
				return response.json();
			})
			.then(data => {

				let html = '';
				if(this.type == 'cases'){
					data.forEach((post, i) => {
						const counter = i+1;
						html += this.buildHTMLCase(post, counter);
					});
				} else {
					html += `<div class="post-list__layout">`;

					data.forEach((post, i) => {
						const counter = i+1;
						html += this.buildHTMLPost(post);
						if(counter != perPage && counter % 2 == 0){
							html += `</div>`;
							html += `<div class="post-list__layout">`;
						}
					});

					html += `</div>`;
				}

				this.postContainer.innerHTML = html;

				const postBox = document.querySelectorAll(this.postBoxSelector);
				const postBoxArray = Array.prototype.slice.call(postBox);
				postBoxArray.forEach(post => {
					this.addIn(post);
        });

        Helper.addClass(this.postLoader, 'hidden');
    		Array.prototype.slice.call(document.querySelectorAll('.links-list__link')).forEach(link => {
          Helper.removeClass(link, 'hidden');
          Helper.removeClass(link, 'active');
          if(link.dataset.categoryId == catID){
            Helper.addClass(link, 'active');
          }
        });


			})
			.catch(err => {
				console.log(err);
			});
	}

	buildHTMLPost(post) {
		const featuredImage = post._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url;
		const title = post.title.rendered;
		const categories = post._embedded['wp:term'][0];
		const excerpt = post.excerpt.rendered;
		const link = post.link;

		const d = new Date(post.date);
		const day = d.getDate().toString().padStart(2, '0');
		const month = (d.getMonth()+1).toString().padStart(2, '0');
		const year = d.getFullYear();
		const formattedDate = `${day}.${month}.${year}`;

		let catString = '';

		categories.forEach(cat => {
			catString += cat.name;
		})

		return this.fillTemplateStory(formattedDate, catString, link, featuredImage, title, excerpt, 'post-list__post post-list__post--story');
	}

	fillTemplateStory(date, categories, link, img, title, excerpt, className){
		return `
		<article class="${className}">
			<div class="post-list__meta">
				<span class="post-list__date">${date}</span>
				<span class="post-list__category">${categories}</span>
			</div>
			<div class="post-list__image">
				<a href="${link}" class="post-list__link-image">
					<img src="${img}">
				</a>
			</div>
			<div class="post-list__content">
				<h2 class="post-list__title">
					<a href="${link}" class="post-list__link-title">
						${title}
					</a>
				</h2>
				<div class="post-list__excerpt">
					<p>${excerpt}</p>
				</div>
				<a href="${link}" class="post-list__link nhs-btn nhs-arrow-btn">
					<span class="nhs-arrow-btn__arrow nhs-arrow-btn__arrow--left">
						<span class="nhs-arrow-btn__shaft"></span>
					</span>
					<span class="nhs-arrow-btn__main">
						<span class="nhs-arrow-btn__text">${this.readMoreText}</span>
						<span class="nhs-arrow-btn__arrow nhs-arrow-btn__arrow--right">
							<span class="nhs-arrow-btn__shaft"></span>
						</span>
					</span>
				</a>
			</div>
		</article>`;
	}

	buildHTMLCase(post, i) {
		const featuredImage = post._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url;
		const title = post.title.rendered;
		const categories = post._embedded['wp:term'][0];
		const excerpt = post.excerpt.rendered;
		const link = post.link;

		const d = new Date(post.date);
		const day = d.getDate().toString().padStart(2, '0');
		const month = (d.getMonth()+1).toString().padStart(2, '0');
		const year = d.getFullYear();
		const formattedDate = `${day}.${month}.${year}`;

		const backgroundColor = post.acf.cases_background_color;

		let catString = '';

		categories.forEach(cat => {
			catString += cat.name;
		})
		let className = '';
		if(i % 2 == 0){
			className = 'post-list__post post-list__post--case post-list__post--reverse';
		} else {
			className = 'post-list__post post-list__post--case';
		}

		return this.fillTemplateCase(formattedDate, catString, link, featuredImage, title, excerpt, className, backgroundColor);
	}


	fillTemplateCase(formattedDate, catString, link, featuredImage, title, excerpt, className, backgroundColor){
		return `
		<article class="${className}">
			<div class="post-list__image">
				<a href="${link}" class="post-list__link-image post-list__link-image--${backgroundColor}">
					<img src="${featuredImage}">
				</a>
			</div>
			<div class="post-list__content">
				<div class="post-list__meta">
					<span class="post-list__date">${formattedDate}</span>
					<span class="post-list__category">${catString}</span>
				</div>
				<h2 class="post-list__title">
					<a href="${link}" class="post-list__link-title">${title}</a>
				</h2>
				<div class="post-list__excerpt">
					<p>${excerpt}</p>
				</div>
				<a href="${link}" class="post-list__link nhs-btn nhs-arrow-btn">
    			<span class="nhs-arrow-btn__arrow nhs-arrow-btn__arrow--left">
        		<span class="nhs-arrow-btn__shaft"></span>
    			</span>
					<span class="nhs-arrow-btn__main">
						<span class="nhs-arrow-btn__text">${this.readMoreText}</span>
						<span class="nhs-arrow-btn__arrow nhs-arrow-btn__arrow--right">
            	<span class="nhs-arrow-btn__shaft"></span>
        		</span>
    			</span>
				</a>
			</div>
		</article>`;
	}

	addIn(el) {
		Helper.addClass(el, 'visible');
		setTimeout(() => { Helper.addClass(el, 'fade-in-up') }, 300);
		if(this.layoutArray.length){
			Helper.removeClass(el.parentElement, 'hidden');
		}
	}

	hideElement(el){
		let wrapper = document.createElement('span');
		Helper.addClass(wrapper, 'hidden');
		Helper.wrap(el, wrapper);
	}

	resetHides(el){
		Helper.removeClass(el.firstChild, 'visible');
		Helper.removeClass(el.firstChild, 'fade-in-up');
		Helper.unwrap(el);
	}
}
export default PostLoader;
