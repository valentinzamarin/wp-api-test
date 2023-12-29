import Form from "./javascript/Form";
import listHandler from "./javascript/List/listHandler";
import fetchPosts from "./javascript/API/fetchPosts";

let postsPromise = fetchPosts()
postsPromise.then( posts => {
    listHandler( posts )
})

const form = document.querySelector( '#form' );

document.addEventListener( 'DOMContentLoaded', () => {
    if( form !== undefined ) {
        let formHandler = new Form( form );
    }
})

