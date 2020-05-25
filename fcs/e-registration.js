'use strict';

/**
 * Функция пробует произвести электронную регистрацию пассажира
 *
 *  * проверка билета
 *  * проверка данных пассажира
 *  * в информации о рейсе указано время начала
 *  * и конца электронной регистрации
 *
 * @param {World} world
 * @param {string} ticket номер билета
 * @param {string} fullName имя пассажира
 * @param {number} nowTime текущее время
 * @returns {World} если успешно или ошибка
 */
function eRegistration(world, ticketId, fullName, nowTime) {
    let foundTicket;
    const flights = world.flights;
    let flight;
    let tickets;

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

    flight = flights[foundTicket.flight];

    if (isEnableToRegister(flight, nowTime)) {
        foundTicket = {...foundTicket, ...{ registrationTime:nowTime }};
    } else {
        throw new Error('Invalid registartion time');
    }

    const newTickets = Object.assign([], flight.tickets, [foundTicket]);

    const newFlight = {
        ...flight,
        tickets: newTickets
    };

    const newFlights = {
        ...world.flights,
        [flight.name]: newFlight,
    };

    const newWorld = {
        ...world,
        flights: newFlights,
    };

    return {
        world: newWorld
    }
}

