function sumOfPositive(arr) {

    if (!Array.isArray(arr)) {
        throw new Error('Accepts only array');
    }

    arr = arr.filter(number => isNumber(number) ? number > 0 : false);
    const sum = arr.reduce((sum, value) => sum + value, 0);

    return {
        count: arr.length,
        sum: sum
    }

}

function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number) && (typeof number === 'number');
}

const numbers = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
console.log(sumOfPositive(numbers));
