class Div extends HtmlElement {
    constructor() {
        super();
    }

    set onClick(fn) {
        this.el.addEventListener('click', fn);
    }
}

