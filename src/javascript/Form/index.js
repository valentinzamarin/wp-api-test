import Input from "./classes/Input";
import Select from "./classes/Select";
import dateValidator from "./utility/dateValidator";
import fetchPosts from "../API/fetchPosts";
import listHandler from "../List/listHandler";


export default class Form{
    constructor( form ) {
        this.form = form;
        this.formInput = this.form.querySelector( '#dateInput' );
        this.formSelect = this.form.querySelector( '.select' );


        this.dateInput = new Input( this.formInput )
        this.dateInput.init();

        this.select = new Select( this.formSelect );
        this.select.init();


        this.form.addEventListener( 'submit', event => {
            this.formSubmitHandler( event );
        })


    }
    async formSubmitHandler( event ) {
        event.preventDefault();

        const $form = event.target;

        let itemsToFilter = {
            dateVal: $form.dateInput.value,
            category: $form.category.value,
        }

        if( dateValidator( itemsToFilter.dateVal ) === false ) {
            alert('некорректная дата')
            return false;
        }

        let getAllPosts = await fetchPosts()

        if (!itemsToFilter.dateVal && !itemsToFilter.category) {
            listHandler( getAllPosts, 1 )
            return false;
        }

        const filteredPosts = getAllPosts
            .filter(item => {
                const itemDate = item.date.substring(0, 10);

                if( itemsToFilter.dateVal === '' ) {
                    return item.categories.some(child => child.cat_name === itemsToFilter.category)
                } else if( itemsToFilter.category === '' ) {
                    return itemDate === itemsToFilter.dateVal
                }
                return (
                    item.categories.some(child => child.cat_name === itemsToFilter.category) &&
                    itemDate === itemsToFilter.dateVal // Сравнение с itemsToFilter.dateVal
                );
            });

        listHandler( filteredPosts, 1 )
    }



}