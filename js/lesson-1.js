function calculateTriangleSquare() {
    let width;

    do {
        width = prompt('Расчет площади правильного треугольника \nПожалуйста, введите длину стороны', '')

        if (width) {
            if (parseInt(width)) {
                alert(`Площадь правильного треугольника со стороной ${width} будет ${(Math.pow(width, 2) * Math.sqrt(3) / 4).toFixed(2)}`);
            } else if (width !== null) {
                alert('Ошибка! Длина должна быть числом');
                width = '';
            }
        }

    } while (width !== null && !width) {}
}


function reverseWord() {
    const word = prompt('Введите слово для реверсии', '');

    if (word) {
        alert(word.split('').reverse().join(''));
    }
}

function removeMultipleSpaces() {
    const word = prompt('Введите предложение', '');

    if (word) {
        alert(word.replace(/\s{2,}/g, ' ').trim());
    }
}

function countLetters() {
    const word = prompt('Введите предложение', '');
    const letters = word.toLowerCase().replace(/[^[a-z]]*/g, '');

    const vowels = ['a', 'o', 'u', 'y', 'e', 'i'];
    let vowelsCount = 0;
    let match;

    vowels.forEach((v) => {
        match = letters.match(new RegExp(v, 'g'))

        if (match) {
            vowelsCount += match.length;
        }
    });

    alert(`Гласных: ${vowelsCount}, согласных: ${letters.length - vowelsCount}`);
}

// calculateTriangleSquare();
// reverseWord();
// removeMultipleSpaces()
// countLetters();