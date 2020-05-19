/* 
    Написать функцию encodeText, которая принимает текст, выбирает все уникальные слова в нем, для каждого слова подсчитывает количество вхождений и присваивает уникальный код.
    Словом считать последовательность символов между пробелами.
    Далее перекодирует текст, заменяя слова из словаря на код слова
    Уникальный код - случайное число (желательно - в 16ричной или 36ричной системе)
    Проверить что код действительно уникален для этого словаря
    Возвращает объект
    {
    dictionary: [
        {
        word: слово
        count: количество использований в тексте
        code: уникальный код.
        }
    ],
    encodedText: перекодированный текст
    }

    Пример:
    Исходный текст:
    Lorem ipsum ipsum dolor.
    Результат:
    {
    dictionary: [
        { word: 'Lorem', count: 1, code: '58' },
        { word: 'ipsum', count: 2, code: 'rd' },
        { word: 'dolor.', count: 1, code: 'g7' }
    ],
    encodedText: '58,rd,rd,g7'
    }
*/

function encodeText(text) {
    const codes = new Set();
    let words = text.split(' ');

    const dictionary = words
        .reduce((acc, current) => {
            const existedWord = acc.find(el => el.word === current);

            if (existedWord) {
                existedWord.count = existedWord.count + 1;
            } else {
                acc.push({word: current, count: 1});
            }

            return acc;
        }, [])
        .map(word => {
            let code;

            do {
                code = Math.floor(Math.random() * 500).toString(32);
            }
            while (codes.has(code))

            codes.add(code);

            return Object.assign({}, word, {code: code})
        });

    let encodedText = [];
    words.forEach(word => {
        encodedText.push(dictionary.find(el => el.word === word).code);
    });;

    encodedText = encodedText.join();

    return {
        dictionary: dictionary,
        encodedText: encodedText
    }
}


const text = 'Lorem ipsum ipsum dolor.';
console.log(encodeText(text));