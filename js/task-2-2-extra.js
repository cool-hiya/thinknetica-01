function formatTime() {
    let str = '3.2 am';
    str = str.replace(' ', '').trim();

    const periodMatch = str.match(/am|pm/);
    const period = periodMatch && periodMatch[0];

    if (!period) {
        alert('Введите время в 12 часовом формате');
        return;
    }

    const timeMatch = str.match(/\d+/g);
    let hours = +timeMatch[0];
    let minutes = +timeMatch[1];

    if (!hours || !minutes) {
        alert('Введен неверный формат. Укажите часы и минуты');
        return
    }

    if (minutes > 60) {
        alert('Введен неверный формат. Минуты не должны превышать 60');
        return;
    }

    if (hours > 12) {
        alert('Введен неверный формат. Часы не должны превышать 12');
        return;
    }

    if (period === 'pm' && hours !== 12) {
        hours += 12;
    }

    if (period === 'am' && hours === 12) {
        hours = 0;
    }

    hours = ('0' + hours).substr(-2);
    minutes = ('0' + minutes).substr(-2);

    alert(`${hours}:${minutes}`);
}

formatTime();