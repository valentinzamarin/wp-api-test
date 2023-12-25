const selectBack = ( text ) => {
    return `<div class="select__option select__back">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path d="M12.5 15.5L7.5 10.5L12.5 5.5" stroke="#777777" stroke-width="2"/>
        </svg>
        ${text}
    </div>`;
}

export default selectBack;