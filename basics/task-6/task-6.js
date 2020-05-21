function reverseWord() {
    const word = prompt('Введите слово для реверсии', '');

    if (word) {
        alert(word.split('').reverse().join(''));
    }
}

reverseWord();