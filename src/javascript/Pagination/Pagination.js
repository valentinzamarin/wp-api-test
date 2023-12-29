import {postsList} from "../variables/postList";
import listHandler from "../List/listHandler";

export default class Pagination {
    constructor(page) {
        this.posts = null
        this.page = page;
    }

    init(posts) {

        let prevPagination = document.querySelector('.pagination');

        if (posts.length === 0 && prevPagination !== null) {
            /**
             * обнаружил баг, что можно создать пагинацию с пустым значением posts.
             */
            prevPagination.remove();
            return false;
        } else if (prevPagination !== null) {
            prevPagination.remove();
        }

        this.createPagination(posts)
        return this.posts = posts;
    }

    createPagination(posts) {
        let numberOfPages = Math.ceil(posts.length / 3);

        if (numberOfPages === 1) {
            return false;
        }

        let paginationWrapper = document.createElement('div');
        paginationWrapper.classList.add('pagination');

        if (this.page !== numberOfPages) {
            const loadmoreButton = document.createElement('button');
            loadmoreButton.classList.add('pagination__loadmore');
            loadmoreButton.textContent = 'Загрузить еще';
            loadmoreButton.dataset.max = numberOfPages;

            loadmoreButton.addEventListener('click', (event) => {
                this.loadmoreButtonHandler(event)
            });

            paginationWrapper.appendChild(loadmoreButton);
        }

        const numericPagination = document.createElement('div');
        numericPagination.classList.add('pagination__pages');

        const previousButton = document.createElement('a');
        previousButton.classList.add('pagination__arrow', 'pagination__prev')
        previousButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.99085L12.9159 4L18 9.5L12.9159 15L12 14.0091L15.5211 10.2H1V8.79999H15.5211L12 4.99085Z" fill="#302F2D"/></svg>';
        previousButton.dataset.action = 'minus';

        previousButton.addEventListener('click', (event) => {
            this.paginationArrowsHandler(event);
        });

        if (this.page === 1) {
            previousButton.style.display = 'none';
        }
        numericPagination.appendChild(previousButton);
        for (let i = 1; i <= numberOfPages; i++) {
            const pageButton = document.createElement('a');
            pageButton.textContent = i;
            pageButton.href = '#';

            pageButton.addEventListener('click', (event) => {
                this.numericPageHandler(event)
            });


            numericPagination.appendChild(pageButton);
        }


        const nextButton = document.createElement('a');
        nextButton.classList.add('pagination__arrow', 'pagination__next')
        nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.99085L12.9159 4L18 9.5L12.9159 15L12 14.0091L15.5211 10.2H1V8.79999H15.5211L12 4.99085Z" fill="#302F2D"/></svg>';
        nextButton.dataset.action = 'plus';

        nextButton.addEventListener('click', (event) => {
            this.paginationArrowsHandler(event);
        });

        if (this.page == numberOfPages) {
            nextButton.style.display = 'none';
        }
        numericPagination.appendChild(nextButton);

        paginationWrapper.appendChild(numericPagination);


        postsList.insertAdjacentElement('afterend', paginationWrapper);


        document.querySelectorAll( '.pagination__pages a' ).forEach( page => {
            if( page.textContent == this.page ) {
                page.classList.add( 'active' );
            } else {
                page.classList.remove( 'active' );
            }

        })
    }

    loadmoreButtonHandler(event) {
        event.preventDefault();

        ++this.page;
        listHandler(this.posts, this.page);

    }

    numericPageHandler(event) {
        event.preventDefault();

        let $this = event.target,
            thisPage = parseInt(event.target.textContent.trim());
            this.page = thisPage;
        listHandler(this.posts, thisPage);

        return this.page;
    }

    paginationArrowsHandler(event) {
        event.preventDefault();

        let $this = event.currentTarget,
            action = $this.dataset.action;

        switch (action) {
            case 'plus':
                this.page++;
                break;
            case 'minus':
                this.page--
                break;
        }

        listHandler(this.posts, this.page);

    }

}