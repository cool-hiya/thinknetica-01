function removeMultipleSpaces() {
    const word = prompt('Введите предложение', '');

    if (word) {
        alert(word.replace(/\s{2,}/g, ' ').trim());
    }
}

removeMultipleSpaces()