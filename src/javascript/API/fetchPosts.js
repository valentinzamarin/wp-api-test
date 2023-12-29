const fetchPosts = async () => {

    const postsApiUrl = wpData.postsApiUrl;

    try {
        const posts = await fetch( postsApiUrl );

        if (!posts.ok) {
            throw new Error('Network response was not ok');
        }

        return await posts.json();
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default fetchPosts;