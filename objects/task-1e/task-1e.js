function map(arr, fn) {
  
    validateParams([{value: arr, type: 'array'}, {value: fn, type: 'function'}]);

    return arr.reduce((acc, current) => {
        acc.push(fn(current));
        return acc;
    }, [])
}

function filter(arr, fn) {

    validateParams([{value: arr, type: 'array'}, {value: fn, type: 'function'}]);

    return arr.reduce((acc, current) => {
        if (fn(current)) {
            acc.push(current);
        }
        return acc;
    }, [])
}

function validateParams(params) {
    let error = '';

    params.some(param => {
        switch (param.type) {
            case 'array':
                if (!Array.isArray(param.value)) {
                    error = 'Accepts only array as a param';
                    return true
                }
                break;
            case 'function':
                if (typeof param.value !== 'function') {
                    error = 'Accepts only function as a param';
                    return true
                }
                break;
        }
    });

    if (error) {
        throw new Error(error);
    }
}

console.log(map([1, 2, 3, 4, 5], (number) => `Mapped number: ${number}`));
console.log(filter([1, 2, 3, 4, 5], (number) => number % 2 === 0));