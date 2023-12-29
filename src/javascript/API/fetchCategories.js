const fetchCategories = async ( catName ) => {
    const catApiUrl = wpData.catApiUrl;
    try {
        const categories = await fetch(catApiUrl);
        if (!categories.ok) {
            throw new Error('Network response was not ok');
        }
        return await categories.json();
    } catch (error) {
        console.error(error);
    }
};

export default fetchCategories;