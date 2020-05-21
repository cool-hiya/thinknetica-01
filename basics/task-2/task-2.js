function encodeId() {
    const data = [1588312016, 58, 8, 5553663];
    let result = data.map(d => Number(d).toString(16)).join('');

    alert(result);
}

encodeId();