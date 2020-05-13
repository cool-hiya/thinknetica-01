function formatDate() {
    const result = prompt('Введите дату в формате ММ/ДД/ГГГГ');
    const arr = result.split('/');
    let date;

    if (arr.length === 3) {
        date = new Date(arr[2], arr[0] - 1, arr[1]);

        if (!isNaN(date)) {
            alert(date.toLocaleDateString());
            return;
        }
    }

    alert('Введен неверный формат даты')
}

formatDate()