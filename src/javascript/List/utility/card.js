const Card = (options ) =>{

    const cardCats = options.categories.map((item) => {
        return `<li>
            <a href="${item.cat_link}" target="_blank">
                ${item.cat_name}
            </a>
            </li>`;
    }).join('');

    return `<article class="card">
    <picture class="card__picture">
        <img src="${options.pic}" alt="${options.title}">
    </picture>
    <section class="card__wrap">
        <div class="card__meta">
            <time>${options.date}</time>
            <ul class="card__cats">
                ${cardCats}
            </ul>
        </div>
        <h4 class="card__title">
            ${options.title}
        </h4>
        <div class="card__except">
            ${options.content}
        </div>
    </section>
    <footer class="authors">
        <div class="authors__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C5.584 2 2 5.584 2 10C2 14.416 5.584 18 10 18C14.416 18 18 14.416 18 10C18 5.584 14.416 2 10 2ZM10 3.06667C13.824 3.06667 16.9333 6.176 16.9333 10C16.9333 11.4773 16.4693 12.8427 15.68 13.968L12.224 12.6507C12.224 12.6507 11.8187 11.8187 11.8667 11.696L11.4667 11.584L11.3973 10.9493C11.3973 10.9493 11.7333 10.752 11.92 9.648C11.92 9.648 12.0427 9.82933 12.1707 9.52533C12.2987 9.22133 12.6667 7.81333 12.272 8.07467C12.272 8.07467 13.12 4.91733 9.93067 4.73067C6.74667 4.912 7.6 8.06933 7.6 8.06933C7.20533 7.81333 7.57333 9.216 7.70133 9.52C7.82933 9.824 7.952 9.64267 7.952 9.64267C8.13867 10.752 8.47467 10.944 8.47467 10.944L8.40533 11.5787L8.00533 11.6907C8.05867 11.8133 7.648 12.6453 7.648 12.6453L4.288 13.9307C3.51467 12.8107 3.06133 11.4613 3.06133 10C3.06667 6.176 6.176 3.06667 10 3.06667ZM9.94667 4.72533H9.94133H9.936H9.94667Z" fill="#302F2D"/>
            </svg>
        </div>
        <div class="authors__names">
            ${options.author}
        </div>
    </footer>
</article>`
}

export default Card;