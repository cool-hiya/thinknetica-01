function wordStat(text) {

    if (typeof text !== 'string') {
        throw new Error('Accepts only string');
    }

    let arr = text.split(' ');

    arr = arr.map(word => (
        {
            word: word,
            sum: sumCharCodes(word)
        }
    ));

    return arr
}

function sumCharCodes(word) {
    if (typeof word !== 'string') {
        throw new Error('Accepts only string');
    }

    return word.split('')
        .map(letter => letter.charCodeAt(0))
        .reduce((sum, value) => sum + value, 0);
}

const text = 'Lorem ipsum dolor sit amet.';
console.log(wordStat(text));
