const removeButton = ( input ) => {
    let removeBtn = input.nextElementSibling;
    removeBtn.style.display = 'flex';

    removeBtn.addEventListener( 'click', function ( event ) {
        event.preventDefault();
        input.value = '';
        removeBtn.style.display = 'none';
    })
}
export default removeButton;