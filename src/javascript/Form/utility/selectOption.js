const selectOption = ( options ) => {
    let sublist = '';
    if( options.thirdLevelCategories && options.thirdLevelCategories.length > 0 ) {
        sublist = '<button data-level="third" class="select__sublist-button js-sublist"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="#302F2D" stroke-width="2"></path></svg></button>';
    }
    return `<div class="select__option">
        <span class="js-option">
        ${options.level_name}
        </span>
        ${sublist}
    </div>`
}

export default selectOption;