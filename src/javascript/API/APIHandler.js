
export default class APIHandler{
    constructor( apiUrl ) {
        this.apiUrl = apiUrl;
    }

    getPosts = async ( paged = 1, per_page = 1 ) => {

        let params = `?paged=${paged}&per_page=${per_page}`

        try {
            const response = await fetch( this.apiUrl + params );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();

        } catch (error) {
            console.error(error);
            return false;
        }
    };

    fetchPostData = async ( paged = 1, per_page = 3, ) => {

        try {
            const posts = await this.getPosts( paged, per_page );

            if ( posts ) {

                return posts;
            } else {
                console.log('Что-то пошло не так при получении данных');
            }
        } catch (error) {
            console.error(error);
        }
    }

    fetchSelectData = async ( catName ) => {
        try {
            const options = await this.getPosts( this.apiUrl );

            if ( options ) {


                const secondLevelCategories = options.filter(item => item.parent_name === catName );

                let categoriesObject = {
                    'secondLevel': secondLevelCategories,
                }

                return categoriesObject
            } else {
                console.log('Что-то пошло не так при получении данных');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

