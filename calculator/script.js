const calculator = document.querySelector('.calculator');
const calculation = calculator.querySelector('.calculator-value');
const calculationTotal = calculator.querySelector('.calculator-total');
const controls = [...calculator.querySelectorAll('.calculator-controls button')];

let value = [0];
let isLastOperator = false;
let result = 0;

let operators = new Map([
    ['189', '-'],
    ['187', '='],
    ['187*', '+'],
    ['56*', '*'],
    ['191', '/'],
]);

let keys = new Map([
    ['49', '1'],
    ['50', '2'],
    ['51', '3'],
    ['52', '4'],
    ['53', '5'],
    ['54', '6'],
    ['55', '7'],
    ['56', '8'],
    ['57', '9'],
    ['48', '0'],
    ['189', '-'],
    ['187', '='],
    ['187*', '+'],
    ['56*', '*'],
    ['191', '/'],
    ['27', 'C']
]);

initCalculator();

document.addEventListener('keydown', (e) => {
    let key = e.keyCode.toString();

    if (e.shiftKey) {
        key += '*';
    }

    if (keys.has(key)) {
        onControlClicked(key);
    }
})

function initCalculator() {
    controls.forEach(c => {
        c.addEventListener('click', () => {onControlClicked(c.dataset.key)})
    });

    displayCalculation();
}

function onControlClicked(key) {
    const operand = keys.get(key);
    const isOperator = operators.has(key);

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
