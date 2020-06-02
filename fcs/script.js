'use strict';

const world = new World();

world.addFlight(
    new Airliner('Airbus 747', 36, 4),
    makeTime(16, 0),
    'BH118'
);

console.log(world);

world.addFlight(
    new Airliner('Airbus 749', 89, 14),
    makeTime(14, 0),
    'BH119'
);

console.log(world);

world.buyTicket('BH118', makeTime(5, 10), 'Petrov I. I.');

console.log(world);

world.buyTicket('BH118', makeTime(6, 10), 'Ivanov I. I.');

console.log(world);

world.eRegistration('BH118-0', 'Petrov I. I.', makeTime(11, 0));

console.log(world);

const report = world.flights['BH118'].report(makeTime(8, 0));

console.table(report);

// // flightDetails(bigWorld, 'BH118');

// initBuyTicketForm(bigWorld);