function parseTemplate(el, data) {
    if (!el || !(el && el instanceof HTMLElement)) {
        throw new Error('HTMLElement is not defined');
    }

    const dataFields= [...el.querySelectorAll('[data-field]')];

    dataFields.forEach(field => {
        const value = data[field.dataset.field];

        if(!value){
            throw new Error('Required property doesn\'t exist');
        }

        field.textContent = value;
    });
}


parseTemplate(
    document.getElementById('item1'),
    {
        title: 'Hello world',
        description: 'The first program',
    }
);