class Input extends HtmlElement {
    constructor() {
        super();
    }

    onInput(fn) {
        this.el.addEventListener('keyup', fn);
    }

    onFocus(fn) {
        this.el.addEventListener('focus', fn)
    }
}
