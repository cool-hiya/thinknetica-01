function makeTime(hours, minutes) {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

/**
 * @type {Object<string, Flight>} Список всех рейсов
 */
let flights = {
    BH118: {
        name: 'BH118',
        seats: 28,
        businessSeats: 4,
        registrationStarts: makeTime(10, 0),
        registrationEnds: makeTime(15, 0),
        countOfReservations: 1,
        tickets: [
            {
                id: 'BH118-B50',
                flight: 'BH118',
                fullName: 'Ivanov I. I.',
                type: 0,
                seat: 18,
                buyTime: makeTime(2, 0),
                registrationTime: null,
            }
        ],
    },
    BH119: {
        name: 'BH119',
        seats: 28,
        businessSeats: 4,
        registrationStarts: makeTime(10, 0),
        registartionEnds: makeTime(15, 0),
        countOfReservations: 1,
        tickets: [
            {
                id: 'BH119-B50',
                flight: 'BH119',
                fullName: 'Ivanov I. I.',
                type: 0,
                seat: 18,
                buyTime: makeTime(2, 0),
                registrationTime: null,
            }
        ]
    }
};

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
 * @returns {Flight}
 */
// function createFlight(airliner, time) { }

/**
 * Поиск свободного места нужного типа
 * 
 * Гарантирует что найдет свободное место нужного типа или вернет null
 * 
 * @param {Flight} flight 
 * @param {number} type
 * @returns {number} seat
 */
function findAvailableSeat(flight, type) {
    let exists;
    let seat;
    let seatsOfType = 0;

    switch (type) {
        case 0: // standart
            const availableSeats = [];

            for (let i = flight.businessSeats + 1; i <= flight.seats; i++)
                if (!flight.tickets.find(item => item.seat === i))
                    availableSeats.push(i)

            if (availableSeats.length === 0)
                return null;

            const index = Math.floor(Math.random() * availableSeats.length);
            return availableSeats[index];
        case 1: // business
            for (let i = 1; i <= flight.businessSeats; i++)
                if (!flight.tickets.find(item => item.seat === i))
                    seatsOfType++;

            if (seatsOfType === 0)
                return null;

            do {
                seat = Math.floor(Math.random() * flight.businessSeats) + 1;
                exists = flight.tickets.find(item => item.seat === seat);
            } while (exists);

            return seat;
        default:
            throw new Error(`Unknown type`)
    }
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
 * @returns {Ticket} Возвращаем копию билета
 */
function buyTicket(flightName, buyTime, fullName, type = 0) {
    const flight = flights[flightName];

    if (!flight)
        throw new Error('Flight not found');

    if (flight.tickets.length >= flight.seats)
        throw new Error('No seats available');

    if (buyTime > flight.registartionEnds)
        throw new Error('Time away');

    const seat = findAvailableSeat(flight, type);
    if (!seat)
        throw new Error(`No seats of type ${type} available. You can choose another type`);

    let id;
    do {
        id = flight.name + '-' + Math.random().toString().substr(2, 3);
        exists = flight.tickets.find(item => item.id === id);
    } while (exists);

    /**
     * @type {Ticket}
     */
    const ticket = {
        id,
        flight: flight.name,
        buyTime,
        fullName,
        registrationTime: null,
        type,
        seat,
    }

    flight.tickets.push(ticket);
    flight.countOfReservations++;

    // return Object.assign({}, ticket);
    return {
        ...ticket,
        welcome: 'Nice to choose us',
    };
}

function displayFlights() {
    console.log('*** List of all flights ***');
    console.table(flights);
}

function flightDetails(flightName) {
    console.log(`*** Details of flight ${flightName} ***`);
    const flight = flights[flightName];
    if (!flight) {
        console.warn('Flight not found');
        return;
    }

    console.table(flight);
    console.table(flight.tickets);
}

/**
 * Функция пробует произвести электронную регистрацию пассажира
 * 
 *  * проверка билета
 *  * проверка данных пассажира
 *  * электронную регистрацию можно произвести только в период от 5 до 1 часа до полета
 * 
 * @param {string} ticket номер билета
 * @param {string} fullName имя пассажира
 * @param {number} nowTime текущее время
 * @returns boolean успешна ли регистрация
 */
function eRegistration(ticket, fullName, nowTime) {
    const ticketId = ticket;
    let foundTicket;

    const ticketExists = Object.values(flights)
        .map(flight => flight.tickets)
        .some(tickets => {
            foundTicket = tickets.find(ticket => ticket.id === ticketId);
            return !!foundTicket
        });

    if (!ticketExists) {
        throw new Error('The ticket doesn\'t exist');
    }

    if (foundTicket.fullName !== fullName) {
        throw new Error('Passenger data is incorrect');
    }

    if (isEnableToRegister(flights[foundTicket.flight], nowTime)) {
        foundTicket.registrationTime = nowTime;
    } else {
        throw new Error('Invalid registartion time');
    }
}


function isEnableToRegister(flight, nowTime) {
    return nowTime >= flight.registrationStarts && nowTime <= flight.registrationEnds;
}

/**
 * Отчет о рейсе на данный момент
 * 
 * @typedef {Object} Report
 * @property {string} flight Номер рейса
 * @property {boolean} registration Доступна регистрация на самолет
 * @property {boolean} complete Регистрация завершена или самолет улетел
 * @property {number} countOfSeats Общее количество мест
 * @property {number} reservedSeats Количество купленных (забронированных) мест
 * @property {number} registeredSeats Количество пассажиров, прошедших регистрацию
 */

/**
* Отчет о рейсе на данный момент
* 
* @typedef {Object} Report
* @property {string} flight Номер рейса
* @property {boolean} registration Доступна регистрация на самолет
* @property {boolean} complete Регистрация завершена или самолет улетел
* @property {number} countOfSeats Общее количество мест
* @property {number} reservedSeats Количество купленных (забронированных) мест
* @property {number} registeredSeats Количество пассажиров, прошедших регистрацию
* @property {number} countOfReservations Количество всех регистраций мест !!
* @property {number} countOfReverts Количество возвратов билетов
* @property {number} percentOfReverts Процент возвратов от общего числа бронирований !!
*/

/**
* Функция генерации отчета по рейсу
* 
*  * проверка рейса
*  * подсчет
* 
* @param {string} flight номер рейса
* @param {number} nowTime текущее время
* @returns {Report} отчет
*/
function flightReport(flight, nowTime) {

    if (typeof flight !== 'string') {
        throw new Error('Flight param should be a string');
    }

    if(!this.isNumber(nowTime)){
        throw new Error('Time param should be a number');
    }

    const foundFlight = flights[flight];

    if(!foundFlight){
        throw new Error('The flight doesn\'t exist');
    }

    const countOfSeats = foundFlight.seats;
    const reservedSeats = foundFlight.tickets.length;
    const registeredSeats = foundFlight.tickets.filter(ticket => ticket.registrationTime != null).length;
    const registration = isEnableToRegister(foundFlight, nowTime);
    const complete = nowTime >= foundFlight.registrationEnds;
    const countOfReservations = foundFlight.countOfReservations;
    const countOfReverts = countOfReservations - reservedSeats;
    const percentOfReverts = +(countOfReverts / countOfReservations).toFixed(2)

    return {
        flight: flight,
        registration: registration,
        complete: complete,
        countOfSeats: countOfSeats,
        reservedSeats: reservedSeats,
        registeredSeats: registeredSeats,
        countOfReservations: countOfReservations,
        countOfReverts: countOfReverts,
        percentOfReverts: percentOfReverts
    }
}

/**
 * Функция возврата билета
 * 
 *  * проверка рейса
 *  * проверка билета
 *  * вернуть билет можно если до рейса не менее 3 часов
 *  * вернуть билет можно это не бизнес класс
 * 
 * @param {string} ticket номер билета
 * @param {number} nowTime текущее время
 * @returns {boolean} удалось ли отменить билет
 */
function revertTicket(ticket, nowTime) {
       
    if (typeof ticket !== 'string') {
        throw new Error('Ticket param should be a string');
    }

    if(!this.isNumber(nowTime)){
        throw new Error('Time param should be a number');
    }

    const ticketId = ticket;
    let foundTicket;

    const ticketExists = Object.values(flights)
        .map(flight => flight.tickets)
        .some(tickets => {
            foundTicket = tickets.find(ticket => ticket.id === ticketId);
            return !!foundTicket
        });

    if (!ticketExists) {
        throw new Error('The ticket doesn\'t exist');
    }

    const flight = flights[foundTicket.flight];
    const timeMinutesDiff = (flight.registrationStarts - nowTime) / 60000;
    const enableToReturnTime = timeMinutesDiff >= 180;
    const isStandart = foundTicket.type == 0;

    if (enableToReturnTime && isStandart) {
        const ticketIndex = flight.tickets.findIndex(ticket => ticket.id === ticketId);
        flight.tickets.splice(ticketIndex, 1);
        return true;
    }

    return false;
}

function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number) && (typeof number === 'number');
}

const a = buyTicket('BH118', makeTime(5, 10), 'Petrov I. I.');
eRegistration('BH118-B50', 'Ivanov I. I.', makeTime(10, 0));
console.table(flightReport('BH118', makeTime(11, 0)));
console.log(revertTicket('BH118-B50', makeTime(7, 0)));
console.table(flightReport('BH118', makeTime(8, 0)));
