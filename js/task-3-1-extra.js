function map(arr, fn) {
    return arr.reduce((acc, current) => {
        acc.push(fn(current));
        return acc;
    }, [])
}

function filter(arr, fn) {
    return arr.reduce((acc, current) => {
        if (fn(current)) {
            acc.push(current);
        }
        return acc;
    }, [])
}

console.log(map([1, 2, 3, 4, 5], (number) => `Mapped number: ${number}`));
console.log(filter([1, 2, 3, 4, 5], (number) => number % 2 === 0));