function parseTemplate(el, data) {
    if (!el) {
        return;
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