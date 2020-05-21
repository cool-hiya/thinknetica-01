function countNegativeNumbers(arr) {
    arr = arr.filter(number => number < 0);
    const sum = arr.reduce((sum, value) => sum + value, 0);

    return {
        count: arr.length,
        sum: sum
    }

}

const numbers = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
console.log(countNegativeNumbers(numbers));