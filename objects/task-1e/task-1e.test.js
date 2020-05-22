function getParamsTests(testFn) {
    return [
        [
            'results with error if first param is not array',
            () => {
                const numbers = '[1, 2, 3, 4, 5]';
                const fn = (number) => `Mapped number: ${number}`;
                expect(() => testFn(numbers, fn)).to.throw('Accepts only array as a param');
            }
        ],
        [
            'results with error if second param is not function',
            () => {
                const numbers = [1, 2, 3, 4, 5];
                const fn = 'test';

                expect(() => testFn(numbers, fn)).to.throw('Accepts only function as a param');
            }
        ],
        [
            'results with first error if both params are invalid', 
            () => {
                const numbers = 'test';
                const fn = 'test';

                expect(() => testFn(numbers, fn)).to.throw('Accepts only array as a param');
            }
        ]
    ]
}

describe('map', () => {
    const paramsTest = getParamsTests(map);
    paramsTest.forEach(test => {
        it(...test);
    });

    it('modifies array correctly', () => {
        const numbers = [1, 2];
        const fn = (number) => `Mapped number: ${number}`;
        const result = map(numbers, fn);

        assert.deepEqual(result, ['Mapped number: 1', 'Mapped number: 2']);        
    });

    it('should\'t modify current array', () => {
        const numbers = [1, 2];
        const fn = (number) => `Mapped number: ${number}`;
        const result = map(numbers, fn);

        assert.deepEqual(numbers, [1, 2]);        
    });
});

describe('filter', () => {
    const paramsTest = getParamsTests(filter);
    paramsTest.forEach(test => {
        it(...test);
    });

    it('modifies array correctly', () => {
        const numbers = [1, 2, 3, 4];
        const fn = (number) => number % 2 === 0;
        const result = filter(numbers, fn);

        assert.deepEqual(result, [2, 4]);        
    });

    it('should\'t modify current array', () => {
        const numbers = [1, 2, 3, 4];
        const fn = (number) => number % 2 === 0;
        const result = filter(numbers, fn);

        assert.deepEqual(numbers, [1, 2, 3, 4]);         
    });
});

