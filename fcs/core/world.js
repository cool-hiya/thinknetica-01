'use strict';

/**
 * 
 * @property {Flight[]} flights 
 * @property {Flight[]} history 
 */

function World(flights = [], history = []) {
    this.flights = flights;
    this.history = history;

    /**
     * Добавление рейса
     *
     * * назначение номера рейса
     * * подготовка рейса
     *   * вычисление времени регистрации
     *   * подготовка структуры Flight
     *
     * @param {Airliner} airliner Информация о самолете
     * @param {number} time Время вылета
     * @param {string} name Имя рейса
     */
    this.addFlight = function (airliner, time, name) {
        const CHARCODE_A = 'A'.charCodeAt(0);

        while (name in this.flights) {
            name = [
                String.fromCharCode(CHARCODE_A + random(0, 26)),
                String.fromCharCode(CHARCODE_A + random(0, 26)),
                random(100, 999)
            ].join('');
            console.log(name);
        };

        const flight = new Flight(name, airliner, time - 5 * 3600 * 1000, time - 1 * 3600 * 1000, []);

        this.flights = {
            ...this.flights,
            [name]: flight
        }

        this.history = [
            ...this.history,
            this.flights
        ]
    }

    /**
     * Покупка билета на самолет
     *
     * * проверка рейса
     * * проверка возможности купить (время и наличие мест)
     * * сохранение данных билета в информации о рейсе
     *
     * @param {string} flightName Номер рейса
     * @param {number} buyTime Время покупки
     * @param {string} fullName Имя пассажира
     * @param {number} type Тип места
     */
    this.buyTicket = function (flightName, buyTime, fullName, type = 0) {
        const flight = this.flights[flightName];

        if (!flight) {
            throw new Error('Flight not found');
        }

        flight.buyTicket(buyTime, fullName, type);

        this.flights = {
            ...this.flights,
            [flightName]: {...flight},
        };

        this.history = [
            ...this.history,
            this.flights
        ]
    }

    /**
     * Функция пробует произвести электронную регистрацию пассажира
     *
     *  * проверка билета
     *  * проверка данных пассажира
     *  * в информации о рейсе указано время начала
     *  * и конца электронной регистрации
     *
     * @param {string} ticketId номер билета
     * @param {string} fullName имя пассажира
     * @param {number} nowTime текущее время
     */
    this.eRegistration = function (ticketId, fullName, nowTime) {
        const flightName = ticketId.split('-')[0];
        const flight = this.flights[flightName];

        flight.eRegistration(ticketId, fullName, nowTime);

        this.history = [
            ...this.history,
            this.flights
        ]
    }
}



