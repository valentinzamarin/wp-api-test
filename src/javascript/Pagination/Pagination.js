import { postsList } from "../variables/postsList";
import Card from "../List/utility/card";

export default class Pagination{
    constructor( postApiHandler, paged = 1, perPage = 3 ) {
        this.postApiHandler = postApiHandler;

        this.paged = paged;
        this.perPage = perPage;

        this.postsListObserver();
    }
    

    async initPagination() {

        try {
            const allPosts = await this.postApiHandler.fetchPostData(1, -1);
            let totalPostPages = Math.ceil(allPosts.length / this.perPage);
            this.createPagination( totalPostPages )
        } catch (error) {
            console.error('Ошибка при загрузке постов:', error);
        }

    }

    createPagination( total ) {

        this.paginationWrapper = document.createElement('div');
        this.paginationWrapper.classList.add('pagination');

        const loadmoreButton = document.createElement('button');
        loadmoreButton.classList.add('pagination__loadmore');
        loadmoreButton.textContent = 'Загрузить еще';
        loadmoreButton.dataset.max = total;

        loadmoreButton.addEventListener('click', ( event ) => {
            this.loadmoreButtonHandler( event )
        });

        this.paginationWrapper.appendChild(loadmoreButton);

        const numericPagination = document.createElement('div');
        numericPagination.classList.add('pagination__pages');

        for (let i = 1; i <= total; i++) {
            const pageButton = document.createElement('a');
            pageButton.textContent = i;
            pageButton.href='#';

            pageButton.addEventListener('click', ( event ) => {
                this.numericPageHandler( event )
            });
            if( i === 1 ) {
                pageButton.classList.add('active');
            }
            if (i === total) {
                pageButton.classList.add('last-page'); // Добавляем класс для последнего элемента
            }

            numericPagination.appendChild(pageButton);
        }

        this.paginationWrapper.appendChild(numericPagination);


        postsList.insertAdjacentElement('afterend', this.paginationWrapper );

    }

    async loadmoreButtonHandler( event  ) {
        event.preventDefault();

        let $thisButton = event.target,
            maxPages = $thisButton.dataset.max;

        ++this.paged;

        if( this.paged == maxPages ) {
            $thisButton.disabled = true;
        }

        this.postApiHandler.fetchPostData(this.paged, 3)
            .then( ( posts => {
                postsList.innerHTML += posts.map(item => Card(item)).join('')
            }))
    }

    async numericPageHandler( event ) {
        event.preventDefault();

        let $this = event.target,
            thisPage = event.target.textContent.trim();

        this.paged = thisPage;

        this.postApiHandler.fetchPostData(this.paged, 3)
            .then( ( posts => {
                postsList.innerHTML = posts.map(item => Card(item)).join('')
            }))
    }

    postsListObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {

                let loadmoreButton = document.querySelector( '.pagination__loadmore' ),
                    loadmoreButtonDataset = loadmoreButton.dataset.max;

                if( loadmoreButtonDataset == this.paged ) {
                    loadmoreButton.disabled = true;
                } else {
                    loadmoreButton.disabled = false;
                }

                document.querySelectorAll( '.pagination__pages a' ).forEach( page => {
                    page.classList.remove( 'active' );
                    if( this.paged == page.textContent.trim() ) {
                        page.classList.add( 'active' );
                    }
                })

            });
        });

        const config = { attributes: true, childList: true, subtree: true, characterData: true };

        observer.observe(postsList, config);
    }

}