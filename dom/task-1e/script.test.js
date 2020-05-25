describe('parseTemplate', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('div');
        el.innerHTML = `
            <h3 data-field="title">Some title</h3>
            <p data-field="description"></p>
        `;
    });

    it('results with error if the first param isn\'t html element', () => {
        expect(() => parseTemplate('test', {})).to.throw('HTMLElement is not defined');
    });

    it('results with error if data property isn\'t found', () => {
        expect(() => parseTemplate(el, {title: 'New title'})).to.throw('Required property doesn\'t exist');
    });

    it('ignored additional properties', () => {
        expect(() => parseTemplate(el, {title: 'New title', description: 'tes test', add: '122'})).not.to.throw();
    });

    it('modifies element correctly', () => {
        const data = {title: 'New title', description: 'new description'};
        parseTemplate(el, data);

        expect(el.querySelector('h3').textContent).to.equal(data.title);
        expect(el.querySelector('p').textContent).to.equal(data.description);
    });
});