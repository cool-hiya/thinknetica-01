'use strict';
/**
 * @property {string} name Номер рейса
 * @property {Airliner} airliner Самолет
 * @property {number} registrationStarts Время начала регистрации на борт
 * @property {number} registrationEnds Время окончания регистрации на борт
 * @property {Ticket[]} tickets Массив всех билетов
 */
function Flight(name, airliner, registrationStarts, registrationEnds, tickets) {
    this.name = name;
    this.airliner = airliner;
    this.registrationStarts = registrationStarts;
    this.registrationEnds = registrationEnds;
    this.tickets = tickets;

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
        const ticket = this.tickets.find(t => t.id === ticketId);

        if (!ticket) {
            throw new Error('The ticket doesn\'t exist');
        }

        if (ticket.fullName !== fullName) {
            throw new Error('Passenger data is incorrect');
        }

        if (isEnableToRegister(this, nowTime)) {
            ticket.eRegistration(nowTime);
        } else {
            throw new Error('Invalid registartion time');
        }
    }

    /**
     * Поиск свободного места нужного типа
     *
     * Гарантирует что найдет свободное место нужного типа или вернет null
     *
     * @param {number} type
     * @returns {number} seat
     */
    this._findAvailableSeat = function (type) {
        let exists;
        let seat;
        let seatsOfType = 0;
        const {businessSeats, seats} = this.airliner;

        switch (type) {
            case 0: // standart
                const availableSeats = [];

                for (let i = businessSeats + 1; i <= seats; i++)
                    if (!this.tickets.find(item => item.seat === i))
                        availableSeats.push(i);

                if (availableSeats.length === 0)
                    return null;

                const index = Math.floor(Math.random() * availableSeats.length);
                return availableSeats[index];
            case 1: // business
                for (let i = 1; i <= businessSeats; i++)
                    if (!this.tickets.find(item => item.seat === i))
                        seatsOfType++;

                if (seatsOfType === 0)
                    return null;

                do {
                    seat = Math.floor(Math.random() * businessSeats) + 1;
                    exists = this.tickets.find(item => item.seat === seat);
                } while (exists);

                return seat;
            default:
                throw new Error(`Unknown type`);
        }
    }

    /**
     * Покупка билета на самолет
     *
     * * проверка рейса
     * * проверка возможности купить (время и наличие мест)
     * * сохранение данных билета в информации о рейсе
     *
     * @param {number} buyTime Время покупки
     * @param {string} fullName Имя пассажира
     * @param {number} type Тип места
     */
    this.buyTicket = function (buyTime, fullName, type = 0) {

        if (this.tickets.length >= this.airliner.seats)
            throw new Error('No seats available');

        if (buyTime > this.registartionEnds)
            throw new Error('Time away');

        const seat = this._findAvailableSeat(type);

        if (!seat)
            throw new Error(`No seats of type ${type} available. You can choose another type`);

        let id, exists;

        do {
            id = this.name + '-' + this.tickets.length; // Math.random().toString().substr(2, 3);
            exists = this.tickets.find(item => item.id === id);
        } while (exists);

        const ticket = new Ticket(id, this.name, fullName, type, seat, buyTime, null);
        this.tickets.push(ticket);
    }

    /**
     * Функция генерации отчета по рейсу
     *
     * Отчет строится на основании данных, содержащихся в параметре flight
     *
     *  * проверка рейса
     *  * подсчет
     *
     * @param {number} nowTime текущее время
     * @returns {Report} отчет
     */
    this.report = function (nowTime) {

        if (!isNumber(nowTime)) {
            throw new Error('Time param should be a number');
        }

        const countOfSeats = this.airliner.seats;
        const reservedSeats = this.tickets.length;
        const registeredSeats = this.tickets.filter(ticket => ticket.registrationTime != null).length;
        const registration = isEnableToRegister(this, nowTime);
        const complete = nowTime >= this.registrationEnds;

        return new Report(this.name, registration, complete, countOfSeats, reservedSeats, registeredSeats);
    }
}