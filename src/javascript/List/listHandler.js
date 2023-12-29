import Card from "./utility/card";
import Pagination from "../Pagination/Pagination";
import {postsList} from "../variables/postList";

const listHandler = (posts, page = 1) => {

    const postsPerPage = 3;
    const startIndex = 0;
    const endIndex = page * postsPerPage;


    postsList.innerHTML = posts.map(item => Card(item)).slice(startIndex, endIndex).join('');

    let pagination = new Pagination(page);
    pagination.init(posts);

}
export default listHandler;