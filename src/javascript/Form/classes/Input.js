export default class Input{
    constructor( input ) {
        this.input = input;
    }

    init() {
        this.input.addEventListener('input', event => {
            this.inputDateMask(event);
        });

        this.input.addEventListener('focus', event => {
            this.inputFocusMask( event );
        });
    }

    inputDateMask( event ) {
        let input = event.target;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 2) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '.' + value.substring(5, 9);
        }

        input.value = value;
    }

    inputFocusMask( event ) {
        let placeholder = 'дд.мм.гггг';
        this.input.setAttribute('placeholder', placeholder);
    }
}
