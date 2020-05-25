function domTree1(el, deep = 0) {
    if (!el) {
        return;
    }

    if (el.children.length === 0) {
        return;
    } else {
        [...el.children].forEach((el) => {
            console.log('  '.repeat(deep) + el.tagName);
            domTree1(el, deep + 1);
        });
    }
}

function domTree2(node, deep = 0) {
    console.log('  '.repeat(deep), node.nodeName, node.nodeValue);

    for (let item = node.firstChild; item; item = item.nextSibling) {
        domTree2(item, deep + 1);
    }
}

function domTree3(el, deep = 0) {
    if (!el) {
        return;
    }

    if (el.children.length === 0) {
        return;
    } else {
        for (let i = 0; i < el.children.length; i++) {
            const child = el.children[i];
            console.log('  '.repeat(deep) + child.tagName);
            domTree3(child, deep + 1);
        }
    }
}

domTree3(document);