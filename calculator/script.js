const calculator = document.querySelector('.calculator');
const calculation = calculator.querySelector('.calculator-value');
const calculationTotal = calculator.querySelector('.calculator-total');
const controls = [...calculator.querySelectorAll('.calculator-controls button')];

let value = [0];
let isLastOperator = false;
let result = 0;

let keys = {
    '1': {value: '1', isOperator: false},
    '2': {value: '2', isOperator: false},
    '3': {value: '3', isOperator: false},
    '4': {value: '4', isOperator: false},
    '5': {value: '5', isOperator: false},
    '6': {value: '6', isOperator: false},
    '7': {value: '7', isOperator: false},
    '8': {value: '8', isOperator: false},
    '9': {value: '9', isOperator: false},
    '0': {value: '0', isOperator: false},
    '-': {value: '-', isOperator: true},
    '=': {value: '=', isOperator: true},
    '+': {value: '+', isOperator: true},
    '*': {value: '*', isOperator: true},
    '/': {value: '/', isOperator: true},
    'Escape': {value: 'C', isOperator: false},
}

initCalculator();

document.addEventListener('keydown', (e) => {
    let key = e.key;

    if (keys[key]) {
        onControlClicked(key);
    }
})

function initCalculator() {
    controls.forEach(c => {
        c.addEventListener('click', () => onControlClicked(c.dataset.key))
    });

    displayCalculation();
}

function onControlClicked(key) {
    const operand = keys[key].value;
    const isOperator = keys[key].isOperator;

    calculator.classList.remove('result');

    if (operand === 'C') {
        clearAll();
        displayCalculation();
        return;
    }

    if (operand === '=') {
        clearAll();
        calculator.classList.add('result');
        return;
    }

    if (isOperator) {
        if (isLastOperator) {
            value[value.length - 1] = `\n${operand}`;
        } else {
            value.push(`\n${operand}`);
        }
        isLastOperator = true;
    } else {
        if (value.length === 1 && value[0] === 0) {
            value[0] = operand;
        } else {
            value.push(operand);
        }
        isLastOperator = false;
    }

    displayCalculation();
}

function displayCalculation() {
    calculation.textContent = value.join('');
    displayTotal();
}

function displayTotal() {
    const result = calculate();
    calculationTotal.textContent = result || result === 0 ? `= ${trimFloatValue(result)}` : ``;
}

function calculate() {
    const exp = value.slice();

    if (isLastOperator) {
        exp.pop();
    }

    return (new Function(`return ${exp.join('')}`))();
}

function clearAll() {
    value = [0];
}

function trimFloatValue(value) {
    if (value % 1 !== 0) {
        return value.toFixed(2);
    }

    return value;
}
