const dateValidator = ( val ) => {
    let datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;

    if (!datePattern.test(val) && !val == '' ) {
        return false;
    } else {
        return true;
    }
}
export default dateValidator;