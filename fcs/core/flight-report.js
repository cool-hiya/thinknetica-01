'use strict';

/**
 * Функция генерации отчета по рейсу
 *
 * Отчет строится на основании данных, содержащихся в параметре flight
 *
 *  * проверка рейса
 *  * подсчет
 *
 * @param {World} world
 * @param {string}} flight номер рейса
 * @param {number} nowTime текущее время
 * @returns {Report} отчет
 */
function flightReport(world, flight, nowTime) {

    if (typeof flight !== 'string') {
        throw new Error('Flight param should be a string');
    }

    if(!isNumber(nowTime)){
        throw new Error('Time param should be a number');
    }

    const flights = world.flights;
    const foundFlight = flights[flight];

    if(!foundFlight){
        throw new Error('The flight doesn\'t exist');
    }

    const countOfSeats = foundFlight.seats;
    const reservedSeats = foundFlight.tickets.length;
    const registeredSeats = foundFlight.tickets.filter(ticket => ticket.registrationTime != null).length;
    const registration = isEnableToRegister(foundFlight, nowTime);
    const complete = nowTime >= foundFlight.registrationEnds;

    return {
        flight: flight,
        registration: registration,
        complete: complete,
        countOfSeats: countOfSeats,
        reservedSeats: reservedSeats,
        registeredSeats: registeredSeats
    }
}