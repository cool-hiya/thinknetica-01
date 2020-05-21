function replaceText() {
    const text = 'The syntax of Java is largely influenced by C++. Unlike C++, Java does not support operator overloading. Java uses comments similar to those of C++';
    const wordA = 'Java';
    const wordB = 'JS'
    const wordC = 'overloading';

    let sentences = text.split('.');

    sentences = sentences
        .map(s => {
            if (s.indexOf(wordC) !== -1) {
                s = s.split(wordA).join(wordB)
            }
            return s;
        })
        .join('.');

    console.log(sentences);
}

replaceText();