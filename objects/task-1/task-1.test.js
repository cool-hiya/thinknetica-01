describe('sumOfPositive', () => {

    it('sums positive numbers', () => {
        const numbers = [-91, -93, -45, 67, 96, 40, -34, 96, -42, 58];
        const result = sumOfPositive(numbers);

        assert.deepEqual(result, {
            count: 5,
            sum: 357
        });
    });

    it('sums positive float numbers', () => {
        const numbers = [-91, -93, -45, 67.5, 96, 40, -34, 96, -42, 58];
        const result = sumOfPositive(numbers);

        assert.deepEqual(result, {
            count: 5,
            sum: 357.5
        });
    });

    it('results with zeros if no positive numbers', () => {
        const numbers = [-91, -93, -45];
        const result = sumOfPositive(numbers);

        assert.deepEqual(result, {
            count: 0,
            sum: 0
        });
    });

    it('results with error if param is not array', () => {
        const numbers ='Not array';
        expect(() => sumOfPositive(numbers)).to.throw('Accepts only array');
    });

    it('ignores not numbers in array', () => {
        const numbers = ['test', null, undefined, 5, NaN, {}, '76' ];
        const result = sumOfPositive(numbers);

        assert.deepEqual(result, {
            count: 1,
            sum: 5
        });
    });

    it('results with number values', () => {
        const numbers = [-1, 5, 6, '56'];
        const result = sumOfPositive(numbers);

        assert.isNumber(result.count);
        assert.isNumber(result.sum);
    });
});