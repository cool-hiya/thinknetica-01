describe('encodeText', () => {
    it('results with error if param is not a string', () => {
        const randomParams = [4, [], {}, null, undefined];

        randomParams.forEach(p => {
            expect(() => encodeText(p)).to.throw('Accepts only string');
        })
    });

    it('splits text correctly', () => {
        const text = 'Lorem ipsum ipsum dolor.';
        const result = encodeText(text);
        expect(result.dictionary.length).to.equal(3);
    });

    it('counts words correctly', () => {
        const text = 'Lorem ipsum ipsum dolor.';
        const result = encodeText(text);
        const sum = result.dictionary
            .map(el => el.count)
            .reduce((sum, value) => sum + value, 0);

        expect(sum).to.equal(4);
        expect(result.dictionary[1].count).to.equal(2);
    });

    it('results properly if empty string', () => {
        const text = '';
        const result = encodeText(text);

        expect(result.dictionary).to.be.empty;
        expect(result.encodedText).to.be.empty;
    });

    it('encodes text correctly', () => {
        const text = 'Lorem ipsum ipsum dolor.';
        const result = encodeText(text);

        const decodedText = result.encodedText.split(',')
            .map(code => result.dictionary.find(word => word.code === code).word)
            .join(' ')

        expect(text).to.equal(decodedText);
    });
});