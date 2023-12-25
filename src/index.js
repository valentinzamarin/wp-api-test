import Form from "./javascript/Form";
import APIHandler from "./javascript/API/APIHandler";
import Pagination from "./javascript/Pagination/Pagination";

import { postsApiUrl } from "./javascript/variables/postsApi";
import listHandler from "./javascript/List/listHandler";

let postsAPI = new APIHandler( postsApiUrl );

let postsApiClass = await postsAPI;

let postResponse = await postsApiClass;
postResponse.fetchPostData(1, 3)
    .then( ( posts => { listHandler( posts ) }))


let pagination = new Pagination( postsApiClass );
pagination.initPagination()

const form = document.querySelector( '#form' );
const dateInput = form.querySelector( '#dateInput' );
const select = form.querySelector( '.select' );


document.addEventListener( 'DOMContentLoaded', () => {
    if( form !== undefined ) {
        let formHandler = new Form( form, dateInput, select, pagination );
    }
})

