function splitIntoWords(text) {
    let arr = text.split(' ');

    arr = arr.map(word => {
        const sum = word.split('')
            .map(letter => letter.charCodeAt(0))
            .reduce((sum, value) => sum + value, 0);

        return {
            word: word,
            sum: sum
        }
    });
    return arr
}

const text = 'Lorem ipsum dolor sit amet.';
console.log(splitIntoWords(text));
