function decode() {
    const keyCodeA = 'a'.charCodeAt(0);
    const key = 'sqnzbeuigvxtmhfpdcjyoakwlr';
    const text = 'qsnx gh yib uffz ftz zslj yib  uftzbh bcs  fe nfmpoybcj gy ksj bsjl yf jbpscsyb yib mbh ecfm yib qflj  jfmbygmbj nsttbz cbst mbh  shz  dognib bsybcj  gh yib tgybcsyocb zocghu yigj pbcgfz  yib cbst mbh kbcb yib fhbj yisy ohzbcjyffz nfmpoybc pcfucsmmghu shz yib dognib bsybcj kbcb yib fhbj yisy zgzh y'
    let decoded = '';

    for (let i = 0; i < text.length; i++) {
        const index = key.indexOf(text[i]);

        if (index === -1) {
            decoded += ' ';
        } else {
            decoded += String.fromCharCode(index + keyCodeA);
        }
    }

    console.log(decoded);
}

decode()