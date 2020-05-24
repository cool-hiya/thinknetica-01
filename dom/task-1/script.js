function domTree1(el) {
    if (!el) {
        return;
    }

    if (el.children.length === 0) {
        return;
    } else {
        [...el.children].forEach((el) => {
            console.log(el.tagName);
            domTree1(el);
        });
    }
}

function domTree2(el) {
    if (!el) {
        return;
    }

    if (el.children.length === 0) {
        return;
    } else {
        for (let i = 0; i < el.children.length; i++) {
            const child = el.children[i];
            console.log(child.tagName);
            domTree2(child);
        }
    }
}

function domTree3(el) {
    if (!el) {
        return;
    }

    if (el.children.length === 0) {
        return;
    } else {
        for (let child of el.children) {
            console.log(child.tagName);
            domTree3(child);
        }
    }
}

console.log(domTree1(document));
