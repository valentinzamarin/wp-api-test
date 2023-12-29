const selectBack = (currentLevel) => {
    let levels = ['first', 'second', 'third'];

    let previous = '';
    if (levels.includes(currentLevel)) {
        let currentIndex = levels.indexOf(currentLevel);
        previous = levels[currentIndex - 1];
    }

    return `<div class="select__option select__option--back js-back" data-previous="${previous}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path d="M12.5 15.5L7.5 10.5L12.5 5.5" stroke="#777777" stroke-width="2"/>
        </svg>
        Назад
    </div>`;
};

export default selectBack;