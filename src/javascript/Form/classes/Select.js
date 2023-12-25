import APIHandler from "../../API/APIHandler";
import selectOption from "../utility/selectOption";
import selectBack from "../utility/selectBack";
import {catApiUrl} from "../../variables/catApi";


export default class Select {
    constructor( select ) {
        this.select = select;

        this.selectToggle = this.select.querySelector( '.select__toggle' );
        this.selectList   = this.select.querySelector( '.select__list' );

        this.input = this.select.querySelector( 'input' );

        this.categoriesAPI = catApiUrl;

        this.clonePreviousList = null;
        this.objectOfCategories = null;

        this.listMutationObserver();
    }

    init() {
        this.selectToggle.addEventListener( 'click', event => {
            this.selectToggleHandler( event )
        })

        this.select.querySelectorAll( '.select__option' ).forEach( option => {
            option.addEventListener( 'click', event => {
                this.optionHandler( event )
            })
        })

        document.querySelectorAll( '.select_subcategory' ).forEach( button => {
            button.addEventListener( 'click', event => {
                this.showSubcategories( event )
            })
        })
    }

    async showSubcategories( event ) {
        event.preventDefault();

        this.clonePreviousList = this.selectList.innerHTML;

        if( event.target.classList.contains( 'third' ) ) {
            let thirdCatName = event.target.parentElement.textContent.trim()

            const thirdLevelCategories = this.objectOfCategories.secondLevel.find(category => category.level_name === thirdCatName);

            this.createSubcategoryList( thirdLevelCategories.children );
            return false;
        }

        let $this = event.target,
            catName = $this.parentElement.textContent.trim();

        let options = new APIHandler( this.categoriesAPI );
        const objectOfCategories = await options.fetchSelectData( catName );

        this.objectOfCategories = objectOfCategories;
        this.createSubcategoryList( objectOfCategories.secondLevel );
    }

    createSubcategoryList( objectCatArray ) {

        this.selectList.innerHTML = selectBack('Назад', this.clonePreviousList );
        this.selectList.innerHTML += objectCatArray.map( ( item ) => selectOption(item)).join('');

    }

    selectToggleHandler( event ) {
        const $this = event.target;

        if( !this.select.classList.contains( 'active' )  ) {
            this.select.classList.add('active')
        } else {
            this.select.classList.remove( 'active');
        }

    }

    optionHandler( event ) {

        if(
            event.target.classList.contains( 'select_subcategory' )
        ) {
            return false;
        } else if( event.target.classList.contains( 'select__back' ) ) {
            this.selectBackHandler();
            return false;
        }

        this.input.value = event.target.textContent.trim();
        this.closeSelect()
    }

    closeSelect() {
        this.select.classList.remove( 'active');
    }

    selectBackHandler() {
        this.selectList.innerHTML = this.clonePreviousList;
    }

    listMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {

                this.select.querySelectorAll( '.select__option' ).forEach( option => {
                    option.addEventListener( 'click', event => {
                        this.optionHandler( event )
                    })
                });

                document.querySelectorAll( '.select_subcategory' ).forEach( button => {
                    button.addEventListener( 'click', event => {
                        this.showSubcategories( event )
                    })
                })

            });
        });

        const config = { attributes: true, childList: true, subtree: true, characterData: true };

        observer.observe(this.selectList, config);
    }
}