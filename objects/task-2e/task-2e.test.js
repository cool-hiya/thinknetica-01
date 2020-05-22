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

    describe("results with a proper structured object:", function () {
        const text = 'Lorem ipsum ipsum dolor.';
        const result = encodeText(text);

        it('includes \'dictionary\' property', () => {
            expect(result.dictionary).to.exist;
        });

        it('\'dictionary\' property is an array', () => {
            assert.isArray(result.dictionary);
        });

        it('\'dictionary\' property is an array of objects {word: string, count: number, code: string}', () => {
            const firstEl = result.dictionary[0];

            assert.isString(firstEl.word);
            assert.isString(firstEl.code);
            assert.isNumber(firstEl.count);
        });

        it('includes \'encodedText\' property', () => {
            expect(result.encodedText).to.exist;
        });

        it('\'encodedText\' property is a string', () => {
            assert.isString(result.encodedText);
        });

    });
});