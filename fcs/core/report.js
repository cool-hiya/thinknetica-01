'use strict';

/**
 * 
 * @property {string} flight Номер рейса
 * @property {boolean} registration Доступна регистрация на самолет
 * @property {boolean} complete Регистрация завершена или самолет улетел
 * @property {number} countOfSeats Общее количество мест
 * @property {number} reservedSeats Количество купленных (забронированных) мест
 * @property {number} registeredSeats Количество пассажиров, прошедших регистрацию
 */
function Report(flight, registration, complete, countOfSeats, reservedSeats, registeredSeats) {
    this.flight = flight;
    this.registration = registration;
    this.complete = complete;
    this.countOfSeats = countOfSeats;
    this.reservedSeats = reservedSeats;
    this.registeredSeats = registeredSeats;
}