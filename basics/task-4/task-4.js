function getArithmeticMean() {
    let number;
    let arr = [];
    let sum = 0;
    let result;

    do {
        number = prompt('Введите число', '');
        if (number) {
            arr.push(+number);
            sum = arr.reduce((a, b) => a + b, 0);
            result = sum / arr.length;
            console.log(`Предварительный итог: ${result}`);
        }
    } while (number) {}

    alert(`Сумма чисел: ${sum} \nКоличество чисел: ${arr.length} \nСреднее арифметическое: ${result}`);
}

getArithmeticMean();