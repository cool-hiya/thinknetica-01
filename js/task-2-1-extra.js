function generateMultiTable() {
    let str = '';

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const num = ('   ' + i * j).substr(-4);
            str += num;

            if (j === 1) {
                str += num;
            }
        }
        str += '\n';
    }

    str = str.substr(0, str.indexOf('\n') + 1) + str;
    str = str.replace('1', '*')
    console.log(str);
}

generateMultiTable();