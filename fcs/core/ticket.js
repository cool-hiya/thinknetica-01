'use strict';

/**
 * @property {string} id
 * @property {string} flightName
 * @property {string} fullName
 * @property {0 | 1} type Тип места (0 - стандарт, 1 - бизнес)
 * @property {number} seat
 * @property {number} buyTime
 * @property {number} registrationTime Время прохождения электронной регистрации
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