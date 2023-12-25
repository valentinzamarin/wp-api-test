import Input from "./classes/Input";
import Select from "./classes/Select";
import dateValidator from "./utility/dateValidator";
import APIHandler from "../API/APIHandler";
import {postsApiUrl} from "../variables/postsApi";
import {postsList} from "../variables/postsList";
import Card from "../List/utility/card";
import Pagination from "../Pagination/Pagination";

export default class Form{
    constructor( form, dateInput, select, pagination ) {
        this.form = form;

        this.dateInput = new Input( dateInput )
        this.dateInput.init();

        this.select = new Select( select );
        this.select.init();

        this.pagination = pagination;

        this.form.addEventListener( 'submit', event => {
            this.formSubmitHandler( event );
        })

    }


    async formSubmitHandler( event ) {
        event.preventDefault();

        let $form = event.target,
            dateVal = $form.dateInput.value,
            category = $form.category.value;


        let filterItems = {
            dateVal: dateVal,
            category: category
        }


        let posts = new APIHandler( postsApiUrl )
        let allPosts = await posts.getPosts( 1, -1 );

        const filteredData = allPosts.filter(item =>
            item.categories.some(child => child.cat_name === category)
        );

        this.pagination = null;
        postsList.innerHTML = filteredData.map(item => Card(item)).join('')

    }
}