/**
 * @type {Ticket}
 * 
 * @param {string} id
 * @param {string} flightName
 * @param {string} fullName
 * @param {0 | 1} type Тип места (0 - стандарт, 1 - бизнес)
 * @param {number} seat
 * @param {number} buyTime
 * @param {number} registrationTime Время прохождения электронной регистрации
 */

function Ticket(id, flightName, fullName, type, seat, buyTime, registrationTime) {
    this.id = id;
    this.flightName = flightName;
    this.fullName = fullName;
    this.type = type;
    this.seat = seat;
    this.buyTime = buyTime;
    this.registrationTime = registrationTime;

    /**
     * @param {number} nowTime
     */
    this.eRegistration = function (nowTime) {
        this.registrationTime = nowTime;
    }
}