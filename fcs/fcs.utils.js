'use strict';

/**
 * Создание таймштампа для времени
 * @param {number} hours Часы
 * @param {number} minutes Минуты
 * @returns {number} таймштамп
 */
function makeTime(hours, minutes) {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

function displayFlights() {
    console.log('*** List of all flights ***');
    console.table(flights);
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
}

function isEnableToRegister(flight, nowTime) {
    return nowTime >= flight.registrationStarts && nowTime <= flight.registrationEnds;
}

function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number) && (typeof number === 'number');
}
