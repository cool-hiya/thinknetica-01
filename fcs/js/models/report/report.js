/**
 * @type {Report}
 * 
 * @param {string} flight Номер рейса
 * @param {boolean} registration Доступна регистрация на самолет
 * @param {boolean} complete Регистрация завершена или самолет улетел
 * @param {number} countOfSeats Общее количество мест
 * @param {number} reservedSeats Количество купленных (забронированных) мест
 * @param {number} registeredSeats Количество пассажиров, прошедших регистрацию
 */
function Report(flight, registration, complete, countOfSeats, reservedSeats, registeredSeats) {
    this.flight = flight;
    this.registration = registration;
    this.complete = complete;
    this.countOfSeats = countOfSeats;
    this.reservedSeats = reservedSeats;
    this.registeredSeats = registeredSeats;
}