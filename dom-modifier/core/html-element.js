class HtmlElement {
    constructor() {
        this._target = document.body;
        this._el = null;
    }

    get el() {
        return this._el;
    }

    set template(template = '') {
        this._template = template;
        this._updateEl();
    }

    set target(target) {
        if (!(target instanceof Element)) {
            throw new Error('Target should be a DOM element');
        }
        this._target = target;
    }

    set variables(variables) {
        for (let [key, value] of Object.entries(variables)) {
            if (!(typeof value === 'function' || typeof value === 'string')) {
                throw new Error('Not supported type of variable');
            }

            this.template = this._template.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
    }

    set styles(styles) {
        for (let [property, value] of Object.entries(styles)) {
            this._el.style[property] = value;
        }
    }

    _updateEl() {
        this._el = new DOMParser().parseFromString(this._template, 'text/html').body.children[0];
     }

    _render() {
        if (!this.el) {
            return;
        }
        this._target.append(this.el);
    }

    _unrender() {
        if (!this.el) {
            return;
        }
        this.el.remove();
    }

    render() {
        this._render();
    }

    unrender() {
        this._unrender();
    }
}
