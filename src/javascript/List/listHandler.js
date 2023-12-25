import {postsList} from "../variables/postsList";
import Card from "./utility/card";

const listHandler = ( posts ) => {
    postsList.innerHTML += posts.map(item => Card(item)).slice(0, 3).join('')
}
export default listHandler;