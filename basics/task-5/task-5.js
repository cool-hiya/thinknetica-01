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

countLetters();