describe('map', () => {
    it('results with error if first param is not array', () => {
        const numbers = '[1, 2, 3, 4, 5]';
        const fn = (number) => `Mapped number: ${number}`;
        expect(() => map(numbers, fn)).to.throw('Accepts only array as a param');
    });

    it('results with error if second param is not function', () => {
        const numbers = [1, 2, 3, 4, 5];
        const fn = 'test';

        expect(() => map(numbers, fn)).to.throw('Accepts only function as a param');
    });

    it('results with first error if both params are invalid', () => {
        const numbers = 'test';
        const fn = 'test';

        expect(() => map(numbers, fn)).to.throw('Accepts only array as a param');
    });

    it('modifies array correctly', () => {
        const numbers = [1, 2];
        const fn = (number) => `Mapped number: ${number}`;
        const result = map(numbers, fn);

        assert.deepEqual(result, ['Mapped number: 1', 'Mapped number: 2']);
    });

    it('results with empty array if empty array provided', () => {
        const numbers = [];
        const fn = (number) => `Mapped number: ${number}`;
        const result = map(numbers, fn);

        assert.deepEqual(result, []);
    });

    it('should\'t modify current array', () => {
        const numbers = [1, 2];
        const fn = (number) => `Mapped number: ${number}`;
        const result = map(numbers, fn);

        assert.deepEqual(numbers, [1, 2]);
    });
});

describe('filter', () => {
    it('results with error if first param is not array', () => {
        const numbers = '[1, 2, 3, 4, 5]';
        const fn = (number) => number % 2 === 0;
        expect(() => filter(numbers, fn)).to.throw('Accepts only array as a param');
    });

    it('results with error if second param is not function', () => {
        const numbers = [1, 2, 3, 4, 5];
        const fn = 'test';

        expect(() => filter(numbers, fn)).to.throw('Accepts only function as a param');
    });

    it('results with first error if both params are invalid', () => {
        const numbers = 'test';
        const fn = 'test';

        expect(() => filter(numbers, fn)).to.throw('Accepts only array as a param');
    });
    
    it('modifies array correctly', () => {
        const numbers = [1, 2, 3, 4];
        const fn = (number) => number % 2 === 0;
        const result = filter(numbers, fn);

        assert.deepEqual(result, [2, 4]);
    });

    it('results with empty array if empty array provided', () => {
        const numbers = [];
        const fn = (number) => number % 2 === 0;
        const result = filter(numbers, fn);

        assert.deepEqual(result, []);
    });

    it('should\'t modify current array', () => {
        const numbers = [1, 2, 3, 4];
        const fn = (number) => number % 2 === 0;
        const result = filter(numbers, fn);

        assert.deepEqual(numbers, [1, 2, 3, 4]);
    });
});

