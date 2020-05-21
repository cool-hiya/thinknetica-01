function catchStringParamError(fn) {
    const randomParams = [4, [], {}, null, undefined];

    randomParams.forEach(p => {
        expect(() => fn(p)).to.throw('Accepts only string');
    })
}

describe('wordStat', () => {

    it('counts stats properly', () => {
        const text = 'Lorem ipsum dolor sit amet.';
        const result = wordStat(text);

        assert.deepEqual(result, [
            {word: 'Lorem', sum: 511},
            {word: 'ipsum', sum: 558},
            {word: 'dolor', sum: 544},
            {word: 'sit', sum: 336},
            {word: 'amet.', sum: 469}
        ]);
    });

    it('results with error if param is not a string', () => {
        catchStringParamError(wordStat);
    });

    it('results with array of objects {word: string: code: number}', () => {
        const text = 'Lorem ipsum dolor sit amet.';
        const result = wordStat(text);
        const firstWord = result[0];

        expect(firstWord).to.exist;
        assert.isNumber(firstWord.sum);
        assert.isString(firstWord.word);
    });
});

describe('sumCharCodes', () => {

    it('sums letter char codes', () => {
        expect(sumCharCodes('Lorem')).to.equal(511);
    });

    it('results with error if param is not a string', () => {
        catchStringParamError(sumCharCodes);
    });
});